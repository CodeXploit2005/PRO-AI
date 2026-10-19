"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  CalendarClock,
  Sparkles,
  BookOpen,
  FileCheck2,
  Trophy,
  ArrowRight,
  Clock,
  CheckCircle2,
  Target,
  Zap,
  Settings2,
  Users,
} from "lucide-react";
import { SUBJECTS } from "@/constants";
import { DynamicIcon } from "@/components/shared/subject-icon";
import { ResourceCard, ResourceCardProps } from "@/components/shared/resource-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RECENT_RESOURCES: ResourceCardProps[] = [
  {
    id: "doc-1",
    title: "Sơ đồ tư duy Khảo sát & Vẽ đồ thị hàm số chuẩn GDPT 2018",
    subjectSlug: "toan-hoc",
    grade: 12,
    year: 2026,
    categoryLabel: "Sơ đồ tư duy",
    downloads: 3420,
    rating: 4.9,
    href: "/documents",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    authorName: "Thầy Nguyễn Quốc Chí",
    authorAvatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "exam-1",
    title: "Đề thi thử Tốt nghiệp THPT 2026 môn Vật Lý - Chuyên Hà Nội Amsterdam",
    subjectSlug: "vat-ly",
    grade: 12,
    year: 2026,
    categoryLabel: "Thi thử THPT",
    downloads: 2180,
    rating: 5.0,
    href: "/exams",
    onlineExamHref: "/exams",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80",
    authorName: "Cô Trần Thu Hà",
    authorAvatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "doc-2",
    title: "Tổng hợp 200 công thức giải nhanh Hóa Hữu Cơ & Danh pháp IUPAC mới",
    subjectSlug: "hoa-hoc",
    grade: 11,
    year: 2026,
    categoryLabel: "Công thức tóm tắt",
    downloads: 4190,
    rating: 4.8,
    href: "/documents",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    authorName: "Thầy Phạm Văn Trọng",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "exam-2",
    title: "Đề kiểm tra Giữa kỳ 1 Tiếng Anh 12 Global Success có giải chi tiết",
    subjectSlug: "tieng-anh",
    grade: 12,
    year: 2026,
    categoryLabel: "Đề Giữa kỳ",
    downloads: 1850,
    rating: 4.9,
    href: "/exams",
    onlineExamHref: "/exams",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    authorName: "Ms. Hoàng Lan (IELTS 8.5)",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
];

const WEEKLY_STUDY_HOURS = [
  { day: "T2", hours: 2.5 },
  { day: "T3", hours: 3.2 },
  { day: "T4", hours: 1.8 },
  { day: "T5", hours: 4.0 },
  { day: "T6", hours: 3.5 },
  { day: "T7", hours: 4.5 },
  { day: "CN", hours: 3.8 },
];

export default function DashboardPage() {
  const [examTargetName, setExamTargetName] = useState(
    "Kỳ thi Tốt nghiệp THPT 2027"
  );
  const [daysLeft, setDaysLeft] = useState(252);
  const [editingCountdown, setEditingCountdown] = useState(false);

  return (
    <div className="space-y-8">
      {/* Top Welcome Hero with Real Photography + Exam Countdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Welcome Banner with Photo Background */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl lg:col-span-8">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
            alt="Góc học tập BYE THPT"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-indigo-900/85 to-violet-900/60" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/20 border border-amber-400/30 px-3 py-1 text-xs font-extrabold text-amber-300 backdrop-blur-md">
                  <Flame className="h-4 w-4 fill-amber-400 text-amber-400" />
                  Streak 12 ngày liên tiếp
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100 backdrop-blur-md">
                  <Users className="h-3.5 w-3.5 text-emerald-400" />
                  Cùng 142 bạn Khối 12 đang ôn bài
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
                  alt="Minh Đức"
                  className="hidden sm:block h-14 w-14 rounded-2xl object-cover ring-2 ring-amber-400 shadow-md"
                />
                <div>
                  <h1 className="text-2xl font-extrabold sm:text-3xl">
                    Chào buổi tối, Minh Đức! 👋
                  </h1>
                  <p className="mt-1 max-w-xl text-sm text-indigo-100/90 leading-relaxed">
                    Hôm nay cậu đã hoàn thành <strong>2/3 mục tiêu</strong>. Giải nốt 1 đề Vật lý 15 phút để giữ vững vị trí{" "}
                    <strong className="text-amber-300">Top #4 lớp 12A1</strong> nhé!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                asChild
                variant="accent"
                className="font-bold shadow-lg"
              >
                <Link href="/ai-tutor">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Hỏi Gia sư AI Gemini
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="bg-white/15 text-white hover:bg-white/25 border-0 backdrop-blur-md"
              >
                <Link href="/exams">Vào phòng luyện đề</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Configurable Exam Countdown Card */}
        <Card className="flex flex-col justify-between p-6 lg:col-span-4 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <CalendarClock className="h-4 w-4" />
                Đếm ngược kỳ thi
              </span>
              <button
                type="button"
                onClick={() => setEditingCountdown(!editingCountdown)}
                aria-label="Cấu hình kỳ thi đếm ngược"
                className="rounded-xl p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </div>

            {editingCountdown ? (
              <div className="mt-4 space-y-2.5">
                <input
                  type="text"
                  value={examTargetName}
                  onChange={(e) => setExamTargetName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={daysLeft}
                    onChange={(e) => setDaysLeft(Number(e.target.value) || 1)}
                    className="w-24 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold"
                  />
                  <span className="text-xs text-muted-foreground">ngày</span>
                  <Button
                    size="sm"
                    onClick={() => setEditingCountdown(false)}
                    className="ml-auto h-8 px-3 text-xs"
                  >
                    Lưu
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="mt-3 text-base font-extrabold text-foreground">
                  {examTargetName}
                </h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight text-amber-500">
                    {daysLeft}
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">
                    ngày nữa
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 border-t border-border/60 pt-3.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>Nguyện vọng 1: ĐH Bách Khoa (27.5+)</span>
            <Link
              href="/study-plan"
              className="font-bold text-primary hover:underline"
            >
              Lịch ôn →
            </Link>
          </div>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Tài liệu đã học
            </p>
            <p className="text-2xl font-extrabold text-foreground">48</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <FileCheck2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Đề thi hoàn thành
            </p>
            <p className="text-2xl font-extrabold text-foreground">19 đề</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Điểm TB trắc nghiệm
            </p>
            <p className="text-2xl font-extrabold text-foreground">8.6 / 10</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Xếp hạng Khối 12
            </p>
            <p className="text-2xl font-extrabold text-foreground">Top #14</p>
          </div>
        </Card>
      </div>

      {/* Continue Learning + Weekly Activity Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Continue Learning with Thumbnails */}
        <Card className="lg:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Tiếp tục học</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Các chuyên đề & bộ thẻ bạn đang học dở
              </p>
            </div>
            <Link
              href="/documents"
              className="text-xs font-bold text-primary hover:underline"
            >
              Xem tất cả
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Chương 1: Ứng dụng đạo hàm để khảo sát hàm số",
                subject: "toan-hoc",
                progress: 75,
                lastStudied: "2 giờ trước",
                thumb:
                  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=200&q=80",
              },
              {
                title: "Chuyên đề Khí lý tưởng & Nhiệt động lực học Vật lý 12",
                subject: "vat-ly",
                progress: 45,
                lastStudied: "Hôm qua",
                thumb:
                  "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=200&q=80",
              },
              {
                title: "Bộ Flashcard 150 Từ vựng Unit 1-3 Global Success 12",
                subject: "tieng-anh",
                progress: 90,
                lastStudied: "3 ngày trước",
                thumb:
                  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80",
              },
            ].map((item) => {
              const sub =
                SUBJECTS.find((s) => s.slug === item.subject) || SUBJECTS[0];
              return (
                <div
                  key={item.title}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/70 bg-secondary/30 p-3.5 transition hover:border-primary/40"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        {item.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className={`font-bold ${sub.badgeText}`}>
                          {sub.name}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.lastStudied}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:w-44">
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span>Tiến độ</span>
                        <span className="text-primary">{item.progress}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                    <Button asChild size="sm" variant="secondary">
                      <Link href="/documents">Học</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Weekly Study Statistics */}
        <Card className="lg:col-span-5 flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Thống kê tuần này</CardTitle>
              <Badge variant="success">+18% so với tuần trước</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng thời gian tự học: <strong>23.3 giờ</strong> (Mục tiêu: 25h)
            </p>
          </CardHeader>

          <CardContent>
            <div className="mt-4 flex h-44 items-end justify-between gap-2 pt-6 px-2">
              {WEEKLY_STUDY_HOURS.map((item) => {
                const heightPercent = Math.round((item.hours / 5) * 100);
                return (
                  <div
                    key={item.day}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {item.hours}h
                    </span>
                    <div className="relative flex h-28 w-full max-w-[32px] items-end rounded-xl bg-secondary/70 p-1">
                      <div
                        className="w-full rounded-lg bg-gradient-to-t from-indigo-600 to-violet-500 transition-all duration-500"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Hoàn thành 14/16 nhiệm vụ tuần
              </span>
              <span className="inline-flex items-center gap-1 font-extrabold text-indigo-600 dark:text-indigo-400">
                <Zap className="h-3.5 w-3.5" /> +350 XP
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Subject Selector */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-foreground">
            Truy cập nhanh theo Môn học
          </h2>
          <Link
            href="/documents"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Xem toàn bộ 10 môn <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">
          {SUBJECTS.map((sub) => (
            <Link
              key={sub.id}
              href={`/documents?subject=${sub.slug}`}
              className={`group flex flex-col items-center justify-center rounded-2xl border border-border/80 bg-card p-3.5 text-center soft-shadow transition-all hover:-translate-y-1 ${sub.borderHover}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${sub.badgeBg} ${sub.badgeText} transition-transform group-hover:scale-110`}
              >
                <DynamicIcon name={sub.iconName} className="h-5 w-5" />
              </div>
              <span className="mt-2 text-xs font-bold text-foreground line-clamp-1">
                {sub.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Documents & Exams */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">
              Tài liệu & Đề thi mới cập nhật
            </h2>
            <p className="text-xs text-muted-foreground">
              Biên soạn bởi các thầy cô giáo trường chuyên & kiểm duyệt kỹ lưỡng
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/exams">Kho đề thi →</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {RECENT_RESOURCES.map((res) => (
            <ResourceCard key={res.id} {...res} />
          ))}
        </div>
      </div>
    </div>
  );
}
