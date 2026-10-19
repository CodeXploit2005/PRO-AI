import mongoose, { Schema, Document as MongooseDoc, Model } from "mongoose";
import { GradeLevel, UserRole, ApprovalStatus, DocumentType, ExamType } from "@/types";

export interface IUser extends MongooseDoc {
  name: string;
  email: string;
  passwordHash?: string;
  image?: string;
  role: UserRole;
  grade: GradeLevel;
  school?: string;
  xp: number;
  streak: number;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String },
    image: { type: String },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    grade: { type: Number, enum: [10, 11, 12], default: 12 },
    school: { type: String, trim: true },
    xp: { type: Number, default: 100, index: true },
    streak: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export interface IDocumentItem extends MongooseDoc {
  title: string;
  description: string;
  grade: GradeLevel;
  subjectSlug: string;
  chapterTitle: string;
  type: DocumentType;
  fileUrl: string;
  fileSize: number;
  uploaderId?: mongoose.Types.ObjectId;
  status: ApprovalStatus;
  views: number;
  downloads: number;
  ratingAvg: number;
  tags: string[];
  createdAt: Date;
}

const DocumentSchema = new Schema<IDocumentItem>(
  {
    title: { type: String, required: true, index: "text" },
    description: { type: String, required: true },
    grade: { type: Number, enum: [10, 11, 12], required: true, index: true },
    subjectSlug: { type: String, required: true, index: true },
    chapterTitle: { type: String, required: true },
    type: {
      type: String,
      enum: ["theory", "mindmap", "formula", "exercise", "advanced"],
      required: true,
    },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, default: 0 },
    uploaderId: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    ratingAvg: { type: Number, default: 5.0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export interface IExamItem extends MongooseDoc {
  title: string;
  grade: GradeLevel;
  subjectSlug: string;
  examType: ExamType;
  year: number;
  provinceOrSchool: string;
  fileUrl: string;
  answerFileUrl?: string;
  durationMinutes: number;
  questions: {
    content: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  status: ApprovalStatus;
  downloads: number;
}

const ExamSchema = new Schema<IExamItem>(
  {
    title: { type: String, required: true },
    grade: { type: Number, enum: [10, 11, 12], required: true, index: true },
    subjectSlug: { type: String, required: true, index: true },
    examType: {
      type: String,
      enum: ["15m", "45m", "midterm", "final", "thptqg", "gifted"],
      required: true,
    },
    year: { type: Number, default: 2026 },
    provinceOrSchool: { type: String, required: true },
    fileUrl: { type: String, required: true },
    answerFileUrl: { type: String },
    durationMinutes: { type: Number, default: 50 },
    questions: [
      {
        content: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctIndex: { type: Number, required: true },
        explanation: { type: String, default: "" },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export const DocumentModel: Model<IDocumentItem> =
  mongoose.models.DocumentItem ||
  mongoose.model<IDocumentItem>("DocumentItem", DocumentSchema);

export const ExamModel: Model<IExamItem> =
  mongoose.models.ExamItem ||
  mongoose.model<IExamItem>("ExamItem", ExamSchema);
