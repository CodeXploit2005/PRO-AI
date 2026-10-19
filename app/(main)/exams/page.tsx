"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Clock,
  Play,
  FileCheck2,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  Building2,
  Users,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { SUBJECTS, EXAM_TYPES } from "@/constants";
import { REAL_EXAMS, RealExamResource } from "@/constants/real-resources";
import { ExamType, GradeLevel } from "@/types";
import { DynamicIcon } from "@/components/shared/subject-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

export default function ExamsPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<ExamType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Online Exam Mode States
  const [activeExam, setActiveExam] = useState<RealExamResource | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [examHistory, setExamHistory] = useState<
    { title: string; score: string; date: string }[]
  >([
    {
      title: "Đề tham khảo Tốt nghiệp THPT môn Toán - Bộ GD&ĐT",
      score: "9.0 / 10",
      date: "Hôm qua",
    },
  ]);

  useEffect(() => {
    if (!activeExam || submitted || timeLeftSeconds <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          toast.info("Đã hết thời gian làm bài! Hệ thống tự động nộp bài.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeExam, submitted, timeLeftSeconds]);

  const startOnlineExam = (exam: RealExamResource) => {
    setActiveExam(exam);
    setUserAnswers({});
    setSubmitted(false);
    setTimeLeftSeconds(exam.durationMinutes * 60);
    toast.success(`Bắt đầu làm đề: ${exam.title}`);
  };

  const handleSubmitExam = () => {
    if (!activeExam) return;
    setSubmitted(true);
    let correct = 0;
    activeExam.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) correct++;
    });
    const tenScale = ((correct / activeExam.questions.length) * 10).toFixed(1);
    setExamHistory([
      {
        title: activeExam.title,
        score: `${tenScale} / 10`,
        date: "Vừa xong",
      },
      ...examHistory,
    ]);
    toast.success(
      `Nộp bài thành công! Bạn đạt ${tenScale}/10 điểm (+150 XP)`
    );
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const filteredExams = REAL_EXAMS.filter((ex) => {
    if (selectedGrade !== "all" && ex.grade !== selectedGrade) return false;
    if (selectedSubject !== "all" && ex.subjectSlug !== selectedSubject)
      return false;
    if (selectedType !== "all" && ex.examType !== selectedType) return false;
    if (
      searchQuery.trim() &&
      !ex.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ex.schoolOrProvince.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ex.sourceName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  if (activeExam) {
    const correctCount = activeExam.questions.filter(
      (q) => userAnswers[q.id] === q.correctIndex
    ).length;
    const score10 = (
      (correctCount / activeExam.questions.length) *
      10
    ).toFixed(1);

    return (
      <div className="space-y-6">
        <div className="sticky top-20 z-20 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-primary/40 bg-card/95 p-5 shadow-md backdrop-blur-xl">
          <div>
            <Badge variant="default" className="mb-1">
              Phòng Thi Trực Tuyến • Lớp {activeExam.grade} • Nguồn: {activeExam.sourceName}
            </Badge>
            <h1 className="text-lg font-extrabold text-foreground">
              {activeExam.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-amber-500/15 px-4 py-2 text-base font-extrabold text-amber-600 dark:text-amber-400">
              <Clock className="h-5 w-5" />
              <span>{formatTimer(timeLeftSeconds)}</span>
            </div>

            {!submitted ? (
              <Button onClick={handleSubmitExam} variant="accent">
                Nộp bài & Chấm điểm
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setActiveExam(null)}>
                Thoát phòng thi
              </Button>
            )}
          </div>
        </div>

        {submitted && (
          <Card className="border-emerald-500/40 bg-emerald-500/5 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow">
                  <Trophy className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Kết quả bài làm của bạn
                  </p>
                  <h2 className="text-2xl font-extrabold text-foreground">
                    {score10} / 10 điểm ({correctCount}/
                    {activeExam.questions.length} câu đúng)
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Đã lưu vào lịch sử làm đề và cộng <strong>+150 XP</strong>!
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => startOnlineExam(activeExam)}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Làm lại đề
                </Button>
                <Button onClick={() => setActiveExam(null)}>
                  Về kho đề thi
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-5">
          {activeExam.questions.map((q, idx) => {
            const chosen = userAnswers[q.id];
            return (
              <Card key={q.id} className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-foreground">
                    <span className="mr-2.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#3B41E3] text-xs font-extrabold text-white">
                      Câu {idx + 1}
                    </span>
                    {q.question}
                  </h3>
                  {submitted &&
                    (chosen === q.correctIndex ? (
                      <Badge variant="success" className="shrink-0 gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Đúng
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="shrink-0 gap-1">
                        <XCircle className="h-3.5 w-3.5" /> Sai
                      </Badge>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    const isCorrect = q.correctIndex === optIdx;
                    const optionLetter = ["A", "B", "C", "D"][optIdx];

                    let btnStyle =
                      "border-border bg-background hover:bg-secondary/70 text-foreground";
                    if (!submitted && isSelected) {
                      btnStyle =
                        "border-[#3B41E3] bg-indigo-500/10 text-[#3B41E3] dark:text-indigo-300 ring-2 ring-[#3B41E3]/20";
                    } else if (submitted) {
                      if (isCorrect) {
                        btnStyle =
                          "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300";
                      } else if (isSelected && !isCorrect) {
                        btnStyle =
                          "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300";
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={submitted}
                        onClick={() =>
                          setUserAnswers({ ...userAnswers, [q.id]: optIdx })
                        }
                        className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm font-semibold transition ${btnStyle}`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-current text-xs font-extrabold">
                          {optionLetter}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-xs leading-relaxed">
                    <p className="font-extrabold text-[#3B41E3] dark:text-indigo-300 flex items-center gap-1.5 mb-1">
                      <Sparkles className="h-4 w-4" />
                      Lời giải chi tiết:
                    </p>
                    <p className="text-foreground/90">{q.explanation}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Clean White Header Card */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/70 bg-card p-6 sm:flex-row sm:items-center soft-shadow">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">
              Ngân Hàng Đề Thi Thực Tế
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 px-3 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200/60">
              ● 283 bạn đang làm đề
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Đề tham khảo Bộ GD&ĐT, Sở GD&ĐT Hà Nội, Chuyên KHTN, Chuyên Lê Hồng Phong kèm link nguồn gốc đối chiếu.
          </p>
        </div>

        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm đề Bộ GD&ĐT, Sở Hà Nội..."
            className="pl-10 bg-[#F8FAFC] dark:bg-secondary/60"
          />
        </div>
      </div>

      {/* Recent Score History Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 text-xs soft-shadow">
        <span className="font-bold text-foreground flex items-center gap-2">
          <FileCheck2 className="h-4 w-4 text-[#3B41E3]" />
          Lịch sử làm đề gần đây:
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {examHistory.slice(0, 3).map((h, i) => (
            <span
              key={i}
              className="rounded-xl bg-secondary px-3 py-1 font-semibold text-foreground"
            >
              {h.title}:{" "}
              <strong className="text-emerald-600 dark:text-emerald-400">
                {h.score}
              </strong>{" "}
              ({h.date})
            </span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(["all", 10, 11, 12] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setSelectedGrade(g)}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition ${
                selectedGrade === g
                  ? "bg-[#3B41E3] text-white shadow-sm"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {g === "all" ? "Tất cả khối" : `Lớp ${g}`}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedType("all")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              selectedType === "all"
                ? "bg-amber-500 text-white"
                : "bg-card border border-border text-muted-foreground"
            }`}
          >
            Tất cả kỳ thi
          </button>
          {EXAM_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setSelectedType(t.value)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                selectedType === t.value
                  ? "bg-amber-500 text-white"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setSelectedSubject("all")}
          className={`shrink-0 rounded-2xl border px-4 py-2 text-xs font-bold transition ${
            selectedSubject === "all"
              ? "border-[#3B41E3] bg-indigo-50 text-[#3B41E3] dark:bg-indigo-500/20 dark:text-indigo-300"
              : "border-border bg-card text-muted-foreground"
          }`}
        >
          Tất cả môn
        </button>
        {SUBJECTS.map((sub) => (
          <button
            key={sub.id}
            type="button"
            onClick={() => setSelectedSubject(sub.slug)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-bold transition ${
              selectedSubject === sub.slug
                ? `${sub.badgeBg} ${sub.badgeText} border-current`
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            }`}
          >
            <DynamicIcon name={sub.iconName} className="h-4 w-4" />
            {sub.name}
          </button>
        ))}
      </div>

      {/* Clean White & Pastel Exam Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredExams.map((exam) => {
          const sub =
            SUBJECTS.find((s) => s.slug === exam.subjectSlug) || SUBJECTS[0];
          const examTypeLabel =
            EXAM_TYPES.find((t) => t.value === exam.examType)?.label ||
            "Đề thi";

          return (
            <div
              key={exam.id}
              className="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 soft-shadow transition-all duration-200 hover:-translate-y-1 hover:border-[#3B41E3]/40"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${sub.badgeBg} ${sub.badgeText}`}
                    >
                      <DynamicIcon name={sub.iconName} className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-xs font-extrabold ${sub.badgeText}`}>
                          {sub.name}
                        </span>
                        <span>•</span>
                        <Badge variant="secondary" className="text-[11px]">
                          Lớp {exam.grade}
                        </Badge>
                      </div>
                      <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
                        {examTypeLabel} • {exam.durationMinutes} phút
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <Users className="h-3 w-3" /> {exam.participantsOnline}
                  </span>
                </div>

                <h3 className="mt-4 line-clamp-2 text-base font-extrabold leading-snug text-foreground group-hover:text-[#3B41E3] dark:group-hover:text-indigo-400 transition-colors">
                  {exam.title}
                </h3>

                {/* Verified Source Info */}
                <div className="mt-4 rounded-2xl border border-border/70 bg-[#F8FAFC] dark:bg-secondary/40 px-3.5 py-2.5 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                      <Building2 className="h-3.5 w-3.5 text-[#3B41E3]" />
                      {exam.schoolOrProvince}
                    </span>
                    <span className="text-muted-foreground">
                      {formatNumber(exam.downloads)} lượt tải
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Nguồn đề gốc:</span>
                    <a
                      href={exam.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#3B41E3] dark:text-indigo-400 hover:underline"
                    >
                      {exam.sourceName}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-border/60 pt-4">
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5 text-xs font-bold"
                  >
                    <a
                      href={exam.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Xem PDF trên {exam.sourceName}
                    </a>
                  </Button>
                </div>
                <Button
                  size="sm"
                  onClick={() => startOnlineExam(exam)}
                  className="w-full gap-2 bg-[#3B41E3] hover:bg-[#3136C8] text-white font-bold"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Làm bài Online ngay ({exam.durationMinutes} phút)
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
