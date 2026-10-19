"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Eye,
  Download,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { SUBJECTS, DOCUMENT_TYPES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";

interface UploadedContribution {
  id: string;
  title: string;
  grade: 10 | 11 | 12;
  subjectSlug: string;
  fileName: string;
  fileSize: string;
  mimeType: string;
  dataUrl: string;
  status: "approved" | "pending";
  date: string;
}

export default function ContributePage() {
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState<10 | 11 | 12>(12);
  const [subject, setSubject] = useState(SUBJECTS[0].slug);
  const [docType, setDocType] = useState(DOCUMENT_TYPES[0].value);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Real file state
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: number;
    mimeType: string;
    dataUrl: string;
  } | null>(null);
  const [previewItem, setPreviewItem] = useState<UploadedContribution | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [myUploads, setMyUploads] = useState<UploadedContribution[]>([
    {
      id: "up-1",
      title: "Tóm tắt Sơ đồ tư duy Lịch sử 12 Chủ đề ASEAN",
      grade: 12,
      subjectSlug: "lich-su",
      fileName: "So-do-tu-duy-ASEAN-12.pdf",
      fileSize: "1.8 MB",
      mimeType: "application/pdf",
      dataUrl: "",
      status: "approved",
      date: "2 ngày trước",
    },
  ]);

  const handleRealFileSelect = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Định dạng không hỗ trợ! Chỉ chấp nhận PDF, DOCX, PNG, JPG."
      );
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Dung lượng file vượt quá giới hạn 20MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile({
        name: file.name,
        size: file.size,
        mimeType: file.type,
        dataUrl: reader.result as string,
      });
      if (!title.trim()) {
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
      toast.success(
        `Đã chọn tệp thật: ${file.name} (${formatBytes(file.size)})`
      );
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề tài liệu / đề thi!");
      return;
    }
    if (!selectedFile) {
      toast.error("Vui lòng bấm chọn tệp PDF, DOCX hoặc Ảnh từ máy tính của bạn!");
      return;
    }
    if (!agreedTerms) {
      toast.error("Bạn cần cam kết không vi phạm bản quyền trước khi tải lên!");
      return;
    }

    const newContribution: UploadedContribution = {
      id: `up-${Date.now()}`,
      title,
      grade,
      subjectSlug: subject,
      fileName: selectedFile.name,
      fileSize: formatBytes(selectedFile.size),
      mimeType: selectedFile.mimeType,
      dataUrl: selectedFile.dataUrl,
      status: "pending",
      date: "Vừa xong",
    };

    setMyUploads([newContribution, ...myUploads]);
    setTitle("");
    setSelectedFile(null);
    toast.success(
      "Đã tải tệp thật lên thành công! Bạn có thể bấm Xem/Tải tệp vừa đăng ở cột bên phải."
    );
  };

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,image/png,image/jpeg,image/webp"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleRealFileSelect(f);
          e.target.value = "";
        }}
        className="hidden"
      />

      <div className="rounded-3xl border border-border/70 bg-card p-6 soft-shadow">
        <Badge variant="default" className="mb-2">
          Chia sẻ Tri thức Cộng đồng THPT
        </Badge>
        <h1 className="text-2xl font-extrabold sm:text-3xl">
          Đóng góp Tài liệu & Đề thi Thực tế
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Chọn trực tiếp tệp PDF, DOCX hoặc Ảnh chụp từ máy tính của bạn (tối đa 20MB/file).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Upload Form */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Tải tệp từ máy tính của bạn</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold block mb-1.5">
                  Tiêu đề tài liệu / đề thi *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Đề cương ôn tập Toán 12 Chương 1..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-bold block mb-1.5">
                    Khối lớp
                  </label>
                  <select
                    value={grade}
                    onChange={(e) =>
                      setGrade(Number(e.target.value) as 10 | 11 | 12)
                    }
                    className="h-11 w-full rounded-2xl border border-input bg-background px-3 text-xs font-bold"
                  >
                    <option value={10}>Lớp 10</option>
                    <option value={11}>Lớp 11</option>
                    <option value={12}>Lớp 12</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1.5">
                    Môn học
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-input bg-background px-3 text-xs font-bold"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.id} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1.5">
                    Phân loại
                  </label>
                  <select
                    value={docType}
                    onChange={(e) =>
                      setDocType(e.target.value as typeof docType)
                    }
                    className="h-11 w-full rounded-2xl border border-input bg-background px-3 text-xs font-bold"
                  >
                    {DOCUMENT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Real Drag & Drop + File Picker Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files?.[0];
                  if (f) handleRealFileSelect(f);
                }}
                className="cursor-pointer rounded-3xl border-2 border-dashed border-[#3B41E3]/40 bg-indigo-50/40 dark:bg-indigo-950/20 p-7 text-center transition hover:border-[#3B41E3] hover:bg-indigo-50/80"
              >
                {selectedFile ? (
                  <div className="space-y-3">
                    {selectedFile.mimeType.startsWith("image/") ? (
                      <img
                        src={selectedFile.dataUrl}
                        alt={selectedFile.name}
                        className="mx-auto max-h-44 rounded-2xl object-contain shadow-sm"
                      />
                    ) : (
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B41E3] text-white">
                        <FileText className="h-7 w-7" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-extrabold text-foreground">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs font-semibold text-[#3B41E3] dark:text-indigo-400">
                        Dung lượng thật: {formatBytes(selectedFile.size)} •{" "}
                        {selectedFile.mimeType}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className="inline-flex items-center gap-1 rounded-xl bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-600 hover:bg-rose-500/20"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Chọn tệp khác
                    </button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="mx-auto h-10 w-10 text-[#3B41E3]" />
                    <p className="mt-3 text-sm font-extrabold text-foreground">
                      Bấm vào đây để chọn tệp thật từ máy tính (hoặc kéo thả file)
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Hỗ trợ: PDF, DOCX, PNG, JPG (Tối đa 20MB/file)
                    </p>
                  </>
                )}
              </div>

              {/* Copyright Agreement */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-amber-500"
                  />
                  <span className="leading-relaxed text-foreground/90">
                    Tôi cam kết tài liệu này thuộc quyền chia sẻ hợp pháp của
                    tôi theo{" "}
                    <Link
                      href="/terms"
                      className="font-bold text-primary underline"
                    >
                      Điều khoản Bản quyền
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full gap-2 bg-[#3B41E3] hover:bg-[#3136C8] text-white"
              >
                <UploadCloud className="h-4 w-4" />
                Tải tệp lên hệ thống
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right: Uploaded Files List with Real Preview / Download */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#3B41E3]" />
              Tệp bạn đã tải lên ({myUploads.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myUploads.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border p-4 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      📎 {item.fileName} ({item.fileSize}) • {item.date}
                    </p>
                  </div>
                  {item.status === "approved" ? (
                    <Badge variant="success" className="shrink-0 gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Đã duyệt
                    </Badge>
                  ) : (
                    <Badge variant="accent" className="shrink-0 gap-1">
                      <Clock className="h-3.5 w-3.5" /> Chờ duyệt
                    </Badge>
                  )}
                </div>

                {item.dataUrl && (
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPreviewItem(item)}
                      className="h-8 text-xs gap-1.5"
                    >
                      <Eye className="h-3.5 w-3.5" /> Xem tệp thật
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs gap-1.5"
                    >
                      <a href={item.dataUrl} download={item.fileName}>
                        <Download className="h-3.5 w-3.5" /> Tải về máy
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <div className="rounded-2xl bg-secondary/50 p-4 text-xs text-muted-foreground flex items-start gap-2.5">
              <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Tệp bạn chọn từ máy tính được đọc dữ liệu thực tế (hỗ trợ xem trực tiếp ảnh và PDF ngay trên trình duyệt).
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real File Viewer Modal (Image or PDF iframe) */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="text-base font-extrabold text-foreground">
                  {previewItem.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {previewItem.fileName} ({previewItem.fileSize})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="rounded-xl p-2 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 bg-secondary/30 flex items-center justify-center">
              {previewItem.mimeType.startsWith("image/") ? (
                <img
                  src={previewItem.dataUrl}
                  alt={previewItem.fileName}
                  className="max-h-[70vh] rounded-2xl object-contain shadow"
                />
              ) : previewItem.mimeType === "application/pdf" ? (
                <iframe
                  src={previewItem.dataUrl}
                  title={previewItem.fileName}
                  className="h-[70vh] w-full rounded-2xl border border-border bg-white"
                />
              ) : (
                <div className="text-center p-8">
                  <FileText className="mx-auto h-12 w-12 text-[#3B41E3]" />
                  <p className="mt-3 font-bold">{previewItem.fileName}</p>
                  <Button asChild className="mt-4">
                    <a
                      href={previewItem.dataUrl}
                      download={previewItem.fileName}
                    >
                      Tải tệp về máy
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
