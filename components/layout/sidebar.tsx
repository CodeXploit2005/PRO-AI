"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenCheck, Flame, Scale, MessageCircleQuestion } from "lucide-react";
import { SIDEBAR_NAV_ITEMS, APP_NAME } from "@/constants";
import { DynamicIcon } from "@/components/shared/subject-icon";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-40 border-r border-border bg-card">
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-border/70">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <BookOpenCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                {APP_NAME}
              </span>
              <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                GDPT 2018
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Góc tự học THPT Lớp 10 • 11 • 12
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav
        aria-label="Điều hướng chính"
        className="flex-1 space-y-1 overflow-y-auto px-3.5 py-5"
      >
        <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
          Không gian học tập
        </p>
        {SIDEBAR_NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                isActive
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary" />
              )}
              <div className="flex items-center gap-3">
                <DynamicIcon
                  name={item.iconName}
                  className={cn(
                    "h-[18px] w-[18px] transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[10px] font-bold",
                    item.badge === "AI"
                      ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300"
                      : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Human Mentor / AI Study Desk Note Card */}
      <div className="p-4">
        <div className="rounded-2xl border border-border bg-secondary/40 p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80"
              alt="Gia sư hỗ trợ"
              className="h-10 w-10 rounded-xl object-cover ring-2 ring-background"
            />
            <div>
              <p className="text-xs font-bold text-foreground">
                Bàn hướng dẫn 24/7
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                ● Sẵn sàng giải đáp bài tập
              </p>
            </div>
          </div>

          <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
            Gặp câu Toán, Lý, Hóa khó hiểu hay cần sửa bài văn? Gửi đề bài để được hướng dẫn từng bước nhé.
          </p>

          <Link
            href="/ai-tutor"
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-95"
          >
            <MessageCircleQuestion className="h-3.5 w-3.5" />
            Mở bàn hỏi bài ngay
          </Link>
        </div>

        {/* Legal / Terms Footer */}
        <div className="mt-3 flex items-center justify-between px-2 text-[11px] text-muted-foreground">
          <Link
            href="/terms"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Scale className="h-3 w-3" />
            Điều khoản & Bản quyền
          </Link>
          <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
            <Flame className="h-3 w-3 fill-current" /> 12 ngày
          </span>
        </div>
      </div>
    </aside>
  );
}
