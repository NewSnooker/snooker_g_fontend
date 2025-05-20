// types/filterConfig.ts
export type FilterType = "select" | "boolean" | "dateRange" | "text";

export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface FilterConfigItem {
  param: string; // ชื่อพารามิเตอร์ที่ส่งไป API
  type: FilterType; // ประเภทของตัวกรอง
  title: string; // ชื่อที่แสดงใน UI
  options?: FilterOption[]; // ตัวเลือกสำหรับ select หรือ boolean
  pick: (value: string | string[]) => string; // ฟังก์ชันแปลงค่าให้เป็น query string
  dateFormat?: string; // รูปแบบวันที่ (สำหรับ dateRange)
}

export type FilterConfig = Record<string, FilterConfigItem>;
