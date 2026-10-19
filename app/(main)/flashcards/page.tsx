"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  Layers,
  Sparkles,
  RotateCw,
  CheckCircle2,
  Plus,
  Brain,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface FlashcardItem {
  id: string;
  deck: string;
  front: string;
  back: string;
  intervalDays: number;
  ease: number;
}

const INITIAL_CARDS: FlashcardItem[] = [
  {
    id: "fc-1",
    deck: "Toán 12 • Ứng dụng đạo hàm",
    front: "Làm thế nào để tìm đường **Tiệm cận xiên** $y = ax + b$ của đồ thị hàm số $y = f(x)$?",
    back: "**Cách tìm 2 hệ số $a$ và $b$:**\n\n$$a = \\lim_{x \\to +\\infty} \\frac{f(x)}{x} \\quad \\text{và} \\quad b = \\lim_{x \\to +\\infty} [f(x) - ax]$$\n\n💡 **Mẹo làm nhanh trắc nghiệm:** Với hàm phân thức bậc 2 trên bậc 1, chỉ cần lấy tử chia cho mẫu, phần thương bậc nhất chính là tiệm cận xiên!",
    intervalDays: 3,
    ease: 2.5,
  },
  {
    id: "fc-2",
    deck: "Công thức Toán 12 • Hình không gian",
    front: "Công thức tính **Thể tích khối chóp** có diện tích đáy $B$ và chiều cao $h$ là gì?",
    back: "$$V = \\frac{1}{3} \\cdot B \\cdot h$$\n\n💡 **Lưu ý dễ nhầm:** Khối chóp luôn có hệ số $\\frac{1}{3}$, còn khối lăng trụ thì không có ($V_{\\text{lăng trụ}} = B \\cdot h$).",
    intervalDays: 3,
    ease: 2.5,
  },
  {
    id: "fc-3",
    deck: "Từ vựng Tiếng Anh 12 Global Success",
    front: "Từ vựng **Artificial Intelligence (AI)** và **Viable (adj)** có nghĩa là gì?",
    back: "- **Artificial Intelligence** `/ˌɑːtɪfɪʃl ɪnˈtelɪdʒəns/`: Trí tuệ nhân tạo\n- **Viable** `/ˈvaɪəbl/` (adj): Khả thi, có thể thực hiện được ($=$ *feasible*)\n\n📝 *Ví dụ:* Solar power is a **viable** alternative to fossil fuels.",
    intervalDays: 1,
    ease: 2.3,
  },
  {
    id: "fc-4",
    deck: "Hóa học 12 • Danh pháp IUPAC mới",
    front: "Theo danh pháp IUPAC mới (GDPT 2018), hợp chất $CH_3COOC_2H_5$ và $HCOOH$ đọc tên là gì?",
    back: "- **$CH_3COOC_2H_5$:** **Ethyl ethanoate** *(tên thông thường: Ethyl acetate)*\n- **$HCOOH$:** **Methanoic acid** *(tên thông thường: Formic acid)*\n\n💡 **Quy tắc:** Gốc alcohol đọc trước + Gốc acid đổi đuôi *-ic* thành *-ate*.",
    intervalDays: 2,
    ease: 2.4,
  },
];

export default function FlashcardsPage() {
  const [cards, setCards] = useState<FlashcardItem[]>(INITIAL_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [aiSourceText, setAiSourceText] = useState("");
  const [generating, setGenerating] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];

  const handleSpacedRepetitionRate = (
    quality: "again" | "hard" | "good" | "easy"
  ) => {
    const labels = {
      again: "Ôn lại sau 10 phút",
      hard: "Ôn lại sau 1 ngày",
      good: "Ôn lại sau 4 ngày (+15 XP)",
      easy: "Ôn lại sau 7 ngày (+25 XP)",
    };
    toast.success(`Đã ghi nhận Spaced Repetition: ${labels[quality]}`);
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handleGenerateByAI = async () => {
    if (!aiSourceText.trim()) {
      toast.error("Vui lòng dán đoạn văn bản hoặc lý thuyết cần tạo thẻ!");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/flashcards/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceText: aiSourceText,
          deckName: "Tạo bởi AI Gemini",
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          cards: { front: string; back: string }[];
        };
        if (Array.isArray(data.cards) && data.cards.length > 0) {
          const generatedItems: FlashcardItem[] = data.cards.map((c, idx) => ({
            id: `fc-ai-${Date.now()}-${idx}`,
            deck: "Tạo bởi AI Gemini",
            front: c.front,
            back: c.back,
            intervalDays: 1,
            ease: 2.5,
          }));
          setCards([...generatedItems, ...cards]);
          setCurrentIndex(0);
          setFlipped(false);
          setAiSourceText("");
          setGenerating(false);
          toast.success(
            `Gemini đã tạo thành công ${generatedItems.length} thẻ Flashcard dễ hiểu!`
          );
          return;
        }
      }
    } catch {
      // Fallback
    }

    setGenerating(false);
    toast.error("Không thể tạo thẻ lúc này, vui lòng thử lại!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/70 bg-card p-6 sm:flex-row sm:items-center soft-shadow">
        <div>
          <Badge variant="default" className="mb-2">
            Spaced Repetition (SM-2) & Active Recall
          </Badge>
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            Flashcard & Ghi nhớ thông minh
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ôn tập công thức Toán - Lý - Hóa (hiển thị chuẩn ký hiệu Toán học), từ vựng Tiếng Anh và mốc Lịch sử.
          </p>
        </div>

        <Button
          onClick={() =>
            toast.success("Đã mở khung thêm thẻ thủ công vào bộ thẻ hiện tại!")
          }
          className="gap-2 bg-[#3B41E3] hover:bg-[#3136C8] text-white"
        >
          <Plus className="h-4 w-4" />
          Tạo bộ thẻ mới
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Interactive Flip Card with Full KaTeX Math Rendering */}
        <div className="lg:col-span-7 space-y-4">
          <div
            onClick={() => setFlipped(!flipped)}
            className="group relative flex min-h-[340px] cursor-pointer flex-col justify-between rounded-3xl border-2 border-[#3B41E3]/30 bg-card p-7 sm:p-8 soft-shadow transition-all hover:border-[#3B41E3]"
          >
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{currentCard.deck}</Badge>
              <span className="text-xs font-bold text-muted-foreground">
                Thẻ {currentIndex + 1} / {cards.length} • Chu kỳ:{" "}
                {currentCard.intervalDays} ngày
              </span>
            </div>

            <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
              <span
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider mb-4 ${
                  flipped
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : "bg-indigo-500/15 text-[#3B41E3] dark:text-indigo-400"
                }`}
              >
                <Lightbulb className="h-3.5 w-3.5" />
                {flipped
                  ? "Mặt sau (Đáp án, Công thức & Mẹo nhớ)"
                  : "Mặt trước (Câu hỏi ôn tập)"}
              </span>

              <div className="prose prose-base dark:prose-invert max-w-xl text-foreground font-semibold leading-relaxed [&>p]:my-2 [&_.katex-display]:my-3 [&_.katex]:text-lg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {flipped ? currentCard.back : currentCard.front}
                </ReactMarkdown>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#3B41E3] dark:text-indigo-400">
                <RotateCw className="h-3.5 w-3.5" />
                Bấm vào thẻ để lật mặt trước / mặt sau
              </span>
              <span>Hệ số ghi nhớ: {currentCard.ease}</span>
            </div>
          </div>

          {/* Spaced Repetition Rating Buttons */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button
              type="button"
              onClick={() => handleSpacedRepetitionRate("again")}
              className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-3 text-xs font-extrabold text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition"
            >
              Quên rồi (10 phút)
            </button>
            <button
              type="button"
              onClick={() => handleSpacedRepetitionRate("hard")}
              className="rounded-2xl border border-amber-500/30 bg-amber-500/10 py-3 text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition"
            >
              Hơi khó (1 ngày)
            </button>
            <button
              type="button"
              onClick={() => handleSpacedRepetitionRate("good")}
              className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 py-3 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition"
            >
              Nhớ tốt (4 ngày)
            </button>
            <button
              type="button"
              onClick={() => handleSpacedRepetitionRate("easy")}
              className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 py-3 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition"
            >
              Rất dễ (7 ngày)
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFlipped(false);
                setCurrentIndex(
                  (prev) => (prev - 1 + cards.length) % cards.length
                );
              }}
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Thẻ trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFlipped(false);
                setCurrentIndex((prev) => (prev + 1) % cards.length);
              }}
            >
              Thẻ tiếp theo <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right: AI Flashcard Generator from Text */}
        <Card className="lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3B41E3] text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-foreground">
                  Nhờ AI Gemini sinh Flashcard tự động
                </h3>
                <p className="text-xs text-muted-foreground">
                  Dán đoạn văn bản SGK hoặc ghi chú bài giảng để AI tách thẻ dễ hiểu
                </p>
              </div>
            </div>

            <textarea
              rows={6}
              value={aiSourceText}
              onChange={(e) => setAiSourceText(e.target.value)}
              placeholder="Ví dụ: Đường thẳng y = ax + b (a ≠ 0) được gọi là đường tiệm cận xiên của đồ thị hàm số y = f(x) nếu lim(x→+∞)[f(x) - (ax + b)] = 0..."
              className="w-full rounded-2xl border border-input bg-background p-4 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            <Button
              onClick={handleGenerateByAI}
              disabled={generating}
              className="w-full gap-2 bg-[#3B41E3] hover:bg-[#3136C8] text-white"
            >
              <Brain className="h-4 w-4" />
              {generating
                ? "AI đang phân tích & vẽ công thức..."
                : "Sinh bộ thẻ Flashcard bằng AI"}
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/40 p-4 space-y-2 text-xs">
            <p className="font-extrabold text-foreground flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-[#3B41E3]" />
              Danh sách bộ thẻ của bạn ({cards.length} thẻ)
            </p>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Cần ôn hôm nay:</span>
              <span className="font-bold text-amber-500">12 thẻ</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Đã thuộc lòng:</span>
              <span className="font-bold text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> 84 thẻ
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
