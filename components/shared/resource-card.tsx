import React from "react";
import Link from "next/link";
import {
  Download,
  Eye,
  Star,
  Bookmark,
  FileText,
  Play,
  ExternalLink,
  BookMarked,
} from "lucide-react";
import { getSubjectBySlug } from "@/constants";
import { DynamicIcon } from "@/components/shared/subject-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";

export interface ResourceCardProps {
  id: string;
  title: string;
  subjectSlug: string;
  grade: 10 | 11 | 12;
  year?: number;
  categoryLabel: string;
  downloads: number;
  views?: number;
  rating?: number;
  href: string;
  onlineExamHref?: string;
  sourceName?: string;
  sourceUrl?: string;
  bookSeries?: string;
}

export function ResourceCard({
  title,
  subjectSlug,
  grade,
  year = 2025,
  categoryLabel,
  downloads,
  rating = 4.9,
  href,
  onlineExamHref,
  sourceName = "TOANMATH.com",
  sourceUrl = "https://toanmath.com",
  bookSeries = "Kết nối tri thức",
}: ResourceCardProps) {
  const subject = getSubjectBySlug(subjectSlug);

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-5 soft-shadow transition-all duration-200 hover:-translate-y-1 hover:border-primary/40">
      <div>
        {/* Top Row: Subject Pastel Icon Box + Badges + Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${subject.badgeBg} ${subject.badgeText}`}
            >
              <DynamicIcon name={subject.iconName} className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`text-xs font-extrabold ${subject.badgeText}`}>
                  {subject.name}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-bold text-foreground">
                  Lớp {grade}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground flex items-center gap-1">
                <BookMarked className="h-3 w-3" />
                {bookSeries} ({year})
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Lưu tài liệu yêu thích"
            className="rounded-xl p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-amber-500"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        {/* Title */}
        <Link href={href} className="mt-4 block">
          <h4 className="line-clamp-2 text-[15px] font-extrabold leading-snug text-foreground transition-colors group-hover:text-primary">
            {title}
          </h4>
        </Link>

        {/* Verified Source Reference Pill */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2 text-xs">
          <span className="text-muted-foreground">Nguồn tham khảo:</span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
          >
            <span>{sourceName}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Stats Row */}
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-medium text-foreground/80">
            <FileText className="h-3.5 w-3.5 text-primary" />
            {categoryLabel}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              {formatNumber(downloads)}
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3.5">
        <Button asChild variant="secondary" size="sm" className="flex-1 gap-1.5">
          <Link href={href}>
            <Eye className="h-3.5 w-3.5" />
            Đọc tài liệu
          </Link>
        </Button>
        {onlineExamHref ? (
          <Button asChild variant="default" size="sm" className="flex-1 gap-1.5">
            <Link href={onlineExamHref}>
              <Play className="h-3.5 w-3.5 fill-current" />
              Làm online
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm" className="flex-1 gap-1.5">
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Nguồn gốc
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
