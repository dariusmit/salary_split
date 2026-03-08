"use client";

import { useTranslations } from "next-intl";
import { InfoCircleIcon } from "@/components/icons";

interface Guideline {
  category: string;
  recommended: string;
  note: string;
}

type T = ReturnType<typeof useTranslations>;

function getGuidelines(t: T): Guideline[] {
  return [
    {
      category: t("housing_rent"),
      recommended: "25 – 30%",
      note: t("housing_note"),
    },
    {
      category: t("savings_investments"),
      recommended: "20%+",
      note: t("savings_note"),
    },
    {
      category: t("food_groceries"),
      recommended: "10 – 15%",
      note: t("food_note"),
    },
    {
      category: t("transportation"),
      recommended: "10 – 15%",
      note: t("transport_note"),
    },
    {
      category: t("utilities_bills"),
      recommended: "5 – 10%",
      note: t("utilities_note"),
    },
    {
      category: t("entertainment_fun"),
      recommended: "5 – 10%",
      note: t("entertainment_note"),
    },
    {
      category: t("emergency_fund"),
      recommended: t("emergency_recommended"),
      note: t("emergency_note"),
    },
  ];
}

function getSixAccounts(t: T): Guideline[] {
  return [
    {
      category: t("necessities"),
      recommended: "55%",
      note: t("necessities_note"),
    },
    {
      category: t("financial_freedom"),
      recommended: "10%",
      note: t("financial_freedom_note"),
    },
    {
      category: t("long_term_savings"),
      recommended: "10%",
      note: t("long_term_savings_note"),
    },
    { category: t("education"), recommended: "10%", note: t("education_note") },
    { category: t("play"), recommended: "10%", note: t("play_note") },
    { category: t("give"), recommended: "5%", note: t("give_note") },
  ];
}

function GuidelineList({ items }: { items: Guideline[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((g) => (
        <li key={g.category} className="flex flex-col gap-0.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted/40 shrink-0" />
            <span className="font-medium text-foreground/70">{g.category}</span>
            <span className="font-mono text-[11px] text-accent/70 shrink-0">
              {g.recommended}
            </span>
          </div>
          <span className="text-muted/60 leading-relaxed pl-3.5 text-[11px]">
            {g.note}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ApproachCard({
  title,
  subtitle,
  items,
  disclaimer,
}: {
  title: string;
  subtitle: React.ReactNode;
  items: Guideline[];
  disclaimer: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface/50 px-4 sm:px-5 py-5 flex flex-col">
      <div className="flex items-start gap-3 mb-4">
        <div className="mt-0.5 shrink-0 text-muted">
          <InfoCircleIcon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted">{title}</h3>
          <p className="text-xs text-muted/70 mt-0.5 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      <GuidelineList items={items} />

      <p className="mt-auto pt-3 border-t border-border/40 text-[11px] text-muted/50 leading-relaxed mt-4">
        {disclaimer}
      </p>
    </div>
  );
}

export function FinancialGuidelines() {
  const t = useTranslations();
  const guidelines = getGuidelines(t);
  const sixAccounts = getSixAccounts(t);

  return (
    <section className="mt-10">
      {/* Shared header */}
      <div className="flex items-start gap-3 mb-4 px-1">
        <div>
          <h2 className="text-sm font-semibold text-foreground/80 tracking-tight">
            {t("budgeting_approaches")}
          </h2>
          <p className="text-xs text-muted/70 mt-0.5 leading-relaxed max-w-xl">
            {t("budgeting_approaches_subtitle")}
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 lg:gap-0 items-stretch">
        {/* 50/30/20 Rule */}
        <ApproachCard
          title={t("financial_guidelines")}
          subtitle={
            <>
              {t("guidelines_description")}{" "}
              <span className="font-medium text-muted">
                {t("rule_50_30_20")}
              </span>{" "}
              rule.
            </>
          }
          items={guidelines}
          disclaimer={t("guidelines_disclaimer")}
        />

        {/* "or" divider */}
        <div className="flex items-center justify-center lg:flex-col px-3 py-3 lg:py-0">
          <div className="flex-1 border-t lg:border-t-0 lg:border-l border-border/40" />
          <span className="text-[11px] font-medium text-muted/50 uppercase tracking-widest px-3 py-1">
            {t("budgeting_approaches_or")}
          </span>
          <div className="flex-1 border-t lg:border-t-0 lg:border-l border-border/40" />
        </div>

        {/* 6 Accounts Rule */}
        <ApproachCard
          title={t("six_accounts_rule")}
          subtitle={
            <>
              {t("six_accounts_description")}{" "}
              <span className="italic text-muted">
                {t("six_accounts_book")}
              </span>
              .
            </>
          }
          items={sixAccounts}
          disclaimer={t("six_accounts_disclaimer")}
        />
      </div>
    </section>
  );
}
