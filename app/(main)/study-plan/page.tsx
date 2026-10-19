"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  Plus,
  Bell,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SUBJECT_PROGRESS_DATA = [
  { subject: "Toán", completed: 82, target: 90 },
  { subject: "Vật lý", completed: 74, target: 85 },
  { subject: "Hóa học", completed: 68, target: 85 },
  { subject: "Tiếng Anh", completed: 88, target: 92 },
  { subject: "Ngữ văn", completed: 70, target: 80 },
];

export default function StudyPlanPage() {
  const [plans, setPlans] = useState([
    {
      id: "sp-1",
      day: "Thứ 2",
      title: "Giải 30 câu Khảo sát hàm số & Tiệm cận (Toán 12)",
      time: "19:30 - 21:00",
      done: true,
    },
    {
      id: "sp-2",
      day: "Thứ 3",
      title: "Ôn tập Công thức Khí lý tưởng & Làm đề 15p Vật Lý",
      time: "20:00 - 21:30",
      done: true,
    },
    {
      id: "sp-3",
      day: "Thứ 4",
      title: "Học 40 Flashcard Từ vựng Unit 2 Tiếng Anh Global Success",
      time: "19:30 - 20:30",
      done: false,
    },
    {
      id: "sp-4",
      day: "Thứ 5",
      title: "Luyện đề thi thử Hóa học Chuyên KHTN (50 phút)",
      time: "20:30 - 21:30",
      done: false,
    },
  ]);

  const togglePlan = (id: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, done: !p.done } : p)));
    toast.success("Đã cập nhật tiến độ kế hoạch học tập!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/80 bg-card p-6 sm:flex-row sm:items-center soft-shadow">
        <div>
          <Badge variant="default" className="mb-2">
            Quản lý Thời gian & Mục tiêu Điểm số
          </Badge>
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            Lịch Ôn Tập & Theo Dõi Tiến Độ
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Lập kế hoạch học tập theo tuần, bật thông báo nhắc nhở và theo dõi biểu đồ tiến bộ từng môn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast.success("Đã bật thông báo nhắc nhở ôn tập lúc 19:30 mỗi tối!")
            }
          >
            <Bell className="mr-2 h-4 w-4 text-amber-500" />
            Bật nhắc nhở
          </Button>
          <Button
            onClick={() => {
              setPlans([
                ...plans,
                {
                  id: `sp-${Date.now()}`,
                  day: "Thứ 6",
                  title: "Luyện viết đoạn văn Nghị luận xã hội 200 chữ cùng AI",
                  time: "20:00 - 21:00",
                  done: false,
                },
              ]);
              toast.success("Đã thêm mục tiêu mới vào lịch tuần!");
            }}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Thêm lịch học
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Weekly Schedule List */}
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-primary" />
              Kế hoạch học tập trong tuần
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {plans.map((p) => (
              <div
                key={p.id}
                onClick={() => togglePlan(p.id)}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-border p-4 transition hover:border-primary/40"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className={`h-5 w-5 shrink-0 mt-0.5 ${
                      p.done ? "text-emerald-500" : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <span className="text-[11px] font-extrabold uppercase text-primary">
                      {p.day} • {p.time}
                    </span>
                    <p
                      className={`text-sm font-bold ${
                        p.done ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {p.title}
                    </p>
                  </div>
                </div>
                <Badge variant={p.done ? "success" : "secondary"}>
                  {p.done ? "Hoàn thành" : "Sắp tới"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recharts Progress Chart */}
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Biểu đồ Tiến độ Hoàn thành Chuyên đề (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SUBJECT_PROGRESS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="subject" fontSize={12} />
                  <YAxis fontSize={12} domain={[0, 100]} />
                  <Tooltip />
                  <Bar
                    dataKey="completed"
                    name="Tiến độ hiện tại (%)"
                    fill="#4F46E5"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="target"
                    name="Mục tiêu đề ra (%)"
                    fill="#F59E0B"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-indigo-500/10 p-3.5 text-xs">
              <span className="font-bold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Mục tiêu Tổ hợp xét tuyển: A00 & D01 (27.5+ Điểm)
              </span>
              <span className="font-extrabold text-primary">Đạt 78% lộ trình</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
