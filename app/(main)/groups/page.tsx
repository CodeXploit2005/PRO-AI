"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  KeyRound,
  Send,
  Paperclip,
  CheckSquare,
  Calendar,
  Swords,
  Trophy,
  Trash2,
  Crown,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface GroupMessageItem {
  id: string;
  sender: string;
  avatarUrl: string;
  role: "leader" | "member";
  text: string;
  attachment?: string;
  time: string;
}

interface GroupTaskItem {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  done: boolean;
}

const GROUP_MEMBERS = [
  {
    name: "Minh Đức (Bạn)",
    role: "Trưởng nhóm",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    xp: "2,450 XP",
    streak: "12 ngày",
  },
  {
    name: "Trần Ngọc Khánh Linh",
    role: "Thành viên",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    xp: "2,310 XP",
    streak: "10 ngày",
  },
  {
    name: "Lê Hoàng Nam",
    role: "Thành viên",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    xp: "1,980 XP",
    streak: "8 ngày",
  },
  {
    name: "Phạm Tuấn Kiệt",
    role: "Thành viên",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    xp: "1,640 XP",
    streak: "5 ngày",
  },
];

export default function StudyGroupsPage() {
  const [activeTab, setActiveTab] = useState<
    "chat" | "tasks" | "quiz" | "leaderboard"
  >("chat");
  const [inviteCodeInput, setInviteCodeInput] = useState("");
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState<GroupMessageItem[]>([
    {
      id: "gm-1",
      sender: "Minh Đức (Trưởng nhóm)",
      avatarUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      role: "leader",
      text: "Tối nay 21h30 cả nhóm mình giải đề Toán Sở Hà Nội lần 1 nhé! Mình đã ghim file PDF ở dưới.",
      attachment: "De-Toan-So-Ha-Noi-2026.pdf",
      time: "20:45",
    },
    {
      id: "gm-2",
      sender: "Trần Ngọc Khánh Linh",
      avatarUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      role: "member",
      text: "Ok cậu ơi! Câu 45 phần Xác suất có điều kiện hơi khó, lát thảo luận kỹ câu đó nha.",
      time: "20:48",
    },
    {
      id: "gm-3",
      sender: "Lê Hoàng Nam",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "member",
      text: "Mình vừa hoàn thành 50 câu Flashcard Vật lý chương Khí lý tưởng rồi nhé!",
      time: "21:05",
    },
  ]);

  const [tasks, setTasks] = useState<GroupTaskItem[]>([
    {
      id: "t-1",
      title: "Giải 50 câu trắc nghiệm Hàm số & Tiệm cận",
      assignee: "Cả nhóm (6/6)",
      dueDate: "22:00 Hôm nay",
      done: true,
    },
    {
      id: "t-2",
      title: "Tóm tắt Sơ đồ tư duy Hóa Hữu cơ Chương 1",
      assignee: "Khánh Linh, Minh Đức",
      dueDate: "Ngày mai, 20:00",
      done: false,
    },
    {
      id: "t-3",
      title: "Thi thử Online Đề Vật Lý Chuyên Phan Bội Châu",
      assignee: "Cả nhóm",
      dueDate: "Chủ nhật tuần này",
      done: false,
    },
  ]);

  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [attachedGroupFile, setAttachedGroupFile] = useState<{
    name: string;
    size: string;
    dataUrl: string;
    mimeType: string;
  } | null>(null);
  const groupFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleGroupFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAttachedGroupFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        dataUrl: reader.result as string,
        mimeType: file.type,
      });
      toast.success(`Đã đính kèm tệp thật: ${file.name}`);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const sendGroupMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim() && !attachedGroupFile) return;
    setMessages([
      ...messages,
      {
        id: `gm-${Date.now()}`,
        sender: "Minh Đức (Trưởng nhóm)",
        avatarUrl:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
        role: "leader",
        text:
          chatText ||
          `Mình vừa chia sẻ tệp "${attachedGroupFile?.name}" cho cả nhóm nhé!`,
        attachment: attachedGroupFile
          ? `${attachedGroupFile.name} (${attachedGroupFile.size})`
          : undefined,
        time: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setChatText("");
    setAttachedGroupFile(null);
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    toast.info("Trưởng nhóm đã xóa tin nhắn.");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    toast.success("Đã cập nhật tiến độ công việc nhóm!");
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Cover Photo & Member Avatar Stack */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-slate-900 p-6 sm:p-8 text-white soft-shadow">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
          alt="Nhóm học tập"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-indigo-950/60" />

        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-lg bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                ● 6 bạn đang ngồi bàn học
              </span>
              <span className="text-xs text-slate-300">
                Mã phòng:{" "}
                <strong className="text-amber-300 font-extrabold">
                  BYE-A00-2026
                </strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText("BYE-A00-2026");
                  toast.success("Đã sao chép mã mời: BYE-A00-2026");
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-white/20"
              >
                <Copy className="h-3 w-3" /> Copy mã
              </button>
            </div>

            <h1 className="mt-2.5 text-2xl font-extrabold sm:text-3xl">
              Team Khối A00 — Mục tiêu 28+ ĐH Bách Khoa
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {GROUP_MEMBERS.map((m) => (
                  <img
                    key={m.name}
                    src={m.avatar}
                    alt={m.name}
                    title={m.name}
                    className="h-9 w-9 rounded-full border-2 border-slate-900 object-cover"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-300">
                Cùng học mỗi tối lúc 21:00 – 22:30
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-44 sm:w-48">
              <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={inviteCodeInput}
                onChange={(e) => setInviteCodeInput(e.target.value)}
                placeholder="Nhập mã phòng..."
                className="pl-9 h-10 text-xs bg-white/95 text-slate-900 border-0"
              />
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                if (!inviteCodeInput.trim()) {
                  toast.error("Vui lòng nhập mã mời nhóm!");
                  return;
                }
                toast.success(
                  `Đã gửi yêu cầu tham gia nhóm ${inviteCodeInput}!`
                );
                setInviteCodeInput("");
              }}
            >
              Vào phòng
            </Button>
            <Button
              size="sm"
              variant="accent"
              onClick={() =>
                toast.success("Đã tạo nhóm mới! Mã mời của bạn: BYE-12A1")
              }
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Lập nhóm mới
            </Button>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "chat", label: "Bàn thảo luận & Tài liệu", icon: Users },
          { id: "tasks", label: "Việc cần làm & Lịch học", icon: CheckSquare },
          { id: "quiz", label: "Đố vui nhanh", icon: Swords },
          { id: "leaderboard", label: "Thi đua trong nhóm", icon: Trophy },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(
                  tab.id as "chat" | "tasks" | "quiz" | "leaderboard"
                )
              }
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                active
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "chat" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-8 flex flex-col h-[520px] overflow-hidden">
            <div className="border-b border-border px-5 py-3.5 flex items-center justify-between bg-secondary/30">
              <span className="text-sm font-bold">
                Trò chuyện & Giải bài cùng nhau
              </span>
              <Badge variant="outline">Vai trò: Trưởng nhóm</Badge>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-background p-3.5"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={m.avatarUrl}
                      alt={m.sender}
                      className="h-10 w-10 shrink-0 rounded-xl object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">
                          {m.sender}
                        </span>
                        {m.role === "leader" && (
                          <Crown className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
                        )}
                        <span className="text-[10px] text-muted-foreground">
                          {m.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-foreground/90 leading-relaxed">
                        {m.text}
                      </p>
                      {m.attachment && (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                          📎 {m.attachment}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteMessage(m.id)}
                    title="Xóa tin nhắn (Quyền Trưởng nhóm)"
                    className="opacity-0 group-hover:opacity-100 rounded-lg p-1.5 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {attachedGroupFile && (
              <div className="border-t border-border bg-indigo-50/70 dark:bg-indigo-950/30 px-4 py-2 flex items-center justify-between text-xs">
                <span className="font-bold text-primary truncate">
                  📎 Đã chọn tệp: {attachedGroupFile.name} ({attachedGroupFile.size})
                </span>
                <button
                  type="button"
                  onClick={() => setAttachedGroupFile(null)}
                  className="text-rose-500 font-bold hover:underline ml-2"
                >
                  Hủy
                </button>
              </div>
            )}

            <form
              onSubmit={sendGroupMessage}
              className="border-t border-border p-3.5 flex items-center gap-2 bg-card"
            >
              <input
                ref={groupFileInputRef}
                type="file"
                accept=".pdf,.docx,image/png,image/jpeg,image/webp"
                onChange={handleGroupFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => groupFileInputRef.current?.click()}
                title="Chọn tệp PDF, DOCX hoặc Ảnh thật từ máy tính để gửi vào nhóm"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:text-primary"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <Input
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Nhắn tin hoặc bấm kẹp giấy để gửi tệp thật..."
                className="h-10"
              />
              <Button type="submit" size="sm" className="h-10 px-4">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>

          <Card className="lg:col-span-4 p-5 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Bạn học xin vào nhóm (1)
              </h3>
              <div className="mt-2.5 flex items-center justify-between rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80"
                    alt="Trần Bảo Ngọc"
                    className="h-9 w-9 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold">Trần Bảo Ngọc (12A3)</p>
                    <p className="text-[10px] text-muted-foreground">
                      Nhập mã mời 5 phút trước
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() =>
                    toast.success("Đã duyệt Trần Bảo Ngọc vào nhóm học tập!")
                  }
                  className="h-8 px-3 text-xs"
                >
                  Duyệt
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-foreground mb-2.5">
                Lịch hẹn học chung hàng tuần
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 rounded-xl bg-secondary/60 p-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-bold">Thứ 3 & Thứ 5 (21:00 - 22:30)</p>
                    <p className="text-muted-foreground">
                      Giải đề Toán + Vật lý Sở Hà Nội
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-secondary/60 p-3">
                  <Calendar className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-bold">Chủ Nhật (19:30 - 21:00)</p>
                    <p className="text-muted-foreground">
                      Thi thử Hóa học & Tổng kết tuần
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "tasks" && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold">
                Mục tiêu & Bảng phân công bài tập nhóm
              </h2>
              <p className="text-xs text-muted-foreground">
                Bấm vào từng mục để đánh dấu đã hoàn thành
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => {
                setTasks([
                  ...tasks,
                  {
                    id: `t-${Date.now()}`,
                    title: "Ôn tập 30 câu Đúng/Sai Toán 12 Chương Nguyên hàm",
                    assignee: "Cả nhóm",
                    dueDate: "Thứ 6 tuần này",
                    done: false,
                  },
                ]);
                toast.success("Đã thêm nhiệm vụ mới cho nhóm!");
              }}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Thêm việc mới
            </Button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-border p-4 transition hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={`h-5 w-5 ${
                      task.done ? "text-emerald-500" : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-sm font-bold ${
                        task.done ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Phụ trách: {task.assignee}
                    </p>
                  </div>
                </div>
                <Badge variant={task.done ? "success" : "accent"}>
                  Hạn: {task.dueDate}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "quiz" && (
        <Card className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="accent" className="mb-1">
                Phản xạ nhanh cùng bạn bè
              </Badge>
              <h2 className="text-lg font-extrabold">
                Câu hỏi đố vui giữa các thành viên (+50 XP)
              </h2>
            </div>
            <span className="text-xs font-bold text-primary">
              Câu 1 / 5 • Hóa học 12
            </span>
          </div>

          <div className="rounded-2xl bg-secondary/50 p-5">
            <p className="text-base font-extrabold text-foreground">
              Chất nào sau đây thuộc loại Ester no, đơn chức, mạch hở?
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "CH3COOCH=CH2",
                "HCOOCH3 (Methyl formate)",
                "CH3COOH",
                "(C17H35COO)3C3H5",
              ].map((ans, idx) => (
                <button
                  key={ans}
                  type="button"
                  onClick={() => {
                    setQuizAnswered(idx);
                    if (idx === 1) {
                      toast.success(
                        "Chính xác! Bạn giành +50 XP dẫn đầu nhóm!"
                      );
                    } else {
                      toast.error("Chưa đúng rồi! Đáp án đúng là HCOOCH3.");
                    }
                  }}
                  className={`rounded-xl border p-3.5 text-left text-sm font-bold transition ${
                    quizAnswered === idx
                      ? idx === 1
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-600"
                        : "border-rose-500 bg-rose-500/15 text-rose-600"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {activeTab === "leaderboard" && (
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-extrabold">
            Bảng xếp hạng các thành viên trong nhóm
          </h2>
          <div className="space-y-2.5">
            {GROUP_MEMBERS.map((mem, idx) => (
              <div
                key={mem.name}
                className="flex items-center justify-between rounded-2xl border border-border bg-secondary/30 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-xs font-extrabold text-primary">
                    #{idx + 1}
                  </span>
                  <img
                    src={mem.avatar}
                    alt={mem.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold">{mem.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {mem.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-extrabold">
                  <span className="text-amber-500">🔥 {mem.streak}</span>
                  <span className="text-primary">{mem.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
