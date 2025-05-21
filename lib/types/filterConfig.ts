// types/filterConfig.ts
export type FilterType = "select" | "boolean" | "dateRange" | "text";

export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface FilterConfigItem {
  param: string;
  type: FilterType;
  title: string;
  options?: FilterOption[];
  pick: (
    value: string | string[]
  ) => string | { [key: string]: string } | string[];
  dateFormat?: string;
}

export type FilterConfig = Record<string, FilterConfigItem>;
