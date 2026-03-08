"use client";

import React from "react";
import { Category } from "@/data/categories";
import { useTranslations } from "next-intl";
import { ClockIcon } from "@/components/icons";

interface SplitVisualizationProps {
  salary: number;
  categories: Category[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
}

interface PieSlice {
  name: string;
  percentage: number;
  color: string;
  startAngle: number;
  endAngle: number;
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return [
    "M",
    cx,
    cy,
    "L",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function PieChart({
  slices,
  size = 200,
}: {
  slices: PieSlice[];
  size?: number;
}) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;

  const hovered = hoveredIndex !== null ? slices[hoveredIndex] : null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {slices.map((slice, i) => {
        const isHovered = hoveredIndex === i;
        // For slices that are essentially 100%, draw a circle
        if (slice.endAngle - slice.startAngle >= 359.99) {
          return (
            <circle
              key={slice.name}
              cx={cx}
              cy={cy}
              r={r}
              fill={slice.color}
              opacity={hoveredIndex !== null && !isHovered ? 0.45 : 1}
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
            />
          );
        }
        return (
          <path
            key={slice.name}
            d={describeArc(cx, cy, r, slice.startAngle, slice.endAngle)}
            fill={slice.color}
            stroke="var(--color-card)"
            strokeWidth="2"
            opacity={hoveredIndex !== null && !isHovered ? 0.45 : 1}
            className="transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
          />
        );
      })}
      {/* Center hole for donut style */}
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.55}
        fill="var(--color-card)"
        className="transition-all duration-300"
      />
      {/* Center label on hover */}
      {hovered && (
        <>
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            dominantBaseline="auto"
            className="fill-foreground text-[11px] font-medium pointer-events-none"
          >
            {hovered.name}
          </text>
          <text
            x={cx}
            y={cy + 10}
            textAnchor="middle"
            dominantBaseline="auto"
            className="fill-muted text-[11px] font-data pointer-events-none"
          >
            {hovered.percentage}%
          </text>
        </>
      )}
    </svg>
  );
}

export function SplitVisualization({
  salary,
  categories,
}: SplitVisualizationProps) {
  const t = useTranslations();
  const validCategories = categories.filter(
    (c) => c.name && c.percentage > 0 && c.enabled !== false,
  );
  const totalPercentage = validCategories.reduce(
    (sum, c) => sum + c.percentage,
    0,
  );
  const totalAllocatedAmount = validCategories.reduce((sum, cat) => {
    const amount =
      cat.isFixed && cat.fixedAmount != null
        ? cat.fixedAmount
        : (cat.percentage * salary) / 100;
    return sum + amount;
  }, 0);

  if (salary <= 0 || validCategories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted">
        <ClockIcon className="mb-4 opacity-30" />
        <p className="text-sm">{t("empty_state")}</p>
      </div>
    );
  }

  // Build pie slices
  const slices: PieSlice[] = [];
  let currentAngle = 0;
  const effectiveTotal = Math.max(totalPercentage, 100);
  for (const cat of validCategories) {
    const sweep = (cat.percentage / effectiveTotal) * 360;
    slices.push({
      name: cat.name,
      percentage: cat.percentage,
      color: cat.color,
      startAngle: currentAngle,
      endAngle: currentAngle + sweep,
    });
    currentAngle += sweep;
  }
  // Add unallocated slice
  if (totalPercentage < 100) {
    slices.push({
      name: t("unallocated"),
      percentage: 100 - totalPercentage,
      color: "var(--color-border)",
      startAngle: currentAngle,
      endAngle: 360,
    });
  }

  return (
    <div className="space-y-6">
      {/* Pie chart */}
      <PieChart slices={slices} size={200} />

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
        {validCategories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-xs text-muted whitespace-nowrap">
              {cat.name}{" "}
              <span className="font-data text-foreground/70">
                {cat.percentage}%
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-sm font-medium text-muted">
          {t("total_allocated")}
        </span>
        <div className="text-right">
          <span className="text-lg font-semibold font-data">
            {formatCurrency(Math.min(totalAllocatedAmount, salary))}
          </span>
          {totalAllocatedAmount < salary && (
            <p className="text-xs text-muted mt-0.5">
              {formatCurrency(salary - totalAllocatedAmount)} {t("unallocated")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
