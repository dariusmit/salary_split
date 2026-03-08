import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/components/language-provider";

function LanguageConsumer() {
  const { locale, setLocale } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale("lt")}>Switch to LT</button>
      <button onClick={() => setLocale("en")}>Switch to EN</button>
    </div>
  );
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to English locale", () => {
    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
  });

  it("switches locale when setLocale is called", () => {
    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>,
    );

    act(() => {
      screen.getByText("Switch to LT").click();
    });

    expect(screen.getByTestId("locale")).toHaveTextContent("lt");
  });

  it("persists locale to localStorage", () => {
    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>,
    );

    act(() => {
      screen.getByText("Switch to LT").click();
    });

    expect(localStorage.getItem("salary-splitter-lang")).toBe("lt");
  });

  it("restores locale from localStorage on mount", () => {
    localStorage.setItem("salary-splitter-lang", "lt");

    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>,
    );

    // useEffect runs after render, so locale should update
    expect(screen.getByTestId("locale")).toHaveTextContent("lt");
  });

  it("renders children with intl context", () => {
    render(
      <LanguageProvider>
        <span>Child content</span>
      </LanguageProvider>,
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
