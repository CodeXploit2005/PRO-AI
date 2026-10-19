import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopHeader } from "@/components/layout/top-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-h-screen flex-col lg:pl-72">
        <TopHeader />
        <main className="flex-1 px-4 py-6 pb-24 sm:px-8 lg:pb-10">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
