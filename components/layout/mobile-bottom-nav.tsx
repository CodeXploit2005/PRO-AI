"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_BOTTOM_NAV_ITEMS } from "@/constants";
import { DynamicIcon } from "@/components/shared/subject-icon";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Điều hướng di động"
      className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border/80 bg-card/95 px-2 backdrop-blur-xl lg:hidden"
    >
      {MOBILE_BOTTOM_NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const isCenterAI = item.href === "/ai-tutor";

        if (isCenterAI) {
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.title}
              className="relative -top-4 flex flex-col items-center justify-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-background">
                <DynamicIcon name={item.iconName} className="h-5 w-5" />
              </div>
              <span className="mt-1 text-[10px] font-bold text-primary">
                {item.title}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-1.5 transition-colors",
              isActive
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <DynamicIcon name={item.iconName} className="h-5 w-5" />
            <span className="text-[10px]">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
