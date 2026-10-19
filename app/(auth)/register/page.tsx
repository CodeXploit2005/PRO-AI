"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, User, Mail, Lock, School, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { APP_NAME } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function RegisterPage() {
  const router = useRouter();
  const [grade, setGrade] = useState<10 | 11 | 12>(12);
  const [role, setRole] = useState<"student" | "teacher">("student");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Tạo tài khoản thành công! +100 XP khởi đầu dành cho bạn.");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background p-4 sm:p-8 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-violet-500/15 to-amber-500/10 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-amber-500 text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">{APP_NAME}</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="mx-auto my-6 w-full max-w-lg">
        <Card className="p-2 sm:p-4 border-border/80">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-2xl font-extrabold">
              Tạo tài khoản {APP_NAME}
            </CardTitle>
            <CardDescription>
              Cá nhân hóa lộ trình học tập theo khối lớp và mục tiêu của bạn
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Role & Grade Selector */}
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-secondary p-1.5">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`rounded-xl py-2 text-xs font-extrabold transition ${
                    role === "student"
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  🎓 Học sinh THPT
                </button>
                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`rounded-xl py-2 text-xs font-extrabold transition ${
                    role === "teacher"
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  👩‍🏫 Giáo viên
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Chọn khối lớp hiện tại
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {([10, 11, 12] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGrade(g)}
                      className={`rounded-2xl border py-2.5 text-xs font-extrabold transition ${
                        grade === g
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      Lớp {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Họ và tên</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input required placeholder="Nguyễn Minh Đức" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Trường THPT</label>
                  <div className="relative">
                    <School className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input required placeholder="THPT Chu Văn An" className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Địa chỉ Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" required placeholder="hocsinh@gmail.com" className="pl-10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Mật khẩu (tối thiểu 8 ký tự)</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="password" required minLength={8} placeholder="••••••••" className="pl-10" />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Hoàn tất đăng ký
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link href="/login" className="font-bold text-primary hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Bằng việc đăng ký, bạn đồng ý với{" "}
        <Link href="/terms" className="underline hover:text-primary">
          Điều khoản & Bản quyền
        </Link>{" "}
        của {APP_NAME}.
      </div>
    </div>
  );
}
