"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Category, CATEGORY_COLORS } from "@/data/categories";
import { useState, useEffect, useRef, type DragEvent } from "react";
import { useTranslations } from "next-intl";
import {
  DragHandleIcon,
  InfoCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  CloseIcon,
} from "@/components/icons";

function AmountInput({
  salary,
  percentage,
  disabled,
  isFixed,
  fixedAmount,
  onAmountCommit,
}: {
  salary: number;
  percentage: number;
  disabled: boolean;
  isFixed?: boolean;
  fixedAmount?: number;
  onAmountCommit: (amount: number) => void;
}) {
  const computed = isFixed
    ? fixedAmount && fixedAmount > 0
      ? fixedAmount.toString()
      : ""
    : salary > 0
      ? (Math.round(((percentage * salary) / 100) * 100) / 100).toString()
      : "";
  const [localValue, setLocalValue] = useState(computed);
  const isFocused = useRef(false);

  // Sync from percentage when not focused
  useEffect(() => {
    if (!isFocused.current) {
      setLocalValue(computed);
    }
  }, [computed]);

  return (
    <div className="relative w-24 shrink-0">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted">
        €
      </span>
      <input
        type="text"
        inputMode="decimal"
        placeholder="0.00"
        disabled={disabled}
        className="w-full pl-7 pr-2 py-2 bg-card border border-border rounded-lg text-sm font-data text-foreground placeholder:text-muted/40 transition-colors focus:border-accent disabled:opacity-40 disabled:cursor-not-allowed"
        value={localValue}
        onFocus={(e) => {
          isFocused.current = true;
          e.target.select();
        }}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "" || /^\d*\.?\d*$/.test(val)) {
            setLocalValue(val);
          }
        }}
        onBlur={(e) => {
          isFocused.current = false;
          const amount = parseFloat(e.target.value);
          if (!isNaN(amount) && (isFixed || salary > 0)) {
            onAmountCommit(amount);
          } else {
            setLocalValue(computed);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
    </div>
  );
}

interface CategoryManagerProps {
  categories: Category[];
  salary: number;
  onCategoriesChange: (categories: Category[]) => void;
}

interface FormValues {
  categories: Category[];
}

export function CategoryManager({
  categories,
  salary,
  onCategoriesChange,
}: CategoryManagerProps) {
  const t = useTranslations();
  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: { categories },
    mode: "onChange",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "categories",
  });

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [expandedNote, setExpandedNote] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Needed for Firefox
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overIndex !== index) setOverIndex(index);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== index) {
      move(dragIndex, index);
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const watchedCategories = watch("categories");
  const totalPercentageRaw =
    watchedCategories?.reduce(
      (sum, cat) =>
        cat.enabled !== false ? sum + (Number(cat.percentage) || 0) : sum,
      0,
    ) ?? 0;
  const totalPercentage = Math.round(totalPercentageRaw * 100) / 100;

  // Re-compute percentage for fixed-amount categories when salary changes
  const prevSalaryRef = useRef(salary);
  useEffect(() => {
    if (salary !== prevSalaryRef.current && salary > 0) {
      watchedCategories?.forEach((cat, index) => {
        if (cat?.isFixed && cat.fixedAmount != null && cat.fixedAmount > 0) {
          const newPct = Math.round((cat.fixedAmount / salary) * 10000) / 100;
          setValue(`categories.${index}.percentage`, newPct);
        }
      });
    }
    prevSalaryRef.current = salary;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salary]);

  // Reliably sync form → parent using watch subscription (fires on every change)
  useEffect(() => {
    const subscription = watch((formValues) => {
      if (formValues.categories) {
        onCategoriesChange(
          formValues.categories
            .filter((cat): cat is Category => cat != null)
            .map((cat) => ({
              ...cat,
              percentage: Number(cat.percentage) || 0,
            })),
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onCategoriesChange]);

  const addCategory = () => {
    const nextColor = CATEGORY_COLORS[fields.length % CATEGORY_COLORS.length];
    append({
      id: crypto.randomUUID(),
      name: "",
      percentage: 0,
      color: nextColor,
      description: "",
      enabled: true,
      isFixed: false,
      fixedAmount: 0,
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-muted">{t("categories")}</h2>
        <span
          className={`text-xs font-data px-2 py-1 rounded-lg ${
            totalPercentage === 100
              ? "bg-success/15 text-success"
              : totalPercentage > 100
                ? "bg-danger/15 text-danger"
                : "bg-warning/15 text-warning"
          }`}
        >
          {totalPercentage}%
        </span>
      </div>

      <div className="space-y-3 sm:space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex flex-wrap items-center gap-2 group w-full transition-all rounded-lg ${
              dragIndex === index
                ? "opacity-40"
                : overIndex === index && dragIndex !== null
                  ? "ring-2 ring-accent/50 ring-offset-1 ring-offset-background"
                  : ""
            } ${watchedCategories?.[index]?.enabled === false ? "opacity-45" : ""}`}
          >
            {/* Drag handle */}
            <div className="cursor-grab active:cursor-grabbing shrink-0 text-muted/40 hover:text-muted transition-colors">
              <DragHandleIcon />
            </div>
            <input
              type="color"
              className="w-7 h-7 rounded-full border-0 cursor-pointer shrink-0 bg-transparent appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0"
              {...register(`categories.${index}.color`)}
            />
            <input
              type="text"
              spellCheck={false}
              placeholder={t("category_name")}
              className={`flex-1 min-w-0 px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted/40 transition-colors focus:border-accent ${watchedCategories?.[index]?.enabled === false ? "text-muted" : ""}`}
              {...register(`categories.${index}.name`, {
                required: t("name_required"),
              })}
            />
            {/* Enable/disable toggle */}
            <button
              type="button"
              onClick={() => {
                const current = watchedCategories?.[index]?.enabled !== false;
                setValue(`categories.${index}.enabled`, !current);
              }}
              className="shrink-0 cursor-pointer"
              aria-label={t("toggle_category")}
              title={
                watchedCategories?.[index]?.enabled === false
                  ? t("category_disabled")
                  : t("toggle_category")
              }
            >
              <div
                className={`relative w-8 h-[18px] rounded-full transition-colors duration-200 ${
                  watchedCategories?.[index]?.enabled !== false
                    ? "bg-accent"
                    : "bg-border"
                }`}
              >
                <div
                  className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    watchedCategories?.[index]?.enabled !== false
                      ? "translate-x-[16px]"
                      : "translate-x-[2px]"
                  }`}
                />
              </div>
            </button>
            {/* Note toggle button */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() =>
                  setExpandedNote(expandedNote === index ? null : index)
                }
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  watchedCategories?.[index]?.description
                    ? "text-accent"
                    : "text-muted/40 hover:text-muted"
                }`}
                aria-label={t("add_note")}
                title={
                  watchedCategories?.[index]?.description || t("note_tooltip")
                }
              >
                <InfoCircleIcon />
              </button>
            </div>
            {/* Amount + percentage: wrap to second line on mobile */}
            <div className="flex items-center gap-2 w-full sm:w-auto pl-9 sm:pl-0">
              {/* Fixed amount toggle */}
              <button
                type="button"
                onClick={() => {
                  const cat = watchedCategories?.[index];
                  if (!cat) return;
                  if (cat.isFixed) {
                    setValue(`categories.${index}.isFixed`, false);
                  } else {
                    const amount =
                      salary > 0
                        ? Math.round(((cat.percentage * salary) / 100) * 100) /
                          100
                        : 0;
                    setValue(`categories.${index}.isFixed`, true);
                    setValue(`categories.${index}.fixedAmount`, amount);
                  }
                }}
                className={`shrink-0 p-1.5 rounded-md transition-colors cursor-pointer ${
                  watchedCategories?.[index]?.isFixed
                    ? "text-accent"
                    : "text-muted/40 hover:text-muted"
                }`}
                aria-label={t("toggle_fixed")}
                title={
                  watchedCategories?.[index]?.isFixed
                    ? t("fixed_tooltip")
                    : t("percentage_tooltip")
                }
              >
                {watchedCategories?.[index]?.isFixed ? (
                  <LockClosedIcon />
                ) : (
                  <LockOpenIcon />
                )}
              </button>
              <AmountInput
                salary={salary}
                percentage={watchedCategories?.[index]?.percentage ?? 0}
                disabled={!watchedCategories?.[index]?.isFixed && salary <= 0}
                isFixed={watchedCategories?.[index]?.isFixed}
                fixedAmount={watchedCategories?.[index]?.fixedAmount}
                onAmountCommit={(amount) => {
                  if (watchedCategories?.[index]?.isFixed) {
                    setValue(`categories.${index}.fixedAmount`, amount);
                    if (salary > 0) {
                      const pct = Math.round((amount / salary) * 10000) / 100;
                      setValue(`categories.${index}.percentage`, pct);
                    }
                  } else {
                    const pct = Math.round((amount / salary) * 10000) / 100;
                    setValue(
                      `categories.${index}.percentage`,
                      Math.min(pct, 100),
                    );
                  }
                }}
              />
              <div className="relative w-24 shrink-0">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  readOnly={watchedCategories?.[index]?.isFixed}
                  className={`w-full px-3 py-2 pr-7 bg-card border border-border rounded-lg text-sm font-data text-foreground placeholder:text-muted/40 transition-colors focus:border-accent ${
                    watchedCategories?.[index]?.isFixed
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  {...register(`categories.${index}.percentage`, {
                    required: true,
                    setValueAs: (v: string) => {
                      const n = parseFloat(v);
                      return isNaN(n) ? 0 : Math.min(Math.max(n, 0), 100);
                    },
                  })}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
                  %
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDeleteIndex(index)}
              className="w-6 shrink-0 p-1.5 text-muted hover:text-danger sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer"
              aria-label={`${t("remove")} ${field.name || t("category_name")}`}
            >
              <CloseIcon />
            </button>

            {errors.categories?.[index]?.name && (
              <span className="sr-only">
                {errors.categories[index].name?.message}
              </span>
            )}

            {/* Expandable description input — aligned under name + info icon */}
            {expandedNote === index && (
              <div className="flex w-full items-center gap-2">
                {/* Spacer to match drag handle + color picker width */}
                <div className="w-[calc(16px+0.5rem+28px)] shrink-0" />
                <input
                  type="text"
                  placeholder={t("description_placeholder")}
                  className="flex-1 min-w-0 px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-muted placeholder:text-muted/30 transition-colors focus:border-accent focus:text-foreground"
                  {...register(`categories.${index}.description`)}
                />
                {/* Spacer to match delete button width so description aligns with percentage field */}
                <div className="w-6 shrink-0" />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addCategory}
        className="mt-3 w-full py-2.5 border border-dashed border-border rounded-xl text-sm text-muted hover:text-accent hover:border-accent transition-colors cursor-pointer"
      >
        {t("add_category")}
      </button>

      {totalPercentage !== 100 && totalPercentage > 0 && (
        <p
          className={`mt-3 text-xs ${
            totalPercentage > 100 ? "text-danger" : "text-warning"
          }`}
        >
          {totalPercentage > 100
            ? t("over_by", {
                pct: Math.round((totalPercentage - 100) * 100) / 100,
              })
            : t("remaining", {
                pct: Math.round((100 - totalPercentage) * 100) / 100,
              })}
        </p>
      )}

      {/* Delete confirmation modal */}
      {deleteIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setDeleteIndex(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl shadow-xl p-6 mx-4 max-w-sm w-full space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-foreground">
              {t("delete_confirm_title")}
            </h3>
            <p className="text-xs text-muted">
              {t("delete_confirm_message", {
                name:
                  watchedCategories?.[deleteIndex]?.name || t("category_name"),
              })}
            </p>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setDeleteIndex(null)}
                className="px-4 py-2 text-sm rounded-lg border border-border text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={() => {
                  remove(deleteIndex);
                  setDeleteIndex(null);
                }}
                className="px-4 py-2 text-sm rounded-lg bg-danger text-white hover:bg-danger/90 transition-colors cursor-pointer"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
