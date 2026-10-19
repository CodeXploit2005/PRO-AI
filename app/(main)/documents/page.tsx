"use client";

import React, { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  Search,
  Filter,
  Eye,
  Bookmark,
  Star,
  Flag,
  X,
  FileText,
  ExternalLink,
  BookMarked,
  Printer,
} from "lucide-react";
import { toast } from "sonner";
import { SUBJECTS, DOCUMENT_TYPES } from "@/constants";
import { REAL_DOCUMENTS, RealDocumentResource } from "@/constants/real-resources";
import { DocumentType, GradeLevel } from "@/types";
import { DynamicIcon } from "@/components/shared/subject-icon";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

export default function DocumentsPage() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<DocumentType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>(["doc-toan12-kntt-ch1"]);
  const [previewDoc, setPreviewDoc] = useState<RealDocumentResource | null>(
    null
  );

  const filteredDocs = useMemo(() => {
    return REAL_DOCUMENTS.filter((doc) => {
      if (selectedGrade !== "all" && doc.grade !== selectedGrade) return false;
      if (selectedSubject !== "all" && doc.subjectSlug !== selectedSubject)
        return false;
      if (selectedType !== "all" && doc.type !== selectedType) return false;
      if (
        searchQuery.trim() &&
        !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !doc.chapter.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !doc.sourceName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [selectedGrade, selectedSubject, selectedType, searchQuery]);

  const toggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((i) => i !== id));
      toast.info("Đã bỏ lưu khỏi danh sách yêu thích");
    } else {
      setSavedIds([...savedIds, id]);
      toast.success("Đã lưu tài liệu vào mục Yêu thích!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Clean White Header Card matching AI Tutor aesthetic */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/70 bg-card p-6 sm:flex-row sm:items-center soft-shadow">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">
              Kho Tài Liệu Học Tập Thực Tế
            </h1>
            <span className="rounded-full bg-indigo-50 dark:bg-indigo-500/15 px-3 py-0.5 text-xs font-bold text-[#3B41E3] dark:text-indigo-300 border border-indigo-200/60">
              GDPT 2018
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Tổng hợp chuyên đề, công thức & bài tập thực tế kèm đường dẫn tham khảo trực tiếp từ{" "}
            <strong className="text-foreground">TOANMATH, VietJack, ThuVienHocLieu, LoiGiaiHay</strong>.
          </p>
        </div>

        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm chuyên đề, môn học, nguồn..."
            className="pl-10 bg-[#F8FAFC] dark:bg-secondary/60"
          />
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(["all", 10, 11, 12] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setSelectedGrade(g)}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
                selectedGrade === g
                  ? "bg-[#3B41E3] text-white shadow-sm"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {g === "all" ? "Tất cả khối" : `Lớp ${g}`}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <button
            type="button"
            onClick={() => setSelectedType("all")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              selectedType === "all"
                ? "bg-amber-500 text-white"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Tất cả loại
          </button>
          {DOCUMENT_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setSelectedType(t.value)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                selectedType === t.value
                  ? "bg-amber-500 text-white"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 10 Subject Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setSelectedSubject("all")}
          className={`shrink-0 rounded-2xl border px-4 py-2 text-xs font-bold transition ${
            selectedSubject === "all"
              ? "border-[#3B41E3] bg-indigo-50 text-[#3B41E3] dark:bg-indigo-500/20 dark:text-indigo-300"
              : "border-border bg-card text-muted-foreground hover:bg-secondary"
          }`}
        >
          Tất cả 10 môn
        </button>
        {SUBJECTS.map((sub) => {
          const active = selectedSubject === sub.slug;
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => setSelectedSubject(sub.slug)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-bold transition ${
                active
                  ? `${sub.badgeBg} ${sub.badgeText} border-current`
                  : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <DynamicIcon name={sub.iconName} className="h-4 w-4" />
              {sub.name}
            </button>
          );
        })}
      </div>

      {/* Clean White & Pastel Document Cards (No fake stock photos!) */}
      {filteredDocs.length === 0 ? (
        <EmptyState
          title="Không tìm thấy tài liệu phù hợp"
          description="Hãy thử đổi bộ lọc Lớp học, Môn học hoặc từ khóa tìm kiếm khác nhé."
          actionLabel="Xóa bộ lọc"
          onActionClick={() => {
            setSelectedGrade("all");
            setSelectedSubject("all");
            setSelectedType("all");
            setSearchQuery("");
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => {
            const sub =
              SUBJECTS.find((s) => s.slug === doc.subjectSlug) || SUBJECTS[0];
            const typeLabel =
              DOCUMENT_TYPES.find((t) => t.value === doc.type)?.label ||
              "Tài liệu";
            const isSaved = savedIds.includes(doc.id);

            return (
              <div
                key={doc.id}
                className="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 soft-shadow transition-all duration-200 hover:-translate-y-1 hover:border-[#3B41E3]/40"
              >
                <div>
                  {/* Top Row: Pastel Subject Icon + Subject/Grade + Bookmark */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${sub.badgeBg} ${sub.badgeText}`}
                      >
                        <DynamicIcon name={sub.iconName} className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-xs font-extrabold ${sub.badgeText}`}>
                            {sub.name}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <Badge variant="secondary" className="text-[11px]">
                            Lớp {doc.grade}
                          </Badge>
                          <Badge variant="outline" className="text-[11px]">
                            {typeLabel}
                          </Badge>
                        </div>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                          <BookMarked className="h-3 w-3 text-primary" />
                          Bộ sách: <strong>{doc.bookSeries}</strong>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSave(doc.id)}
                      aria-label="Lưu tài liệu yêu thích"
                      className={`rounded-xl p-2 transition ${
                        isSaved
                          ? "bg-amber-500/15 text-amber-500"
                          : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${isSaved ? "fill-amber-500" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Chapter & Title */}
                  <div className="mt-4">
                    <p className="text-xs font-bold text-[#3B41E3] dark:text-indigo-400">
                      {doc.chapter}
                    </p>
                    <h3
                      onClick={() => setPreviewDoc(doc)}
                      className="mt-1 cursor-pointer line-clamp-2 text-base font-extrabold leading-snug text-foreground group-hover:text-[#3B41E3] dark:group-hover:text-indigo-400 transition-colors"
                    >
                      {doc.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  {/* Verified Source Reference Box */}
                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-border/70 bg-[#F8FAFC] dark:bg-secondary/40 px-3.5 py-2.5 text-xs">
                    <div className="min-w-0">
                      <p className="text-[11px] text-muted-foreground truncate">
                        Tác giả: <strong className="text-foreground">{doc.author}</strong>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Nguồn:{" "}
                        <a
                          href={doc.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#3B41E3] dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                        >
                          {doc.sourceName}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {doc.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground px-1">
                    <span>
                      {doc.pages} trang • {doc.fileSize}
                    </span>
                    <span>{formatNumber(doc.downloads)} lượt tải</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center gap-2.5 border-t border-border/60 pt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPreviewDoc(doc)}
                    className="flex-1 gap-1.5 font-bold"
                  >
                    <Eye className="h-4 w-4" />
                    Đọc chi tiết
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 gap-1.5 bg-[#3B41E3] hover:bg-[#3136C8] text-white font-bold"
                  >
                    <a
                      href={doc.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Mở link gốc
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Real Study Sheet Reader Modal with KaTeX Math Rendering */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#3B41E3] dark:text-indigo-400">
                    {previewDoc.chapter} • Lớp {previewDoc.grade}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {previewDoc.bookSeries}
                  </Badge>
                </div>
                <h3 className="mt-0.5 text-base font-extrabold text-foreground line-clamp-1">
                  {previewDoc.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="rounded-xl p-2 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Real Rendered Study Sheet */}
              <div className="rounded-2xl border border-border bg-[#F8FAFC] dark:bg-slate-900/70 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <FileText className="h-4 w-4 text-[#3B41E3]" />
                    <span>
                      Bản đọc trực tiếp • Nguồn tham khảo:{" "}
                      <a
                        href={previewDoc.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3B41E3] underline"
                      >
                        {previewDoc.sourceName}
                      </a>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 rounded-lg bg-card border border-border px-2.5 py-1 text-xs font-semibold hover:bg-secondary"
                  >
                    <Printer className="h-3.5 w-3.5" /> In phiếu học tập
                  </button>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none space-y-3 [&>h3]:text-base [&>h3]:font-extrabold [&>h4]:text-sm [&>h4]:font-bold [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {previewDoc.fullContentMarkdown}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground px-1">
                <span>
                  Biên soạn: <strong>{previewDoc.author}</strong> • Nguồn:{" "}
                  <strong>{previewDoc.sourceName}</strong>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    toast.warning(
                      "Đã gửi báo cáo bản quyền/nội dung cho Admin kiểm tra."
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-rose-500 font-semibold hover:underline"
                >
                  <Flag className="h-3.5 w-3.5" />
                  Báo cáo vi phạm
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4 bg-secondary/30">
              <Button variant="outline" onClick={() => setPreviewDoc(null)}>
                Đóng cửa sổ
              </Button>
              <Button
                asChild
                className="bg-[#3B41E3] hover:bg-[#3136C8] text-white"
              >
                <a
                  href={previewDoc.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Truy cập nguồn gốc trên {previewDoc.sourceName}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
