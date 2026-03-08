"use client";

import { Category } from "@/data/categories";
import { useTranslations } from "next-intl";
import { WarningIcon, CheckCircleIcon } from "@/components/icons";

interface BudgetAlertsProps {
  salary: number;
  categories: Category[];
}

interface GuidelineRule {
  /** Keywords to match against category names (case-insensitive) */
  keywords: string[];
  /** Maximum recommended percentage (alerts if exceeded) */
  maxPct?: number;
  /** Minimum recommended percentage (alerts if below) */
  minPct?: number;
  /** Lower bound of the recommended range (for computing euro ranges) */
  rangeLowPct?: number;
  /** Upper bound of the recommended range (for computing euro ranges) */
  rangeHighPct?: number;
  /** Translation key for the category label */
  labelKey: string;
  /** Translation key for the "over" alert message */
  overKey?: string;
  /** Translation key for the "under" alert message */
  underKey?: string;
  /** The recommended range string shown in the alert */
  recommendedRange: string;
}

const RULES: GuidelineRule[] = [
  {
    keywords: ["rent", "housing", "mortgage", "nuoma", "būstas", "paskolos"],
    maxPct: 30,
    rangeLowPct: 25,
    rangeHighPct: 30,
    labelKey: "housing_rent",
    overKey: "alert_housing_over",
    recommendedRange: "25 – 30%",
  },
  {
    keywords: [
      "savings",
      "invest",
      "save",
      "santaupos",
      "investicijos",
      "taupymas",
    ],
    minPct: 20,
    rangeLowPct: 20,
    labelKey: "savings_investments",
    underKey: "alert_savings_under",
    recommendedRange: "20%+",
  },
  {
    keywords: [
      "food",
      "groceries",
      "dining",
      "maistas",
      "bakalėja",
      "valgymas",
    ],
    maxPct: 15,
    rangeLowPct: 10,
    rangeHighPct: 15,
    labelKey: "food_groceries",
    overKey: "alert_food_over",
    recommendedRange: "10 – 15%",
  },
  {
    keywords: [
      "transport",
      "car",
      "gas",
      "commute",
      "transportas",
      "automobilis",
      "kuras",
    ],
    maxPct: 15,
    rangeLowPct: 10,
    rangeHighPct: 15,
    labelKey: "transportation",
    overKey: "alert_transport_over",
    recommendedRange: "10 – 15%",
  },
  {
    keywords: [
      "utilities",
      "bills",
      "electric",
      "water",
      "internet",
      "komunalinės",
      "sąskaitos",
    ],
    maxPct: 10,
    rangeLowPct: 5,
    rangeHighPct: 10,
    labelKey: "utilities_bills",
    overKey: "alert_utilities_over",
    recommendedRange: "5 – 10%",
  },
  {
    keywords: [
      "fun",
      "entertainment",
      "leisure",
      "hobby",
      "pramogos",
      "laisvalaikis",
    ],
    maxPct: 10,
    rangeLowPct: 5,
    rangeHighPct: 10,
    labelKey: "entertainment_fun",
    overKey: "alert_entertainment_over",
    recommendedRange: "5 – 10%",
  },
];

function formatEurPlain(amount: number): string {
  return Math.round(amount).toLocaleString("de-DE");
}

function computeRecommendedAmountRange(
  rule: GuidelineRule,
  salary: number,
): string {
  const low =
    rule.rangeLowPct != null
      ? Math.round((rule.rangeLowPct / 100) * salary)
      : null;
  const high =
    rule.rangeHighPct != null
      ? Math.round((rule.rangeHighPct / 100) * salary)
      : null;

  if (low != null && high != null) {
    return `${formatEurPlain(low)}–${formatEurPlain(high)} €`;
  }
  if (low != null) {
    return `${formatEurPlain(low)} €+`;
  }
  if (high != null) {
    return `${formatEurPlain(high)} €`;
  }
  return "";
}

interface Alert {
  type: "warning" | "info";
  categoryName: string;
  guidelineLabel: string;
  userPct: number;
  userAmount: string;
  recommendedRange: string;
  recommendedAmount: string;
  messageKey: string;
}

function matchCategoryToRule(
  category: Category,
  rules: GuidelineRule[],
): GuidelineRule | null {
  const name = category.name.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => name.includes(kw))) {
      return rule;
    }
  }
  return null;
}

function AlertCard({
  alert,
  t,
}: {
  alert: Alert;
  t: ReturnType<typeof useTranslations>;
}) {
  const isWarning = alert.type === "warning";

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-xs leading-relaxed transition-all ${
        isWarning
          ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          : "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      }`}
    >
      <div className="mt-0.5">
        {isWarning ? (
          <WarningIcon className="shrink-0" />
        ) : (
          <CheckCircleIcon className="shrink-0" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">
          {alert.categoryName}{" "}
          <span className="font-data">{alert.userPct}%</span>
        </p>
        <p
          className={`mt-0.5 ${isWarning ? "text-amber-700 dark:text-amber-300/80" : "text-emerald-700 dark:text-emerald-300/80"}`}
        >
          {t(alert.messageKey, {
            pct: alert.userPct,
            amount: alert.userAmount,
            recommended: alert.recommendedRange,
            recommendedAmount: alert.recommendedAmount,
          })}
        </p>
      </div>
    </div>
  );
}

export function BudgetAlerts({ salary, categories }: BudgetAlertsProps) {
  const t = useTranslations();

  const validCategories = categories.filter(
    (c) => c.name && c.percentage > 0 && c.enabled !== false,
  );

  if (salary <= 0 || validCategories.length === 0) {
    return null;
  }

  const alerts: Alert[] = [];

  for (const cat of validCategories) {
    const rule = matchCategoryToRule(cat, RULES);
    if (!rule) continue;

    const userAmount = `${formatEurPlain(Math.round((cat.percentage / 100) * salary))} €`;

    // Check if over maximum
    if (rule.maxPct != null && cat.percentage > rule.maxPct && rule.overKey) {
      const recommendedAmount = computeRecommendedAmountRange(rule, salary);
      alerts.push({
        type: "warning",
        categoryName: cat.name,
        guidelineLabel: t(rule.labelKey),
        userPct: cat.percentage,
        userAmount,
        recommendedRange: rule.recommendedRange,
        recommendedAmount,
        messageKey: rule.overKey,
      });
    }

    // Check if under minimum
    if (rule.minPct != null && cat.percentage < rule.minPct && rule.underKey) {
      const recommendedAmount = computeRecommendedAmountRange(rule, salary);
      alerts.push({
        type: "warning",
        categoryName: cat.name,
        guidelineLabel: t(rule.labelKey),
        userPct: cat.percentage,
        userAmount,
        recommendedRange: rule.recommendedRange,
        recommendedAmount,
        messageKey: rule.underKey,
      });
    }
  }

  if (alerts.length === 0) {
    // Show a positive message when everything is within guidelines
    const hasAnyMatch = validCategories.some((c) =>
      matchCategoryToRule(c, RULES),
    );
    if (!hasAnyMatch) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
            {t("budget_insights")}
          </h3>
        </div>
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs leading-relaxed">
          <div className="mt-0.5">
            <CheckCircleIcon className="shrink-0" />
          </div>
          <p>{t("alert_all_good")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
          {t("budget_insights")}
        </h3>
        <span className="text-[10px] text-muted/60 font-data">
          {alerts.length}{" "}
          {alerts.length === 1
            ? t("alert_count_single")
            : t("alert_count_plural")}
        </span>
      </div>
      <div className="space-y-2">
        {alerts.map((alert, i) => (
          <AlertCard key={`${alert.categoryName}-${i}`} alert={alert} t={t} />
        ))}
      </div>
      <p className="text-[10px] text-muted/60 leading-relaxed">
        {t("alert_disclaimer")}
      </p>
    </div>
  );
}
