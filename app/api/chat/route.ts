import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateGeminiWithFallback } from "@/lib/gemini";

const chatSchema = z.object({
  message: z.string().min(1).max(6000),
  mode: z.string().default("step-by-step"),
  hintOnlyMode: z.boolean().default(false),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "model"]),
        content: z.string(),
      })
    )
    .optional()
    .default([]),
  attachment: z
    .object({
      mimeType: z.string(),
      base64Data: z.string(),
      fileName: z.string().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dữ liệu câu hỏi hoặc tệp đính kèm không hợp lệ" },
        { status: 400 }
      );
    }

    const { message, mode, hintOnlyMode, history, attachment } = parsed.data;
    const answerText = await generateGeminiWithFallback(
      message,
      mode,
      hintOnlyMode,
      history,
      attachment
    );

    const encoder = new TextEncoder();
    const words = answerText.split(/(?=[ \n])/);
    const readable = new ReadableStream({
      async start(controller) {
        for (const chunk of words) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      },
    });

    return new NextResponse(readable, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
