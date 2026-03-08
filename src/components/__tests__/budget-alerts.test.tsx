import { render, screen } from "@testing-library/react";
import { BudgetAlerts } from "@/components/budget-alerts";
import { Category } from "@/data/categories";
import { IntlWrapper } from "./test-utils";

function renderAlerts(salary: number, categories: Category[]) {
  return render(
    <IntlWrapper>
      <BudgetAlerts salary={salary} categories={categories} />
    </IntlWrapper>,
  );
}

describe("BudgetAlerts", () => {
  it("renders nothing when salary is 0", () => {
    const { container } = renderAlerts(0, [
      {
        id: "1",
        name: "Rent",
        percentage: 50,
        color: "#6366f1",
        enabled: true,
      },
    ]);
    expect(container.innerHTML).toBe("");
  });

  it("renders nothing when no categories are provided", () => {
    const { container } = renderAlerts(3000, []);
    expect(container.innerHTML).toBe("");
  });

  it("renders nothing when all categories are disabled", () => {
    const { container } = renderAlerts(3000, [
      {
        id: "1",
        name: "Rent",
        percentage: 50,
        color: "#6366f1",
        enabled: false,
      },
    ]);
    expect(container.innerHTML).toBe("");
  });

  it("shows warning when housing exceeds 30%", () => {
    renderAlerts(3000, [
      {
        id: "1",
        name: "Rent",
        percentage: 40,
        color: "#6366f1",
        enabled: true,
      },
    ]);
    expect(screen.getByText("Budget Insights")).toBeInTheDocument();
    expect(screen.getByText(/Rent/)).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("shows warning when savings is below 20%", () => {
    renderAlerts(3000, [
      {
        id: "1",
        name: "Savings",
        percentage: 10,
        color: "#10b981",
        enabled: true,
      },
    ]);
    expect(screen.getByText("Budget Insights")).toBeInTheDocument();
    expect(screen.getByText(/Savings/)).toBeInTheDocument();
  });

  it("shows warning when food exceeds 15%", () => {
    renderAlerts(3000, [
      {
        id: "1",
        name: "Food",
        percentage: 25,
        color: "#f59e0b",
        enabled: true,
      },
    ]);
    expect(screen.getByText("Budget Insights")).toBeInTheDocument();
    expect(screen.getAllByText(/Food/).length).toBeGreaterThanOrEqual(1);
  });

  it("shows warning when transport exceeds 15%", () => {
    renderAlerts(3000, [
      {
        id: "1",
        name: "Transport",
        percentage: 20,
        color: "#3b82f6",
        enabled: true,
      },
    ]);
    expect(screen.getByText("Budget Insights")).toBeInTheDocument();
    expect(screen.getAllByText(/Transport/).length).toBeGreaterThanOrEqual(1);
  });

  it("shows all-good message when categories are within guidelines", () => {
    renderAlerts(3000, [
      {
        id: "1",
        name: "Rent",
        percentage: 25,
        color: "#6366f1",
        enabled: true,
      },
      {
        id: "2",
        name: "Savings",
        percentage: 20,
        color: "#10b981",
        enabled: true,
      },
      {
        id: "3",
        name: "Food",
        percentage: 12,
        color: "#f59e0b",
        enabled: true,
      },
    ]);
    expect(
      screen.getByText(
        /Looking good! Your spending is within recommended guidelines/,
      ),
    ).toBeInTheDocument();
  });

  it("shows alert count for multiple warnings", () => {
    renderAlerts(3000, [
      {
        id: "1",
        name: "Rent",
        percentage: 40,
        color: "#6366f1",
        enabled: true,
      },
      {
        id: "2",
        name: "Savings",
        percentage: 10,
        color: "#10b981",
        enabled: true,
      },
    ]);
    // The count "2 alerts" is in a single span with whitespace
    expect(screen.getByText(/2\s+alerts/)).toBeInTheDocument();
  });

  it("shows singular alert count for single warning", () => {
    renderAlerts(3000, [
      {
        id: "1",
        name: "Rent",
        percentage: 40,
        color: "#6366f1",
        enabled: true,
      },
    ]);
    expect(screen.getByText(/1\s+alert$/)).toBeInTheDocument();
  });

  it("renders nothing for unrecognized category names", () => {
    const { container } = renderAlerts(3000, [
      {
        id: "1",
        name: "CustomThing",
        percentage: 50,
        color: "#6366f1",
        enabled: true,
      },
    ]);
    expect(container.innerHTML).toBe("");
  });

  it("shows disclaimer text when alerts are present", () => {
    renderAlerts(3000, [
      {
        id: "1",
        name: "Rent",
        percentage: 50,
        color: "#6366f1",
        enabled: true,
      },
    ]);
    expect(screen.getByText(/general guidelines/)).toBeInTheDocument();
  });
});
