"use client";

import { useState, useCallback, useEffect } from "react";
import { Category, DEFAULT_CATEGORIES } from "@/data/categories";
import { SalaryInput } from "@/components/salary-input";
import { CategoryManager } from "@/components/category-manager";
import { SplitVisualization } from "@/components/split-visualization";
import { FinancialGuidelines } from "@/components/financial-guidelines";
import { useLanguage, type Locale } from "@/components/language-provider";
import { useTranslations } from "next-intl";

const TAB_COUNT = 3;
const TAB_KEYS = [
  {
    salary: "salary-splitter-salary-1",
    categories: "salary-splitter-categories-1",
  },
  {
    salary: "salary-splitter-salary-2",
    categories: "salary-splitter-categories-2",
  },
  {
    salary: "salary-splitter-salary-3",
    categories: "salary-splitter-categories-3",
  },
];

export default function Home() {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState(0);
  const [salary, setSalary] = useState<number[]>([1800, 2300, 5000]);
  const [categories, setCategories] = useState<Category[][]>(
    [...Array(TAB_COUNT)].map(() => DEFAULT_CATEGORIES),
  );
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const loadedSalaries = [];
      const loadedCategories = [];
      for (let i = 0; i < TAB_COUNT; i++) {
        const s = localStorage.getItem(TAB_KEYS[i].salary);
        loadedSalaries.push(s ? JSON.parse(s) : [1800, 2300, 5000][i]);
        const c = localStorage.getItem(TAB_KEYS[i].categories);
        loadedCategories.push(c ? JSON.parse(c) : DEFAULT_CATEGORIES);
      }
      setSalary(loadedSalaries);
      setCategories(loadedCategories);
    } catch {
      // ignore corrupted data
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage after hydration
  useEffect(() => {
    if (hydrated) {
      for (let i = 0; i < TAB_COUNT; i++) {
        localStorage.setItem(TAB_KEYS[i].salary, JSON.stringify(salary[i]));
        localStorage.setItem(
          TAB_KEYS[i].categories,
          JSON.stringify(categories[i]),
        );
      }
    }
  }, [salary, categories, hydrated]);

  const handleSalaryChange = useCallback(
    (val: number) => {
      setSalary((prev) => {
        const next = [...prev];
        next[activeTab] = val;
        return next;
      });
    },
    [activeTab],
  );

  const handleCategoriesChange = useCallback(
    (cats: Category[]) => {
      setCategories((prev) => {
        const next = [...prev];
        next[activeTab] = cats;
        return next;
      });
    },
    [activeTab],
  );

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

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-lg font-medium border transition-colors ${
                activeTab === i
                  ? "bg-accent text-white border-accent"
                  : "bg-card text-muted border-border hover:text-foreground"
              }`}
            >
              {`Salary ${i + 1}`}
            </button>
          ))}
        </div>
      </div>

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
                    onSalaryChange={handleSalaryChange}
                    currentSalary={salary[activeTab]}
                  />
                </div>

                <div className="p-4 sm:p-6 bg-card border border-border rounded-2xl">
                  <CategoryManager
                    categories={categories[activeTab]}
                    salary={salary[activeTab]}
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
                  <SplitVisualization
                    salary={salary[activeTab]}
                    categories={categories[activeTab]}
                  />
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
