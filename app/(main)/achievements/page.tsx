"use client";

import React, { useState } from "react";
import { Trophy, Flame, Zap, Medal, Award, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BADGES = [
  {
    title: "Chuỗi 7 ngày tự học",
    desc: "Duy trì thói quen ôn bài 7 ngày liên tiếp",
    unlocked: true,
    icon: Flame,
    color: "text-amber-500 bg-amber-500/15",
  },
  {
    title: "Chiến binh Luyện đề",
    desc: "Hoàn thành 15 đề thi thử THPT trực tuyến",
    unlocked: true,
    icon: Trophy,
    color: "text-indigo-500 bg-indigo-500/15",
  },
  {
    title: "Học sinh Ham học hỏi",
    desc: "Trao đổi 50 bài tập khó tại Bàn hướng dẫn AI",
    unlocked: true,
    icon: Zap,
    color: "text-violet-500 bg-violet-500/15",
  },
  {
    title: "Thủ khoa Khối 12",
    desc: "Đạt điểm 9.5+ trong 3 đề thi thử liên tiếp",
    unlocked: false,
    icon: Crown,
    color: "text-muted-foreground bg-secondary",
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    name: "Nguyễn Hoàng Bảo",
    grade: 12,
    school: "THPT Chuyên KHTN Hà Nội",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    xp: 5420,
    streak: 28,
  },
  {
    rank: 2,
    name: "Trần Ngọc Khánh Linh",
    grade: 12,
    school: "THPT Chuyên Lê Hồng Phong TP.HCM",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    xp: 4980,
    streak: 24,
  },
  {
    rank: 3,
    name: "Lê Quốc Khánh",
    grade: 11,
    school: "THPT Chuyên Phan Bội Châu - Nghệ An",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    xp: 4610,
    streak: 19,
  },
  {
    rank: 4,
    name: "Nguyễn Minh Đức (Bạn)",
    grade: 12,
    school: "THPT Chu Văn An - Hà Nội",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    xp: 2450,
    streak: 12,
  },
  {
    rank: 5,
    name: "Phạm Thảo Vy",
    grade: 10,
    school: "THPT Nguyễn Thị Minh Khai",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    xp: 2190,
    streak: 11,
  },
];

export default function AchievementsPage() {
  const [filterGrade, setFilterGrade] = useState<"all" | 10 | 11 | 12>("all");

  const filteredLeaderboard = LEADERBOARD.filter(
    (u) => filterGrade === "all" || u.grade === filterGrade
  );

  return (
    <div className="space-y-6">
      {/* Top Profile Banner with Student Photo */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-slate-900 p-6 sm:p-8 text-white soft-shadow">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
          alt="Học sinh tiêu biểu"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-indigo-950/85 to-slate-900/70" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
              alt="Nguyễn Minh Đức"
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-amber-400"
            />
            <div>
              <span className="inline-block rounded-lg bg-amber-500/20 border border-amber-400/30 px-2.5 py-0.5 text-xs font-bold text-amber-300 mb-1">
                Hồ sơ Học tập Cá nhân
              </span>
              <h1 className="text-2xl font-extrabold sm:text-3xl">
                Nguyễn Minh Đức • Lớp 12A1
              </h1>
              <p className="mt-0.5 text-sm text-slate-300">
                Đang tích lũy <strong>2,450 XP</strong> • Chuỗi{" "}
                <strong>12 ngày tự học liên tiếp</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/15 p-4 backdrop-blur-md">
            <Award className="h-10 w-10 text-amber-300" />
            <div>
              <p className="text-xs font-semibold text-slate-300">
                Thứ hạng tuần này
              </p>
              <p className="text-2xl font-extrabold">#4 Toàn trường</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div>
        <h2 className="text-lg font-extrabold mb-4">Dấu ấn & Huy hiệu đạt được</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <Card
                key={b.title}
                className={`p-5 ${!b.unlocked ? "opacity-60 grayscale" : ""}`}
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${b.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3.5 text-sm font-extrabold">{b.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{b.desc}</p>
                <Badge
                  variant={b.unlocked ? "success" : "secondary"}
                  className="mt-3"
                >
                  {b.unlocked ? "Đã đạt được" : "Đang phấn đấu"}
                </Badge>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Leaderboard with Real Student Avatars */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-amber-500" />
            Bảng Vàng Học Sinh Chăm Chỉ Tuần Này
          </CardTitle>
          <div className="flex items-center gap-2">
            {(["all", 10, 11, 12] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setFilterGrade(g)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  filterGrade === g
                    ? "bg-primary text-white"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {g === "all" ? "Tất cả khối" : `Khối ${g}`}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredLeaderboard.map((u) => (
            <div
              key={u.rank}
              className={`flex items-center justify-between rounded-2xl border p-3.5 ${
                u.name.includes("Bạn")
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-xs font-extrabold text-amber-600 dark:text-amber-400">
                  #{u.rank}
                </span>
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="h-10 w-10 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-extrabold text-foreground">
                    {u.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lớp {u.grade} • {u.school}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-extrabold">
                <span className="text-amber-600 dark:text-amber-400">
                  🔥 {u.streak} ngày
                </span>
                <span className="text-primary text-sm">
                  {u.xp.toLocaleString()} XP
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
