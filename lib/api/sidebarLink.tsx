import {
  LayoutDashboard,
  Gamepad2,
  Info,
  Users,
  Clock,
  User,
  Layers3,
  Store,
} from "lucide-react";
export const adminSidebarLinks = [
  {
    title: "แดชบอร์ด",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "จัดการเกม",
    href: "/dashboard/games",
    icon: Gamepad2,
  },
  {
    title: "หมวดหมู่เกม",
    href: "/dashboard/categories",
    icon: Layers3,
  },
  {
    title: "จัดการผู้เล่น",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "ข้อมูลสถานที่เล่น",
    href: "/dashboard/location-info",
    icon: Store,
  },
];
export const userSidebarLinks = [
  {
    title: "หน้าแรก",
    href: "/home",
    icon: LayoutDashboard,
  },
  {
    title: "ดูเกมทั้งหมด",
    href: "/games",
    icon: Gamepad2,
  },
  {
    title: "แนะนำเกม / วิธีเล่น",
    href: "/guide",
    icon: Info,
  },
  {
    title: "เพื่อนร่วมเล่น",
    href: "/friends",
    icon: Users,
  },
  {
    title: "ประวัติการเล่น",
    href: "/history",
    icon: Clock,
  },
  {
    title: "ข้อมูลของฉัน",
    href: "/profile",
    icon: User,
  },
];
