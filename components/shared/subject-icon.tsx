import React from "react";
import {
  Sigma,
  Atom,
  FlaskConical,
  Dna,
  Feather,
  Globe,
  Landmark,
  Compass,
  Cpu,
  Scale,
  Home,
  BookOpen,
  FileCheck2,
  Sparkles,
  Users,
  Layers,
  CalendarCheck,
  Trophy,
  UploadCloud,
  ShieldCheck,
  LucideProps,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Sigma,
  Atom,
  FlaskConical,
  Dna,
  Feather,
  Globe,
  Landmark,
  Compass,
  Cpu,
  Scale,
  Home,
  BookOpen,
  FileCheck2,
  Sparkles,
  Users,
  Layers,
  CalendarCheck,
  Trophy,
  UploadCloud,
  ShieldCheck,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = iconMap[name] || BookOpen;
  return <IconComponent {...props} />;
}
