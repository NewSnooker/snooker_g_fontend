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
// options: [
//   { label: "วันนี้", value: "today" },
//   { label: "7 วันล่าสุด", value: "last7days" },
//   { label: "30 วันล่าสุด", value: "last30days" },
//   { label: "เดือนนี้", value: "thismonth" },
//   { label: "ปีนี้", value: "thisyear" },
// ],

export enum DateRange {
  today = "today",
  last7days = "last7days",
  last30days = "last30days",
  thismonth = "thismonth",
  thisyear = "thisyear",
}
