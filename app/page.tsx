"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  FileCheck2,
  Users,
  ArrowRight,
  CheckCircle2,
  Flame,
  ShieldCheck,
  Star,
  Play,
  Quote,
  Award,
} from "lucide-react";
import { APP_NAME, SUBJECTS } from "@/constants";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { DynamicIcon } from "@/components/shared/subject-icon";
import { ResourceCard, ResourceCardProps } from "@/components/shared/resource-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FEATURED_RESOURCES: ResourceCardProps[] = [
  {
    id: "landing-1",
    title: "Sơ đồ tư duy Khảo sát & Vẽ đồ thị hàm số chuẩn cấu trúc mới 2026",
    subjectSlug: "toan-hoc",
    grade: 12,
    year: 2026,
    categoryLabel: "Sơ đồ tư duy",
    downloads: 4820,
    rating: 4.9,
    href: "/documents",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    authorName: "Thầy Nguyễn Quốc Chí",
    authorAvatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "landing-2",
    title: "Đề thi thử Tốt nghiệp THPT 2026 môn Vật Lý - Chuyên Hà Nội Amsterdam",
    subjectSlug: "vat-ly",
    grade: 12,
    year: 2026,
    categoryLabel: "Đề thi thử",
    downloads: 3590,
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
    id: "landing-3",
    title: "Tổng hợp 200 công thức giải nhanh Hóa Hữu Cơ & Danh pháp IUPAC",
    subjectSlug: "hoa-hoc",
    grade: 11,
    year: 2026,
    categoryLabel: "Công thức tóm tắt",
    downloads: 5120,
    rating: 4.9,
    href: "/documents",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    authorName: "Thầy Phạm Văn Trọng",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "landing-4",
    title: "Bộ đề đọc hiểu & Nghị luận xã hội Ngữ Văn 12 ngoài sách giáo khoa",
    subjectSlug: "ngu-van",
    grade: 12,
    year: 2026,
    categoryLabel: "Chuyên đề Văn",
    downloads: 2980,
    rating: 4.8,
    href: "/documents",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    authorName: "Cô Lê Minh Phương",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
];

const GRADE_CARDS = [
  {
    grade: 10,
    title: "Khối Lớp 10",
    subtitle: "Làm quen chương trình THPT mới",
    desc: "Xây gốc vững chắc Toán, Lý, Hóa, Anh ngay từ học kỳ đầu tiên với hệ thống bài giảng và sơ đồ tư duy trực quan.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    students: "14,200+ học sinh",
  },
  {
    grade: 11,
    title: "Khối Lớp 11",
    subtitle: "Bứt phá chuyên đề vận dụng cao",
    desc: "Nắm chắc Đạo hàm, Tổ hợp xác suất, Hóa hữu cơ và Tiếng Anh Global Success để tạo đà bứt tốc lên lớp 12.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    students: "18,500+ học sinh",
  },
  {
    grade: 12,
    title: "Khối Lớp 12 & Luyện Thi THPT",
    subtitle: "Thực chiến phòng thi 9+ Đại học",
    desc: "Tổng ôn toàn diện, luyện đề trường chuyên Sở GD&ĐT có bấm giờ và chấm bài tự động kèm Gia sư AI giải chi tiết.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    students: "26,800+ sĩ tử 2k9",
  },
];

const TESTIMONIALS = [
  {
    name: "Nguyễn Hoàng Bảo",
    school: "Lớp 12 Toán 1 • THPT Chuyên KHTN Hà Nội",
    score: "28.75 điểm Khối A00",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    quote:
      "Mình thích nhất chế độ Gợi mở của Gia sư AI trên BYE THPT. Khi gặp câu hàm hợp hay xác suất khó, AI không giải hộ luôn mà gợi ý từng bước giúp mình nhớ bản chất cực lâu.",
  },
  {
    name: "Trần Ngọc Khánh Linh",
    school: "Lớp 12D1 • THPT Chuyên Lê Hồng Phong TP.HCM",
    score: "9.25 Văn & 9.6 Tiếng Anh",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    quote:
      "Tính năng chấm bài Nghị luận xã hội và tạo Flashcard từ vựng tự động thực sự cứu cánh cho mình. Giao diện tối (Dark mode) học ban đêm rất dịu mắt!",
  },
  {
    name: "Lê Quốc Khánh",
    school: "Lớp 11A2 • THPT Phan Châu Trinh Đà Nẵng",
    score: "Top 3 BXH Học Nhóm",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote:
      "Nhóm 5 đứa bạn cùng lớp mình lập phòng học mỗi tối trên này. Vừa làm đề chung có đồng hồ đếm ngược, vừa thi đố vui giữ chuỗi Streak 20 ngày liên tục.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-amber-500 text-white shadow-lg shadow-indigo-500/25">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-foreground">
                {APP_NAME}
              </span>
              <span className="ml-2 hidden sm:inline-block rounded-lg bg-amber-500/15 px-2 py-0.5 text-[10px] font-extrabold text-amber-600 dark:text-amber-400">
                GDPT 2018
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-muted-foreground">
            <Link href="#grades" className="hover:text-primary transition-colors">
              Lộ trình 10-11-12
            </Link>
            <Link href="#subjects" className="hover:text-primary transition-colors">
              10 Môn học
            </Link>
            <Link href="/documents" className="hover:text-primary transition-colors">
              Tài liệu
            </Link>
            <Link href="/exams" className="hover:text-primary transition-colors">
              Phòng luyện đề
            </Link>
            <Link href="/ai-tutor" className="hover:text-primary transition-colors">
              Gia sư Gemini
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Đăng nhập</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">
                Vào góc học tập
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Real Photography Collage */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-24">
        <div className="pointer-events-none absolute -top-36 left-1/2 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-amber-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Hero Left */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-extrabold text-amber-700 dark:text-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Đồng hành cùng học sinh THPT Việt Nam chinh phục kỳ thi 2026</span>
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[54px] leading-[1.15]">
                Học thông minh hơn,{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-amber-500 bg-clip-text text-transparent">
                  tự tin bứt phá 9+
                </span>{" "}
                mỗi ngày.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Không còn cảnh học vẹt hay lạc giữa hàng trăm file đề rời rạc.{" "}
                <strong className="text-foreground">{APP_NAME}</strong> kết hợp kho đề thi các trường chuyên, phòng học nhóm cùng bạn bè và{" "}
                <strong className="text-foreground">Gia sư AI Gemini 2.5</strong> hướng dẫn từng bước.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Button asChild size="lg" className="w-full sm:w-auto text-base px-7">
                  <Link href="/dashboard">
                    Bắt đầu học miễn phí
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base gap-2"
                >
                  <Link href="/exams">
                    <Play className="h-4 w-4 fill-primary text-primary" />
                    Thi thử Online ngay
                  </Link>
                </Button>
              </div>

              {/* Real Student Avatar Stack Social Proof */}
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
                    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Học sinh THPT"
                      className="h-10 w-10 rounded-full border-2 border-background object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div className="text-xs sm:text-left text-center">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="ml-1 text-foreground font-extrabold">4.9/5</span>
                  </div>
                  <p className="text-muted-foreground mt-0.5">
                    Từ hơn <strong className="text-foreground">58,000+ học sinh</strong> tại 63 tỉnh thành
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Hero Right: Authentic Student Photography + Floating Live Widgets */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Hero Photo */}
                <div className="relative overflow-hidden rounded-3xl border-4 border-card shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                    alt="Nhóm học sinh THPT cùng ôn luyện"
                    className="h-[420px] sm:h-[460px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  {/* Bottom Caption inside photo */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/90 px-3 py-1 text-xs font-extrabold text-white backdrop-blur-md">
                        ● 1,420 học sinh đang tự học tối nay
                      </span>
                      <p className="mt-2 text-lg font-extrabold">
                        Phòng Học Nhóm & Luyện Đề Trực Tuyến
                      </p>
                      <p className="text-xs text-slate-200">
                        Giải đề Sở Hà Nội, Chuyên KHTN, Chuyên Lê Hồng Phong...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 1: Top-Left Streak & Mentor */}
                <div className="hidden sm:flex items-center gap-3.5 absolute -left-6 top-6 rounded-2xl border border-border/80 bg-card/95 p-3.5 shadow-xl backdrop-blur-xl">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Học sinh tiêu biểu"
                    className="h-11 w-11 rounded-xl object-cover ring-2 ring-amber-400"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-foreground">
                        Khánh Linh (12A1)
                      </span>
                      <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-600">
                        <Flame className="h-3 w-3 fill-amber-500 text-amber-500" /> 18 ngày
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                      Vừa đạt 9.6/10 Đề Toán Sở Hà Nội
                    </p>
                  </div>
                </div>

                {/* Floating Card 2: Bottom-Right AI Tutor Snippet */}
                <div className="hidden sm:block absolute -bottom-6 -right-4 max-w-xs rounded-2xl border border-border/80 bg-card/95 p-4 shadow-xl backdrop-blur-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-extrabold">
                      AI
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-foreground">
                        Gia sư Gemini 2.5 Flash
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Đã kết nối API trực tiếp • Phản hồi tức thì
                      </p>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                    &ldquo;Bước 1: Tập xác định D = ℝ. Bước 2: Đạo hàm y&apos; = 3x² - 6x = 0 ⇔ x = 0 hoặc x = 2...&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 Grade Pillars with Real Campus Photos */}
      <section id="grades" className="py-16 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="default" className="mb-2">
                Lộ trình Cá nhân hóa
              </Badge>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Chọn khối lớp của bạn để bắt đầu
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Toàn bộ tài liệu và ngân hàng câu hỏi được biên soạn bám sát 3 bộ sách Kết nối tri thức, Chân trời sáng tạo và Cánh diều.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GRADE_CARDS.map((card) => (
              <Link
                key={card.grade}
                href={`/documents?grade=${card.grade}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card soft-shadow transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="rounded-xl bg-primary px-3 py-1 text-xs font-extrabold">
                      {card.title}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      {card.students}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                      {card.subtitle}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-extrabold text-primary">
                    <span>Vào kho tài liệu Lớp {card.grade}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Documents & Exams with Cover Photos */}
      <section className="py-16 bg-secondary/30 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <Badge variant="accent" className="mb-2">
                Học liệu Nổi bật Tuần này
              </Badge>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Đề thi & Tài liệu được tải nhiều nhất
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/documents">Xem tất cả 5,000+ tài liệu →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_RESOURCES.map((res) => (
              <ResourceCard key={res.id} {...res} />
            ))}
          </div>
        </div>
      </section>

      {/* 10 Subjects Section */}
      <section id="subjects" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="default" className="mb-2">
              Đầy đủ 10 Môn THPT
            </Badge>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Mỗi môn học một không gian trực quan riêng
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Nhận diện nhanh bằng màu sắc đặc trưng, tổng hợp từ lý thuyết cơ bản đến đề học sinh giỏi.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SUBJECTS.map((sub) => (
              <Link
                key={sub.id}
                href={`/documents?subject=${sub.slug}`}
                className={`group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 soft-shadow transition-all duration-300 hover:-translate-y-1 ${sub.borderHover}`}
              >
                <div>
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${sub.badgeBg} ${sub.badgeText} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <DynamicIcon name={sub.iconName} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-foreground">
                    {sub.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {sub.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-bold text-primary">
                  <span>Xem chuyên đề</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Real Student Stories / Testimonials */}
      <section className="py-16 bg-secondary/30 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="success" className="mb-2">
              Góc Chia Sẻ Từ Học Sinh
            </Badge>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Các bạn học sinh THPT nói gì về {APP_NAME}?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 soft-shadow"
              >
                <div>
                  <Quote className="h-8 w-8 text-primary/25 mb-3" />
                  <p className="text-sm leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3.5 border-t border-border/60 pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-2xl object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <p className="text-sm font-extrabold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.school}</p>
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-600 dark:text-amber-400">
                      <Award className="h-3.5 w-3.5" /> {t.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/80 bg-card py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span>{APP_NAME} © 2026 — Nền tảng học tập THPT Việt Nam</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/terms" className="hover:text-primary transition-colors">
              Điều khoản & Bản quyền
            </Link>
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Góc học tập
            </Link>
            <Link href="/login" className="hover:text-primary transition-colors">
              Đăng nhập
            </Link>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Đã kiểm duyệt nội dung GDPT 2018
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
