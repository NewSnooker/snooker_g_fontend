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
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "จัดการเกม",
    href: "/dashboard/game",
    icon: <Gamepad2 className="h-4 w-4" />,
  },
  {
    title: "หมวดหมู่เกม",
    href: "/dashboard/category",
    icon: <Layers3 className="h-4 w-4" />,
  },
  {
    title: "จัดการผู้ใช้งาน",
    href: "/dashboard/user",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "ข้อมูลสถานที่เล่น",
    href: "/dashboard/location-info",
    icon: <Store className="h-4 w-4" />,
  },
];

export const userSidebarLinks = [
  {
    title: "หน้าแรก",
    href: "/home",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "ดูเกมทั้งหมด",
    href: "/games",
    icon: <Gamepad2 className="h-4 w-4" />,
  },
  {
    title: "แนะนำเกม / วิธีเล่น",
    href: "/guide",
    icon: <Info className="h-4 w-4" />,
  },
  {
    title: "เพื่อนร่วมเล่น",
    href: "/friends",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "ประวัติการเล่น",
    href: "/history",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    title: "ข้อมูลของฉัน",
    href: "/profile",
    icon: <User className="h-4 w-4" />,
  },
];
