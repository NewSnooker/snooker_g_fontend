"use client";
import { FilterConfig } from "@/lib/types/filterConfig";
import { Role } from "@/lib/types/user";
import { format, parse } from "date-fns";
import { DateRange } from "./types/common";

export const createFilterConfig = (config: FilterConfig): FilterConfig =>
  config;

// filterConfig สำหรับ users
export const userFilterConfig: FilterConfig = createFilterConfig({
  roles: {
    param: "roles",
    type: "select",
    title: "บทบาท",
    options: [
      { label: Role.USER, value: Role.USER },
      { label: Role.ADMIN, value: Role.ADMIN },
      { label: Role.SUPER_ADMIN, value: Role.SUPER_ADMIN },
    ],
    pick: (value) =>
      Array.isArray(value) ? value.join(",") : (value as string),
  },
  isActive: {
    param: "isActive",
    type: "boolean",
    title: "สถานะ",
    options: [
      { label: "เปิดใช้งาน", value: "true" },
      { label: "ปิดใช้งาน", value: "false" },
    ],
    pick: (value) => (Array.isArray(value) ? value.join(",") : value),
  },
  createdAt: {
    param: "createdAt",
    type: "dateRange",
    title: "วันที่สร้าง",
    dateFormat: "dd/MM/yyyy",
    options: [
      { label: "วันนี้", value: DateRange.today },
      { label: "7 วันล่าสุด", value: DateRange.last7days },
      { label: "30 วันล่าสุด", value: DateRange.last30days },
    ],
    pick: (value) => {
      if (Array.isArray(value) && value.length === 2) {
        const start = parse(value[0], "dd/MM/yyyy", new Date());
        const end = parse(value[1], "dd/MM/yyyy", new Date());
        return {
          start: format(start, "yyyy-MM-dd"),
          end: format(end, "yyyy-MM-dd"),
        };
      }
      return value as string;
    },
  },
});

// filterConfig สำหรับ products
export const productFilterConfig: FilterConfig = createFilterConfig({
  category: {
    param: "category",
    type: "select",
    title: "หมวดหมู่",
    options: [
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" },
      { label: "Books", value: "books" },
    ],
    pick: (value) => (Array.isArray(value) ? value.join(",") : value),
  },
  inStock: {
    param: "inStock",
    type: "boolean",
    title: "สถานะสต็อก",
    options: [
      { label: "มีสินค้า", value: "true" },
      { label: "หมดสต็อก", value: "false" },
    ],
    pick: (value) => (Array.isArray(value) ? value.join(",") : value),
  },
  price: {
    param: "price",
    type: "text",
    title: "ราคา",
    pick: (value) => (Array.isArray(value) ? value.join(",") : value),
  },
});
