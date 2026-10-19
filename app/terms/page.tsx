import React from "react";
import Link from "next/link";
import { ShieldAlert, Scale, CheckCircle2, Flag, ArrowLeft } from "lucide-react";
import { APP_NAME } from "@/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại Trang chủ
        </Link>
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Scale className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            Điều khoản Sử dụng & Chính sách Bản quyền
          </h1>
          <p className="text-sm text-muted-foreground">
            Cập nhật lần cuối: Tháng 10/2026 • Áp dụng cho mọi thành viên {APP_NAME}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <Card className="border-amber-500/40 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="h-5 w-5" />
              Cam kết Tuân thủ Bản quyền Học liệu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-foreground/90">
            <p>
              Người dùng khi đóng góp tài liệu hoặc đề thi lên nền tảng{" "}
              <strong>{APP_NAME}</strong> phải đảm bảo chỉ đăng tải các tài liệu
              do chính mình biên soạn, tổng hợp hoặc có quyền chia sẻ hợp pháp vì
              mục đích học tập phi thương mại.
            </p>
            <p className="font-semibold text-destructive">
              Nghiêm cấm sao chép, scan nguyên bản Sách Giáo Khoa (SGK), sách
              tham khảo thương mại có bản quyền khi chưa được sự đồng ý của tác
              giả hoặc Nhà xuất bản.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>1. Quy trình Kiểm duyệt & Báo cáo Vi phạm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
              <p>
                Mọi tài liệu do Học sinh / Giáo viên tải lên đều ở trạng thái{" "}
                <strong>Chờ duyệt (Pending)</strong> và chỉ hiển thị công khai sau
                khi Quản trị viên (Admin) kiểm tra nội dung.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <Flag className="h-4 w-4 text-rose-500 shrink-0 mt-1" />
              <p>
                Trên mỗi trang xem tài liệu và đề thi đều tích hợp nút{" "}
                <strong>&ldquo;Báo cáo vi phạm&rdquo;</strong>. Nếu phát hiện nội
                dung vi phạm bản quyền hoặc sai lệch kiến thức, ban quản trị sẽ
                gỡ bỏ trong vòng 24 giờ.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
