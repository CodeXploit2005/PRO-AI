import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const generateFlashcardSchema = z.object({
  sourceText: z.string().min(5).max(5000),
  deckName: z.string().default("Tạo bởi AI Gemini"),
});

const FLASHCARD_MODELS = [
  "gemini-3.7-flash",
  "gemini-3.8-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
];

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = generateFlashcardSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Đoạn văn bản quá ngắn hoặc không hợp lệ." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chưa cấu hình GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Bạn là giáo viên THPT Việt Nam. Hãy đọc đoạn kiến thức dưới đây và tạo ra 3 thẻ Flashcard thật dễ hiểu cho học sinh ôn bài.

QUY TẮC BẮT BUỘC:
1. "front" (Mặt trước): Câu hỏi rõ ràng, ngắn gọn, đi thẳng vào trọng tâm.
2. "back" (Mặt sau): Giải thích bằng lời văn tự nhiên dễ hiểu + Công thức + 1 Ví dụ ngắn hoặc Mẹo nhớ nhanh.
3. Nếu có công thức Toán/Lý/Hóa, bọc trong dấu $...$ chuẩn LaTeX (ví dụ: $\\lim_{x \\to +\\infty} \\frac{f(x)}{x}$) để hệ thống vẽ công thức đẹp mắt.

Trả về đúng định dạng JSON mảng các object: [{"front": "...", "back": "..."}]

Đoạn kiến thức:
${parsed.data.sourceText}`;

    for (const modelName of FLASHCARD_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.3,
          },
        });

        const rawText = response.text || "[]";
        const parsedCards = JSON.parse(rawText) as {
          front: string;
          back: string;
        }[];
        return NextResponse.json({ cards: parsedCards }, { status: 200 });
      } catch {
        continue;
      }
    }

    return NextResponse.json(
      { error: "Máy chủ Gemini đang bận, vui lòng thử lại." },
      { status: 503 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Lỗi gọi Gemini API";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
