"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  Send,
  ImagePlus,
  Lightbulb,
  BookOpen,
  ListChecks,
  Feather,
  Calculator,
  Plus,
  Bot,
  Trash2,
  Atom,
  FlaskConical,
  FileText,
  ChevronRight,
  Info,
  User,
  PanelLeftClose,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { formatBytes } from "@/lib/utils";

type TutorMode =
  | "step-by-step"
  | "explain"
  | "summary"
  | "quiz"
  | "essay-review";

interface RealFileData {
  fileName: string;
  mimeType: string;
  size: number;
  base64Data: string;
  dataUrl: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  attachment?: {
    fileName: string;
    mimeType: string;
    dataUrl: string;
    size: number;
  };
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
}

const TUTOR_TABS: {
  id: TutorMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "step-by-step", label: "Giải bài tập", icon: FileText },
  { id: "explain", label: "Giải thích", icon: Lightbulb },
  { id: "summary", label: "Tóm tắt", icon: BookOpen },
  { id: "quiz", label: "Trắc nghiệm", icon: ListChecks },
  { id: "essay-review", label: "Chấm Văn", icon: Feather },
];

const SUGGESTION_ITEMS = [
  {
    subject: "Toán học",
    prompt: "Tìm cực trị của hàm số y = x^3 - 3x^2 + 2",
    icon: Calculator,
    iconBg:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300",
    cardBg:
      "bg-[#F3F4FE] hover:bg-[#EAEBFA] border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900/50",
    titleColor: "text-indigo-700 dark:text-indigo-300",
  },
  {
    subject: "Vật lý",
    prompt: "Giải thích định luật I Nhiệt động lực học Vật lý 12",
    icon: Atom,
    iconBg: "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300",
    cardBg:
      "bg-[#F0F7FF] hover:bg-[#E4F0FF] border-sky-100 dark:bg-sky-950/30 dark:border-sky-900/50",
    titleColor: "text-sky-700 dark:text-sky-300",
  },
  {
    subject: "Hóa học",
    prompt: "Tạo 3 câu trắc nghiệm Hóa 12 bài Ester - Lipid",
    icon: FlaskConical,
    iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300",
    cardBg:
      "bg-[#FFF2F5] hover:bg-[#FFE6EC] border-rose-100 dark:bg-rose-950/30 dark:border-rose-900/50",
    titleColor: "text-rose-700 dark:text-rose-300",
  },
  {
    subject: "Ngữ văn",
    prompt: "Lập dàn ý Nghị luận xã hội về Trí tuệ nhân tạo AI",
    icon: FileText,
    iconBg:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
    cardBg:
      "bg-[#F1FBF5] hover:bg-[#E3F7EB] border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/50",
    titleColor: "text-emerald-700 dark:text-emerald-300",
  },
];

const INITIAL_SESSIONS: ChatSession[] = [
  {
    id: "sess-1",
    title: "Tìm cực trị của hàm số y = x^3 - 3x^2 + 2",
    updatedAt: "Hôm nay",
    messages: [
      {
        id: "m-1",
        role: "user",
        content: "Tìm cực trị của hàm số y = x^3 - 3x^2 + 2",
        timestamp: "21:15",
      },
      {
        id: "m-2",
        role: "model",
        content:
          "Chào Minh Đức! Chúng ta giải bài toán tìm cực trị của hàm số $y = x^3 - 3x^2 + 2$ qua **3 bước chuẩn GDPT 2018** như sau:\n\n1. **Tập xác định:** $D = \\mathbb{R}$.\n2. **Tính đạo hàm:** $y' = 3x^2 - 6x$.\n   Cho $y' = 0 \\Leftrightarrow 3x(x - 2) = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$.\n3. **Kết luận cực trị:**\n   - Hàm số đạt **cực đại** tại $x = 0$, giá trị cực đại $y_{CĐ} = f(0) = 2$.\n   - Hàm số đạt **cực tiểu** tại $x = 2$, giá trị cực tiểu $y_{CT} = f(2) = -2$.",
        timestamp: "21:15",
      },
    ],
  },
];

const STORAGE_KEY = "byethpt_ai_chat_sessions_v2";

export default function AITutorPage() {
  const [mode, setMode] = useState<TutorMode>("step-by-step");
  const [hintOnlyMode, setHintOnlyMode] = useState<boolean>(false);
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [attachedFile, setAttachedFile] = useState<RealFileData | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatSession[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const saveSessionsToStorage = (updated: ChatSession[]) => {
    setSessions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota exceeded if large base64 images are stored
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleStartNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
    setInput("");
    setAttachedFile(null);
    toast.success("Đã mở cuộc trò chuyện mới!");
  };

  const handleSelectSession = (session: ChatSession) => {
    if (isStreaming) return;
    setActiveSessionId(session.id);
    setMessages(session.messages);
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = sessions.filter((s) => s.id !== id);
    saveSessionsToStorage(updated);
    if (activeSessionId === id) {
      setActiveSessionId(null);
      setMessages([]);
    }
    toast.info("Đã xóa cuộc trò chuyện khỏi lịch sử.");
  };

  // Real File Picker Handler (Images & PDFs)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      toast.error("Kích thước tệp vượt quá 15MB, vui lòng chọn tệp nhỏ hơn!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(",")[1] || "";
      setAttachedFile({
        fileName: file.name,
        mimeType: file.type || "image/png",
        size: file.size,
        base64Data,
        dataUrl: result,
      });
      toast.success(`Đã tải lên tệp thật: ${file.name} (${formatBytes(file.size)})`);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt ?? input).trim();
    if ((!textToSend && !attachedFile) || isStreaming) return;

    const historyForApi = messages
      .filter((m) => m.content.trim().length > 0)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    const nowTime = new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const currentFile = attachedFile;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content:
        textToSend ||
        `Hãy đọc kỹ đề bài trong tệp/ảnh "${currentFile?.fileName}" và giải chi tiết từng bước giúp em!`,
      attachment: currentFile
        ? {
            fileName: currentFile.fileName,
            mimeType: currentFile.mimeType,
            dataUrl: currentFile.dataUrl,
            size: currentFile.size,
          }
        : undefined,
      timestamp: nowTime,
    };

    const modelMsgId = `model-${Date.now()}`;
    const placeholderModelMsg: ChatMessage = {
      id: modelMsgId,
      role: "model",
      content: currentFile
        ? `⏳ *Gia sư Gemini đang đọc tệp "${currentFile.fileName}" và giải bài...*`
        : "⏳ *Gia sư Gemini đang soạn lời giải...*",
      timestamp: nowTime,
    };

    const nextMessages = [...messages, userMsg, placeholderModelMsg];
    setMessages(nextMessages);
    setInput("");
    setAttachedFile(null);
    setIsStreaming(true);

    let currentId = activeSessionId;
    if (!currentId) {
      currentId = `sess-${Date.now()}`;
      setActiveSessionId(currentId);
      const newSession: ChatSession = {
        id: currentId,
        title: userMsg.content.slice(0, 55),
        updatedAt: nowTime,
        messages: nextMessages,
      };
      saveSessionsToStorage([newSession, ...sessions]);
    } else {
      saveSessionsToStorage(
        sessions.map((s) =>
          s.id === currentId
            ? { ...s, updatedAt: nowTime, messages: nextMessages }
            : s
        )
      );
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          mode,
          hintOnlyMode,
          history: historyForApi,
          attachment: currentFile
            ? {
                mimeType: currentFile.mimeType,
                base64Data: currentFile.base64Data,
                fileName: currentFile.fileName,
              }
            : undefined,
        }),
      });

      if (!res.ok || !res.body) {
        const errData = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((m) =>
            m.id === modelMsgId ? { ...m, content: accumulated } : m
          )
        );
      }

      const finalMessages = [
        ...messages,
        userMsg,
        { ...placeholderModelMsg, content: accumulated },
      ];
      setSessions((prevSessions) => {
        const nextList = prevSessions.map((s) =>
          s.id === currentId
            ? { ...s, updatedAt: nowTime, messages: finalMessages }
            : s
        );
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
        } catch {
          // Ignore
        }
        return nextList;
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Lỗi kết nối API";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === modelMsgId
            ? {
                ...m,
                content: `⚠️ Không thể kết nối tới Gemini API: **${msg}**. Vui lòng thử lại.`,
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      {/* Hidden Real File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Left Floating Card: Chat History Sidebar */}
      <div className="lg:col-span-3 flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-5 soft-shadow lg:h-[calc(100vh-7.5rem)]">
        <div className="flex flex-col flex-1 overflow-hidden space-y-5">
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4338CA] text-white shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold tracking-tight text-foreground leading-none">
                  BYE THPT
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Không gian học tập
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Thu gọn bảng"
              className="rounded-xl p-1.5 text-muted-foreground hover:bg-secondary"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleStartNewChat}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#3B41E3] py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-[#3136C8] active:scale-[0.99]"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Cuộc trò chuyện mới</span>
          </button>

          {/* LỊCH SỬ CHAT list */}
          <div className="flex flex-1 flex-col overflow-hidden pt-1">
            <div className="flex items-center justify-between px-1">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                LỊCH SỬ CHAT ({sessions.length})
              </p>
              {sessions.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    saveSessionsToStorage([]);
                    setActiveSessionId(null);
                    setMessages([]);
                    toast.info("Đã xóa toàn bộ lịch sử chat.");
                  }}
                  className="text-[11px] font-semibold text-muted-foreground hover:text-rose-500 transition"
                >
                  Xóa hết
                </button>
              )}
            </div>

            <div className="mt-3 flex-1 space-y-1.5 overflow-y-auto pr-1">
              {sessions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  Chưa có lịch sử trò chuyện nào. Hãy đặt câu hỏi đầu tiên nhé!
                </div>
              ) : (
                sessions.map((sess) => {
                  const isSelected = activeSessionId === sess.id;
                  return (
                    <div
                      key={sess.id}
                      onClick={() => handleSelectSession(sess)}
                      className={`group flex cursor-pointer items-center justify-between gap-2 rounded-2xl p-2.5 transition ${
                        isSelected
                          ? "bg-indigo-500/15 text-[#3B41E3] dark:text-indigo-300 font-bold"
                          : "hover:bg-secondary/70 text-foreground/85"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                            isSelected
                              ? "bg-[#3B41E3] text-white"
                              : "bg-secondary text-muted-foreground group-hover:text-primary"
                          }`}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold leading-snug">
                            {sess.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {sess.updatedAt} • {sess.messages.length} tin nhắn
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteSession(e, sess.id)}
                        title="Xóa cuộc trò chuyện này"
                        className="opacity-0 group-hover:opacity-100 shrink-0 rounded-lg p-1 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Hint Mode + User */}
        <div className="space-y-4 pt-4 shrink-0">
          <div className="rounded-2xl border border-amber-200/80 bg-[#FFF8EB] dark:bg-amber-950/30 dark:border-amber-800/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300">
                  Chế độ gợi mở
                </span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={hintOnlyMode}
                onClick={() => {
                  const next = !hintOnlyMode;
                  setHintOnlyMode(next);
                  toast.info(
                    next
                      ? "Đã bật Chế độ gợi mở: Gia sư sẽ gợi ý hướng tư duy trước!"
                      : "Đã tắt Chế độ gợi mở: Giải chi tiết từng bước."
                  );
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  hintOnlyMode
                    ? "bg-amber-500"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    hintOnlyMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-amber-900/75 dark:text-amber-200/70">
              Khi bật, Gia sư Gemini sẽ gợi mở hướng tư duy trước thay vì giải hộ ngay lập tức.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-border/60 pt-3 px-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-foreground">Minh Đức</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Right Main White Card */}
      <div className="lg:col-span-9 flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-card soft-shadow lg:h-[calc(100vh-7.5rem)]">
        <div>
          <div className="px-7 pt-6 pb-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-extrabold text-foreground">
                Gia sư AI
              </h1>
              <span className="rounded-full bg-indigo-50 dark:bg-indigo-500/15 px-3 py-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-500/30">
                Gemini Vision & PDF
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 px-3 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-500/30">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Sẵn sàng hỗ trợ
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Đồng hành cùng bạn chinh phục kiến thức THPT • Nhận diện trực tiếp ảnh chụp đề bài & file PDF
            </p>
          </div>

          {/* Minimal Underline Tabs */}
          <div className="flex items-center gap-6 border-b border-border/80 px-7 overflow-x-auto">
            {TUTOR_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`relative flex shrink-0 items-center gap-2 py-3 text-xs font-bold transition-colors ${
                    isActive
                      ? "text-[#3B41E3] dark:text-indigo-400"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "text-[#3B41E3] dark:text-indigo-400" : ""
                    }`}
                  />
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-full bg-[#3B41E3] dark:bg-indigo-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-10">
          {messages.length === 0 ? (
            <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center text-center py-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF0FF] dark:bg-indigo-500/15 text-[#3B41E3] dark:text-indigo-400 shadow-inner">
                <Bot className="h-10 w-10 stroke-[1.75]" />
              </div>

              <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-[26px]">
                Chào Minh Đức, hôm nay mình học gì?
              </h2>
              <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Bạn cứ đặt bất kỳ câu hỏi, bấm nút 📷 bên dưới để tải <strong>ảnh chụp đề bài / file PDF thật</strong> từ máy tính lên nhé!
              </p>

              <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                {SUGGESTION_ITEMS.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.subject}
                      type="button"
                      onClick={() => handleSendMessage(card.prompt)}
                      className={`group flex items-center justify-between gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${card.cardBg}`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-sm ${card.titleColor}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p
                            className={`text-sm font-extrabold ${card.titleColor}`}
                          >
                            {card.subject}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {card.prompt}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-5">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        isUser
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                          : "bg-[#EEF0FF] text-[#3B41E3] dark:bg-indigo-500/20 dark:text-indigo-300"
                      }`}
                    >
                      {isUser ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                        isUser
                          ? "rounded-tr-sm bg-[#3B41E3] text-white shadow-sm"
                          : "rounded-tl-sm border border-border/80 bg-[#F8FAFC] dark:bg-slate-900/80 text-foreground"
                      }`}
                    >
                      {/* Render Real Uploaded Image or PDF Preview */}
                      {msg.attachment && (
                        <div className="mb-3 overflow-hidden rounded-xl border border-white/20 bg-black/10 p-2">
                          {msg.attachment.mimeType.startsWith("image/") ? (
                            <img
                              src={msg.attachment.dataUrl}
                              alt={msg.attachment.fileName}
                              className="max-h-64 w-auto rounded-lg object-contain"
                            />
                          ) : (
                            <a
                              href={msg.attachment.dataUrl}
                              download={msg.attachment.fileName}
                              className="flex items-center gap-2 text-xs font-bold underline"
                            >
                              <FileText className="h-4 w-4" />
                              {msg.attachment.fileName} (
                              {formatBytes(msg.attachment.size)})
                            </a>
                          )}
                        </div>
                      )}

                      {isUser ? (
                        <div className="whitespace-pre-line">{msg.content}</div>
                      ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none space-y-2 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}

                      <p
                        className={`mt-2 text-[10px] ${
                          isUser
                            ? "text-indigo-200 text-right"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Bottom Composer Bar with Real Image/File Preview */}
        <div className="border-t border-border/70 bg-card px-6 pt-3.5 pb-3">
          {attachedFile && (
            <div className="mx-auto mb-3 flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/80 dark:bg-indigo-950/40 dark:border-indigo-800 p-2.5 px-3.5 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                {attachedFile.mimeType.startsWith("image/") ? (
                  <img
                    src={attachedFile.dataUrl}
                    alt={attachedFile.fileName}
                    className="h-12 w-12 shrink-0 rounded-xl object-cover border border-indigo-300"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3B41E3] text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-extrabold text-indigo-950 dark:text-indigo-200">
                    {attachedFile.fileName}
                  </p>
                  <p className="text-[11px] text-indigo-700/80 dark:text-indigo-300/80">
                    {formatBytes(attachedFile.size)} • Sẵn sàng gửi cho Gemini Vision đọc đề
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAttachedFile(null)}
                className="shrink-0 rounded-xl bg-rose-500/10 px-2.5 py-1.5 font-bold text-rose-600 hover:bg-rose-500/20 inline-flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Xóa
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="mx-auto flex max-w-3xl items-center gap-2.5"
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Chọn ảnh chụp đề bài (PNG, JPG) hoặc file PDF từ máy tính"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-[#F8FAFC] dark:bg-secondary text-muted-foreground transition hover:border-indigo-300 hover:text-[#3B41E3]"
            >
              <ImagePlus className="h-5 w-5" />
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi hoặc bấm nút bên trái để tải ảnh bài tập / PDF thật lên..."
                className="h-11 w-full rounded-2xl border border-border bg-[#F8FAFC] dark:bg-secondary/60 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:bg-card focus:outline-none focus:ring-2 focus:ring-[#3B41E3]/30 focus:border-[#3B41E3] transition"
              />
              <button
                type="submit"
                disabled={isStreaming}
                aria-label="Gửi câu hỏi"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#3B41E3] text-white transition hover:bg-[#3136C8] disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>

          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            <span>
              AI hỗ trợ học tập. Hãy kiểm tra lại các thông tin quan trọng.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
