export type GradeLevel = 10 | 11 | 12;

export type UserRole = "student" | "teacher" | "admin";

export type DocumentType =
  | "theory"
  | "mindmap"
  | "formula"
  | "exercise"
  | "advanced";

export type ExamType =
  | "15m"
  | "45m"
  | "midterm"
  | "final"
  | "thptqg"
  | "gifted";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface SubjectConfig {
  id: string;
  name: string;
  slug: string;
  color: string; // Tailwind bg/text color classes or hex
  badgeBg: string;
  badgeText: string;
  borderHover: string;
  gradient: string;
  iconName: string;
  description: string;
}

export interface NavItem {
  title: string;
  href: string;
  iconName: string;
  badge?: string;
  adminOnly?: boolean;
}
