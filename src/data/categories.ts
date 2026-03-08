export interface Category {
  id: string;
  name: string;
  percentage: number;
  color: string;
  description?: string;
  enabled?: boolean;
  isFixed?: boolean;
  fixedAmount?: number;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "1", name: "Rent", percentage: 30, color: "#6366f1", enabled: true },
  { id: "2", name: "Savings", percentage: 20, color: "#10b981", enabled: true },
  { id: "3", name: "Food", percentage: 15, color: "#f59e0b", enabled: true },
  {
    id: "4",
    name: "Transport",
    percentage: 10,
    color: "#3b82f6",
    enabled: true,
  },
  { id: "5", name: "Fun", percentage: 10, color: "#ec4899", enabled: true },
  {
    id: "6",
    name: "Utilities",
    percentage: 10,
    color: "#8b5cf6",
    enabled: true,
  },
  { id: "7", name: "Other", percentage: 5, color: "#64748b", enabled: true },
];

export const CATEGORY_COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
  "#64748b",
  "#ef4444",
  "#14b8a6",
  "#f97316",
];
