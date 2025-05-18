import { Role } from "@/lib/types/user";
import { format, startOfMonth, startOfYear } from "date-fns";

export const filterConfig = {
  roles: {
    param: "roles",
    pick: (value: string | string[]) =>
      Array.isArray(value) ? value.join(",") : value, // รวมค่าหลายตัวด้วยคอมมา
    options: [
      { label: Role.USER, value: Role.USER },
      { label: Role.ADMIN, value: Role.ADMIN },
      { label: Role.SUPER_ADMIN, value: Role.SUPER_ADMIN },
    ],
    title: "บทบาท",
  },
  isActive: {
    param: "isActive",
    pick: (value: string | string[]) =>
      Array.isArray(value) ? value.join(",") : value,
    options: [
      { label: "เปิดใช้งาน", value: "true" },
      { label: "ปิดใช้งาน", value: "false" },
    ],
    title: "สถานะ",
  },
  createdAt: {
    param: "createdAt",
    pick: (value: string | string[]) => {
      if (Array.isArray(value) && value.length === 2) {
        return `${value[0]}|${value[1]}`; // รูปแบบช่วงวันที่: เริ่ม|สิ้นสุด
      }
      return value as string; // ค่า preset เช่น today, month, year
    },
    options: [
      { label: "วันนี้", value: "today" },
      {
        label: "เดือนนี้",
        value: `month|${format(startOfMonth(new Date()), "yyyy-MM-dd")}`,
      },
      {
        label: "ปีนี้",
        value: `year|${format(startOfYear(new Date()), "yyyy-MM-dd")}`,
      },
    ],
    title: "วันที่สร้าง",
  },
} as const;
