"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { APP_NAME } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("minhduc12a1@byethpt.vn");
  const [password, setPassword] = useState("12345678");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Đăng nhập thành công! Chào mừng Minh Đức quay trở lại.");
      router.push("/dashboard");
    }, 600);
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

      <div className="mx-auto my-8 w-full max-w-md">
        <Card className="p-2 sm:p-4 border-border/80">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Học tập thông minh cùng AI
            </div>
            <CardTitle className="text-2xl font-extrabold">Chào mừng trở lại!</CardTitle>
            <CardDescription>
              Đăng nhập để tiếp tục chuỗi ngày học (Streak) và ôn luyện THPT
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                toast.success("Đăng nhập bằng Google thành công!");
                router.push("/dashboard");
              }}
              className="w-full gap-2.5 font-bold"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
                />
              </svg>
              Tiếp tục với tài khoản Google
            </Button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-border w-full" />
              <span className="bg-card px-3 text-xs text-muted-foreground whitespace-nowrap">
                hoặc bằng Email
              </span>
              <div className="border-t border-border w-full" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Email học sinh / giáo viên</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tenban@gmail.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground">Mật khẩu</label>
                  <span className="text-xs font-semibold text-primary cursor-pointer hover:underline">
                    Quên mật khẩu?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPass ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-2">
                {loading ? "Đang xác thực..." : "Đăng nhập ngay"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground pt-2">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="font-bold text-primary hover:underline">
                Đăng ký miễn phí
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        © 2026 {APP_NAME} • Hỗ trợ học sinh THPT Lớp 10, 11, 12
      </div>
    </div>
  );
}
