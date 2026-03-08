"use client";

import { useState, useCallback, useEffect } from "react";
import { Category, DEFAULT_CATEGORIES } from "@/data/categories";
import { SalaryInput } from "@/components/salary-input";
import { CategoryManager } from "@/components/category-manager";
import { SplitVisualization } from "@/components/split-visualization";
import { FinancialGuidelines } from "@/components/financial-guidelines";
import { BudgetAlerts } from "@/components/budget-alerts";
import { useLanguage, type Locale } from "@/components/language-provider";
import { useTranslations } from "next-intl";

const SALARY_KEY = "salary-splitter-salary";
const CATEGORIES_KEY = "salary-splitter-categories";

export default function Home() {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const [salary, setSalary] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const savedSalary = localStorage.getItem(SALARY_KEY);
      if (savedSalary) setSalary(JSON.parse(savedSalary));

      const savedCategories = localStorage.getItem(CATEGORIES_KEY);
      if (savedCategories) setCategories(JSON.parse(savedCategories));
    } catch {
      // ignore corrupted data
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage after hydration
  useEffect(() => {
    if (hydrated) localStorage.setItem(SALARY_KEY, JSON.stringify(salary));
  }, [salary, hydrated]);

  useEffect(() => {
    if (hydrated)
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories, hydrated]);

  const handleCategoriesChange = useCallback((cats: Category[]) => {
    setCategories(cats);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="text-white"
              >
                <path
                  d="M9 1.5v15M1.5 9h15M4.5 4.5l9 9M13.5 4.5l-9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                {t("app_name")}
              </h1>
              <p className="text-xs text-muted mt-0.5">{t("tagline")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface border border-border rounded-lg p-0.5">
              {(["en", "lt"] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    locale === l
                      ? "bg-accent text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {l === "en" ? "EN" : "LT"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        {!hydrated ? (
          <div className="flex items-center justify-center py-20 text-muted">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-[3fr_2fr] gap-8">
              {/* Left: Input */}
              <div className="space-y-6">
                <div className="p-4 sm:p-6 bg-card border border-border rounded-2xl">
                  <SalaryInput
                    onSalaryChange={setSalary}
                    currentSalary={salary}
                  />
                </div>

                <div className="p-4 sm:p-6 bg-card border border-border rounded-2xl">
                  <CategoryManager
                    categories={categories}
                    salary={salary}
                    onCategoriesChange={handleCategoriesChange}
                  />
                </div>
              </div>

              {/* Right: Visualization */}
              <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
                <div className="p-4 sm:p-6 bg-card border border-border rounded-2xl">
                  <h2 className="text-sm font-medium text-muted mb-4">
                    {t("your_split")}
                  </h2>
                  <SplitVisualization salary={salary} categories={categories} />
                </div>

                <div className="p-4 sm:p-6 bg-card border border-border rounded-2xl">
                  <BudgetAlerts salary={salary} categories={categories} />
                </div>
              </div>
            </div>

            <FinancialGuidelines />
          </>
        )}
      </main>
    </div>
  );
}
