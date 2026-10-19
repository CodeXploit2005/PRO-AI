"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Users,
  FileText,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const [pendingDocs, setPendingDocs] = useState([
    {
      id: "pend-1",
      title: "Đề cương ôn tập Giữa kỳ 1 Toán 12 trường THPT Chu Văn An",
      uploader: "Minh Đức (Học sinh 12A1)",
      subject: "Toán học • Lớp 12",
      size: "3.4 MB (PDF)",
    },
    {
      id: "pend-2",
      title: "Bộ 100 câu trắc nghiệm Đúng/Sai Vật lý 11 Chương Điện trường",
      uploader: "Cô Trần Thu Hà (Giáo viên)",
      subject: "Vật lý • Lớp 11",
      size: "2.1 MB (PDF)",
    },
    {
      id: "pend-3",
      title: "Sơ đồ tư duy Địa lý các vùng kinh tế trọng điểm Lớp 12",
      uploader: "Hoàng Nam (Học sinh 12A2)",
      subject: "Địa lý • Lớp 12",
      size: "4.8 MB (PNG)",
    },
  ]);

  const [reports, setReports] = useState([
    {
      id: "rep-1",
      docTitle: "Bản scan sách tham khảo thương mại Hóa 10",
      reason: "Nghi ngờ vi phạm bản quyền sách xuất bản",
      reporter: "Thầy Phạm Văn Trọng",
    },
  ]);

  const handleModerate = (id: string, action: "approve" | "reject") => {
    setPendingDocs(pendingDocs.filter((d) => d.id !== id));
    if (action === "approve") {
      toast.success("Đã phê duyệt tài liệu hiển thị công khai và cộng +50 XP cho người đăng!");
    } else {
      toast.warning("Đã từ chối tài liệu và gửi thông báo lý do cho người đăng.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/10 via-card to-card p-6 sm:flex-row sm:items-center soft-shadow">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <Badge variant="default" className="mb-1">
              Bảng Điều Khiển Quản Trị Viên (Role: Admin)
            </Badge>
            <h1 className="text-2xl font-extrabold">
              Quản trị Hệ thống & Kiểm duyệt Học liệu
            </h1>
          </div>
        </div>

        <div className="flex gap-3 text-xs font-extrabold">
          <span className="rounded-2xl border border-border bg-card px-4 py-2">
            👥 1,284 Học sinh & Giáo viên
          </span>
          <span className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-600 dark:text-amber-400">
            ⏳ {pendingDocs.length} Tài liệu chờ duyệt
          </span>
        </div>
      </div>

      {/* Pending Documents Approval Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Danh sách Tài liệu / Đề thi chờ Admin phê duyệt ({pendingDocs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingDocs.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              🎉 Tuyệt vời! Toàn bộ tài liệu đóng góp đã được duyệt xong.
            </p>
          ) : (
            pendingDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border p-4"
              >
                <div>
                  <span className="text-xs font-extrabold text-primary">
                    {doc.subject} • {doc.size}
                  </span>
                  <h3 className="text-sm font-extrabold text-foreground mt-0.5">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Người tải lên: {doc.uploader}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleModerate(doc.id, "approve")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Duyệt hiển thị
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleModerate(doc.id, "reject")}
                    className="gap-1.5"
                  >
                    <XCircle className="h-4 w-4" />
                    Từ chối
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Copyright Reports & User Management */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-500">
              <AlertTriangle className="h-5 w-5" />
              Báo cáo Vi phạm Bản quyền ({reports.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Không có báo cáo vi phạm nào tồn đọng.
              </p>
            ) : (
              reports.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {r.docTitle}
                    </p>
                    <p className="text-xs text-rose-500 font-semibold">
                      Lý do: {r.reason}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Báo cáo bởi: {r.reporter}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setReports([]);
                      toast.success("Đã gỡ bỏ tài liệu vi phạm khỏi hệ thống!");
                    }}
                  >
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                    Xóa ngay
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Quản lý Người dùng & Phân quyền
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs">
            {[
              { name: "Minh Đức", email: "minhduc12a1@byethpt.vn", role: "student" },
              { name: "Cô Trần Thu Hà", email: "thuha.ly@byethpt.vn", role: "teacher" },
              { name: "Admin Hệ Thống", email: "admin@byethpt.vn", role: "admin" },
            ].map((u) => (
              <div
                key={u.email}
                className="flex items-center justify-between rounded-2xl border border-border px-4 py-3"
              >
                <div>
                  <p className="font-bold text-sm text-foreground">{u.name}</p>
                  <p className="text-muted-foreground">{u.email}</p>
                </div>
                <Badge variant="outline" className="uppercase">
                  {u.role}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
