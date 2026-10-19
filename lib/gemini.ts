import { GoogleGenAI, Part } from "@google/genai";

const FALLBACK_MODELS = [
  process.env.GEMINI_MODEL || "gemini-3.7-flash",
  "gemini-3.8-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
];

export interface ConversationTurn {
  role: "user" | "model";
  content: string;
}

export interface InlineFileAttachment {
  mimeType: string;
  base64Data: string;
  fileName?: string;
}

export function buildSystemInstruction(
  mode: string,
  hintOnlyMode: boolean
): string {
  const base = `Bạn là Gia sư AI thông minh của nền tảng BYE THPT, chuyên hỗ trợ học sinh THPT Việt Nam (Lớp 10, 11, 12) theo Chương trình Giáo dục phổ thông 2018 (GDPT 2018).
Quy tắc trình bày:
- Luôn trả lời bằng tiếng Việt tự nhiên, gần gũi, khích lệ học sinh.
- Khi viết công thức Toán, Vật lý, Hóa học: dùng cú pháp LaTeX chuẩn trong cặp dấu $...$ (inline) hoặc $$...$$ (block).
- Nếu học sinh đính kèm ảnh chụp đề bài hoặc file tài liệu, hãy đọc kỹ toàn bộ nội dung/công thức trong ảnh/file đó rồi giải chi tiết theo yêu cầu.`;

  const modeInstruction =
    mode === "essay-review"
      ? "Chế độ hiện tại: CHẤM VÀ NHẬN XÉT BÀI VĂN. Hãy chấm điểm dự kiến trên thang 10, phân tích ưu điểm, điểm cần khắc phục và gợi ý cách viết nâng cấp giàu sức thuyết phục."
      : mode === "quiz"
      ? "Chế độ hiện tại: TẠO CÂU HỎI TRẮC NGHIỆM. Hãy tạo các câu hỏi trắc nghiệm 4 lựa chọn A, B, C, D sát cấu trúc thi THPT kèm đáp án và lời giải ngắn gọn."
      : mode === "summary"
      ? "Chế độ hiện tại: TÓM TẮT LÝ THUYẾT. Hãy hệ thống hóa kiến thức trọng tâm theo gạch đầu dòng cô đọng, dễ nhớ."
      : mode === "explain"
      ? "Chế độ hiện tại: GIẢI THÍCH KHÁI NIỆM. Hãy giải thích bản chất vấn đề kèm ví dụ thực tế dễ hiểu."
      : "Chế độ hiện tại: GIẢI BÀI TẬP TỪNG BƯỚC. Hãy trình bày lời giải chi tiết từng bước (Bước 1, Bước 2...) và nêu rõ công thức áp dụng.";

  const hintInstruction = hintOnlyMode
    ? "QUAN TRỌNG: Học sinh đang bật chế độ GỢI Ý (Hint Mode). Tuyệt đối KHÔNG đưa ra đáp số cuối cùng ngay lập tức mà chỉ gợi mở phương pháp, công thức và hướng dẫn bước đầu để học sinh tự suy nghĩ."
    : "";

  return [base, modeInstruction, hintInstruction].filter(Boolean).join("\n\n");
}

export async function generateGeminiWithFallback(
  prompt: string,
  mode: string,
  hintOnlyMode: boolean,
  history: ConversationTurn[] = [],
  attachment?: InlineFileAttachment
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Chưa cấu hình GEMINI_API_KEY trong .env.local");
  }

  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = buildSystemInstruction(mode, hintOnlyMode);

  const userParts: Part[] = [];
  if (attachment && attachment.base64Data && attachment.mimeType) {
    userParts.push({
      inlineData: {
        mimeType: attachment.mimeType,
        data: attachment.base64Data,
      },
    });
  }
  userParts.push({ text: prompt });

  const contents = [
    ...history.slice(-8).map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.content }],
    })),
    {
      role: "user" as const,
      parts: userParts,
    },
  ];

  const uniqueModels = Array.from(new Set(FALLBACK_MODELS));
  let lastError: unknown = null;

  for (const modelName of uniqueModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });
      if (response.text) {
        return response.text;
      }
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(
        "Tất cả các máy chủ Gemini hiện đang bận, vui lòng thử lại sau giây lát."
      );
}
