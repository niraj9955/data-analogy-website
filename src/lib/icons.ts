import {
  Database,
  Smartphone,
  Code2,
  Cpu,
  BarChart3,
  Lightbulb,
  Target,
  Zap,
  ShieldCheck,
  Layers,
  Factory,
  GraduationCap,
  Blocks,
  Globe2,
  Truck,
  Stethoscope,
  Package,
  ShoppingCart,
  BookOpen,
  Briefcase,
  Monitor,
  Heart,
  MapPin,
  Cloud,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Database,
  Smartphone,
  Code2,
  Cpu,
  BarChart3,
  Lightbulb,
  Target,
  Zap,
  ShieldCheck,
  Layers,
  Factory,
  GraduationCap,
  Blocks,
  Globe2,
  Truck,
  Stethoscope,
  Package,
  ShoppingCart,
  BookOpen,
  Briefcase,
  Monitor,
  Heart,
  MapPin,
  Cloud,
  Users,
  Settings,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Code2;
}

export const iconNames = Object.keys(iconMap);

export type { LucideIcon };
