import { SubjectConfig, NavItem, DocumentType, ExamType } from "@/types";

export const APP_NAME = "BYE THPT";
export const APP_DESCRIPTION =
  "Nền tảng học tập & luyện thi THPT trực tuyến thông minh tích hợp Gia sư AI Gemini dành cho học sinh lớp 10, 11, 12.";

export const GRADES: { value: 10 | 11 | 12; label: string; desc: string }[] = [
  { value: 10, label: "Lớp 10", desc: "Nền tảng vững chắc chương trình GDPT 2018" },
  { value: 11, label: "Lớp 11", desc: "Bứt phá kiến thức trọng tâm & nâng cao" },
  { value: 12, label: "Lớp 12", desc: "Tổng ôn toàn diện & Luyện đề tốt nghiệp THPT" },
];

export const SUBJECTS: SubjectConfig[] = [
  {
    id: "toan",
    name: "Toán học",
    slug: "toan-hoc",
    color: "#2563EB",
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    badgeText: "text-blue-600 dark:text-blue-400",
    borderHover: "hover:border-blue-500/50",
    gradient: "from-blue-600 to-indigo-600",
    iconName: "Sigma",
    description: "Đại số, Giải tích, Hình học & Thống kê xác suất",
  },
  {
    id: "vat-ly",
    name: "Vật lý",
    slug: "vat-ly",
    color: "#7C3AED",
    badgeBg: "bg-violet-500/10 dark:bg-violet-500/20",
    badgeText: "text-violet-600 dark:text-violet-400",
    borderHover: "hover:border-violet-500/50",
    gradient: "from-violet-600 to-purple-600",
    iconName: "Atom",
    description: "Cơ học, Nhiệt học, Điện từ & Vật lý lượng tử",
  },
  {
    id: "hoa-hoc",
    name: "Hóa học",
    slug: "hoa-hoc",
    color: "#10B981",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    borderHover: "hover:border-emerald-500/50",
    gradient: "from-emerald-500 to-teal-600",
    iconName: "FlaskConical",
    description: "Hóa đại cương, Vô cơ & Hữu cơ danh pháp mới",
  },
  {
    id: "sinh-hoc",
    name: "Sinh học",
    slug: "sinh-hoc",
    color: "#84CC16",
    badgeBg: "bg-lime-500/10 dark:bg-lime-500/20",
    badgeText: "text-lime-600 dark:text-lime-400",
    borderHover: "hover:border-lime-500/50",
    gradient: "from-lime-500 to-green-600",
    iconName: "Dna",
    description: "Tế bào, Di truyền học, Tiến hóa & Sinh thái",
  },
  {
    id: "ngu-van",
    name: "Ngữ văn",
    slug: "ngu-van",
    color: "#F43F5E",
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/20",
    badgeText: "text-rose-600 dark:text-rose-400",
    borderHover: "hover:border-rose-500/50",
    gradient: "from-rose-500 to-orange-500",
    iconName: "Feather",
    description: "Đọc hiểu văn bản, Nghị luận xã hội & Nghị luận văn học",
  },
  {
    id: "tieng-anh",
    name: "Tiếng Anh",
    slug: "tieng-anh",
    color: "#0EA5E9",
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/20",
    badgeText: "text-sky-600 dark:text-sky-400",
    borderHover: "hover:border-sky-500/50",
    gradient: "from-sky-500 to-blue-600",
    iconName: "Globe",
    description: "Ngữ pháp, Từ vựng Global Success & Luyện đề chuẩn ফর্ম mới",
  },
  {
    id: "lich-su",
    name: "Lịch sử",
    slug: "lich-su",
    color: "#D97706",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeText: "text-amber-600 dark:text-amber-400",
    borderHover: "hover:border-amber-500/50",
    gradient: "from-amber-500 to-orange-600",
    iconName: "Landmark",
    description: "Lịch sử Việt Nam & Thế giới hiện đại",
  },
  {
    id: "dia-ly",
    name: "Địa lý",
    slug: "dia-ly",
    color: "#14B8A6",
    badgeBg: "bg-teal-500/10 dark:bg-teal-500/20",
    badgeText: "text-teal-600 dark:text-teal-400",
    borderHover: "hover:border-teal-500/50",
    gradient: "from-teal-500 to-cyan-600",
    iconName: "Compass",
    description: "Địa lý tự nhiên, Kinh tế xã hội & Kỹ năng biểu đồ",
  },
  {
    id: "tin-hoc",
    name: "Tin học",
    slug: "tin-hoc",
    color: "#6366F1",
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    borderHover: "hover:border-indigo-500/50",
    gradient: "from-indigo-500 to-blue-700",
    iconName: "Cpu",
    description: "Lập trình Python, Cấu trúc dữ liệu, Cơ sở dữ liệu & Mạng",
  },
  {
    id: "ktpl",
    name: "KTPL / GDCD",
    slug: "ktpl-gdcd",
    color: "#EC4899",
    badgeBg: "bg-pink-500/10 dark:bg-pink-500/20",
    badgeText: "text-pink-600 dark:text-pink-400",
    borderHover: "hover:border-pink-500/50",
    gradient: "from-pink-500 to-rose-600",
    iconName: "Scale",
    description: "Giáo dục Kinh tế và Pháp luật chương trình mới",
  },
];

export const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: "theory", label: "Lý thuyết trọng tâm" },
  { value: "mindmap", label: "Sơ đồ tư duy" },
  { value: "formula", label: "Công thức tóm tắt" },
  { value: "exercise", label: "Bài tập có lời giải" },
  { value: "advanced", label: "Chuyên đề nâng cao" },
];

export const EXAM_TYPES: { value: ExamType; label: string }[] = [
  { value: "15m", label: "Kiểm tra 15 phút" },
  { value: "45m", label: "Kiểm tra 1 tiết (45p)" },
  { value: "midterm", label: "Thi Giữa kỳ" },
  { value: "final", label: "Thi Cuối kỳ" },
  { value: "thptqg", label: "Thi thử Tốt nghiệp THPT" },
  { value: "gifted", label: "Đề Chuyên / Học sinh giỏi" },
];

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { title: "Trang chủ", href: "/dashboard", iconName: "Home" },
  { title: "Tài liệu học tập", href: "/documents", iconName: "BookOpen" },
  { title: "Kho đề thi", href: "/exams", iconName: "FileCheck2", badge: "Hot" },
  { title: "Gia sư AI Gemini", href: "/ai-tutor", iconName: "Sparkles", badge: "AI" },
  { title: "Học nhóm", href: "/groups", iconName: "Users" },
  { title: "Flashcard & Ghi nhớ", href: "/flashcards", iconName: "Layers" },
  { title: "Lịch ôn tập & Mục tiêu", href: "/study-plan", iconName: "CalendarCheck" },
  { title: "Thành tích & BXH", href: "/achievements", iconName: "Trophy" },
  { title: "Đóng góp tài liệu", href: "/contribute", iconName: "UploadCloud" },
  { title: "Quản trị (Admin)", href: "/admin", iconName: "ShieldCheck", adminOnly: true },
];

export const MOBILE_BOTTOM_NAV_ITEMS: NavItem[] = [
  { title: "Trang chủ", href: "/dashboard", iconName: "Home" },
  { title: "Tài liệu", href: "/documents", iconName: "BookOpen" },
  { title: "Gia sư AI", href: "/ai-tutor", iconName: "Sparkles" },
  { title: "Đề thi", href: "/exams", iconName: "FileCheck2" },
  { title: "Học nhóm", href: "/groups", iconName: "Users" },
];

export function getSubjectBySlug(slugOrId: string): SubjectConfig {
  return (
    SUBJECTS.find((s) => s.slug === slugOrId || s.id === slugOrId) || SUBJECTS[0]
  );
}
