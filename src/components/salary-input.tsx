"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

interface SalaryInputProps {
  onSalaryChange: (salary: number) => void;
  currentSalary: number;
}

interface FormValues {
  salary: string;
}

export function SalaryInput({
  onSalaryChange,
  currentSalary,
}: SalaryInputProps) {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      salary: currentSalary > 0 ? currentSalary.toString() : "",
    },
  });

  // Sync form when currentSalary changes externally (e.g. localStorage hydration)
  useEffect(() => {
    reset({ salary: currentSalary > 0 ? currentSalary.toString() : "" });
  }, [currentSalary, reset]);

  const onSubmit = (data: FormValues) => {
    onSalaryChange(parseFloat(data.salary));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <label
        htmlFor="salary"
        className="block text-sm font-medium text-muted mb-2"
      >
        {t("monthly_salary")}
      </label>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg">
            €
          </span>
          <input
            id="salary"
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground text-lg font-data placeholder:text-muted/40 transition-all focus:border-accent focus:ring-1 focus:ring-accent"
            {...register("salary", {
              required: t("enter_your_salary"),
              validate: (v) => {
                const n = parseFloat(v);
                if (isNaN(n) || n <= 0) return t("must_be_greater_than_zero");
                if (!/^\d+(\.\d{1,2})?$/.test(v))
                  return t("enter_valid_amount");
                return true;
              },
            })}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || /^\d*\.?\d*$/.test(val)) {
                register("salary").onChange(e);
                const num = parseFloat(val);
                if (!isNaN(num) && num > 0) {
                  onSalaryChange(num);
                }
              }
            }}
          />
        </div>
      </div>
      {errors.salary && (
        <p className="mt-2 text-sm text-danger">{errors.salary.message}</p>
      )}
    </form>
  );
}
