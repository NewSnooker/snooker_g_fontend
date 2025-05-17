// DataTable.config.ts
import { Role } from "@/lib/types/user";

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
} as const;
