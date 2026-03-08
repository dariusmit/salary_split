import React, { type ReactNode } from "react";
import en from "@/locales/en.json";

const messages: Record<string, string> = en;

/**
 * Mock useTranslations that resolves keys from the EN locale JSON.
 * Supports ICU-style `{var}` placeholders.
 */
export function useTranslations() {
  return function t(key: string, values?: Record<string, string | number>) {
    let message = messages[key] ?? key;
    if (values) {
      for (const [k, v] of Object.entries(values)) {
        message = message.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return message;
  };
}

export function useFormatter() {
  return {
    number: (value: number) => String(value),
    dateTime: (value: Date) => value.toISOString(),
  };
}

export function useLocale() {
  return "en";
}

export function useMessages() {
  return messages;
}

export function useNow() {
  return new Date();
}

export function useTimeZone() {
  return "UTC";
}

export function NextIntlClientProvider({
  children,
}: {
  children: ReactNode;
  locale?: string;
  messages?: Record<string, string>;
}) {
  return <>{children}</>;
}
