"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Flame,
  Bell,
  Zap,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Input } from "@/components/ui/input";
import { SIDEBAR_NAV_ITEMS, APP_NAME } from "@/constants";
import { DynamicIcon } from "@/components/shared/subject-icon";

export function TopHeader() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between gap-4 border-b border-border/80 bg-background/85 px-4 backdrop-blur-xl sm:px-8">
        {/* Left: Mobile Logo & Drawer Trigger + Global Search */}
        <div className="flex flex-1 items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Mở menu điều hướng"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-base tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          {/* Global Search Input */}
          <div className="relative hidden sm:block w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm đề thi Sở Hà Nội, chuyên đề Toán 12, Hóa hữu cơ..."
              aria-label="Tìm kiếm toàn cục"
              className="pl-10 bg-card/90 border-border/80"
            />
          </div>
        </div>

        {/* Right: Gamification stats, Theme toggle, Notifications, User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Grade Selector Pill */}
          <div className="hidden md:flex items-center gap-1.5 rounded-2xl border border-border/80 bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Lớp 12A1
          </div>

          {/* Streak Pill */}
          <div
            title="Chuỗi 12 ngày học liên tiếp"
            className="flex items-center gap-1.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400"
          >
            <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span>12 ngày</span>
          </div>

          {/* XP Pill */}
          <div
            title="Điểm kinh nghiệm tích lũy"
            className="hidden sm:flex items-center gap-1.5 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-extrabold text-indigo-600 dark:text-indigo-400"
          >
            <Zap className="h-4 w-4 fill-indigo-500 text-indigo-500" />
            <span>2,450 XP</span>
          </div>

          {/* Dark / Light Mode Toggle */}
          <ThemeToggle />

          {/* Notification Button */}
          <button
            type="button"
            aria-label="Thông báo"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/80 bg-card text-foreground transition hover:bg-secondary"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-card" />
          </button>

          {/* User Avatar with Real Student Photo */}
          <Link
            href="/login"
            className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card p-1.5 pr-3.5 transition hover:border-primary/40"
          >
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
              alt="Nguyễn Minh Đức"
              className="h-8 w-8 rounded-xl object-cover ring-2 ring-primary/20"
            />
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold leading-none text-foreground">
                Nguyễn Minh Đức
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                THPT Chu Văn An • Hà Nội
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Mobile Full Navigation Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative z-10 flex w-72 flex-col bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="text-lg font-extrabold text-primary">
                {APP_NAME}
              </span>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Đóng menu"
                className="rounded-xl p-1.5 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-1 overflow-y-auto">
              {SIDEBAR_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  <DynamicIcon
                    name={item.iconName}
                    className="h-5 w-5 text-primary"
                  />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
