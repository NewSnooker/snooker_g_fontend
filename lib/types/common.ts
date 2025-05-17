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
