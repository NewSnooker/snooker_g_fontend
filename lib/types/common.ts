import { JSX } from "react";

export type imageBody = {
  name: string;
  key: string;
  url: string;
};

export type imageProps = {
  id: string;
  name: string;
  key: string;
  url: string;
  createdAt: Date;
};

export interface SidebarLinkProps {
  title: string;
  href: string;
  icon: JSX.Element;
}

export interface ApiTableResponse<T> {
  data: T[];
  pageCount: number;
  total: number;
}

export interface TableParams {
  pageIndex: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: string;
  filters?: Record<string, any>;
  search?: string;
}
export type DataFetcher<TData> = (
  params: TableParams
) => Promise<ApiTableResponse<TData>>;

export enum DateRange {
  today = "today",
  last7days = "last7days",
  last30days = "last30days",
  thismonth = "thismonth",
  thisyear = "thisyear",
}

export interface TableState {
  columnFilters: Array<{ id: string; value: any }>; // สำหรับการกรองคอลัมน์
  columnVisibility: Record<string, boolean>; // สำหรับการซ่อน/แสดงคอลัมน์
  globalFilter: string; // สำหรับการค้นหาทั่วไป
  pagination: { pageIndex: number; pageSize: number }; // สำหรับการแบ่งหน้า
  rowSelection: Record<string, boolean>; // สำหรับการเลือกแถว (ใช้ ID เป็น key)
  sorting: Array<{ id: string; desc: boolean }>; // สำหรับการเรียงลำดับ
}

export interface TempUploadProps {
  id: string;
  key: string;
  name: string;
  url: string;
  uploadedById: string;
  createdAt: Date;
}

export type ModelType = "users" | "projects" | string;
