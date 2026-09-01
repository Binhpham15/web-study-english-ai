"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  MessageCircle,
  Image as ImageIcon,
  User,
  ListChecks,
  Brain,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Tổng quan", icon: LayoutGrid },
  { href: "/lessons", label: "Bài học", icon: BookOpen },
  { href: "/vocabulary", label: "Từ vựng", icon: ListChecks },
  { href: "/ai-chat", label: "Luyện nói với AI", icon: MessageCircle },
  { href: "/image-learning", label: "Học qua hình ảnh", icon: ImageIcon },
  { href: "/weakness", label: "Điểm yếu", icon: Brain },
  { href: "/profile", label: "Hồ sơ", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar md:flex md:flex-col">
      <div className="flex h-16 items-center gap-2 px-6">
        <span className="font-heading text-lg font-semibold text-sidebar-foreground">
          UTC English
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}