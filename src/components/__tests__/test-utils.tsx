import { ReactNode } from "react";

/**
 * Wrapper for tests. next-intl is globally mocked via moduleNameMapper,
 * so no real IntlProvider is needed.
 */
export function IntlWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
