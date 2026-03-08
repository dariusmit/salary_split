import { render, screen } from "@testing-library/react";
import { SplitVisualization } from "@/components/split-visualization";
import { Category } from "@/data/categories";
import { IntlWrapper } from "./test-utils";

function renderVisualization(salary: number, categories: Category[]) {
  return render(
    <IntlWrapper>
      <SplitVisualization salary={salary} categories={categories} />
    </IntlWrapper>,
  );
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Rent",
    percentage: 30,
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
    percentage: 15,
    color: "#f59e0b",
    enabled: true,
  },
];

describe("SplitVisualization", () => {
  it("shows empty state when salary is 0", () => {
    renderVisualization(0, mockCategories);
    expect(
      screen.getByText(
        "Enter your salary and set up categories to see the split",
      ),
    ).toBeInTheDocument();
  });

  it("shows empty state when no categories are provided", () => {
    renderVisualization(3000, []);
    expect(
      screen.getByText(
        "Enter your salary and set up categories to see the split",
      ),
    ).toBeInTheDocument();
  });

  it("shows empty state when all categories are disabled", () => {
    const disabled = mockCategories.map((c) => ({ ...c, enabled: false }));
    renderVisualization(3000, disabled);
    expect(
      screen.getByText(
        "Enter your salary and set up categories to see the split",
      ),
    ).toBeInTheDocument();
  });

  it("renders pie chart SVG when data is valid", () => {
    renderVisualization(3000, mockCategories);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders category legend items", () => {
    renderVisualization(3000, mockCategories);
    expect(screen.getByText(/Rent/)).toBeInTheDocument();
    expect(screen.getByText(/Savings/)).toBeInTheDocument();
    expect(screen.getByText(/Food/)).toBeInTheDocument();
  });

  it("shows total allocated label", () => {
    renderVisualization(3000, mockCategories);
    expect(screen.getByText("Total allocated")).toBeInTheDocument();
  });

  it("shows unallocated amount when total percentage < 100", () => {
    renderVisualization(3000, mockCategories); // 30+20+15 = 65%
    expect(screen.getByText(/unallocated/)).toBeInTheDocument();
  });

  it("does not show unallocated when total is 100%", () => {
    const fullCategories: Category[] = [
      {
        id: "1",
        name: "Rent",
        percentage: 50,
        color: "#6366f1",
        enabled: true,
      },
      {
        id: "2",
        name: "Savings",
        percentage: 50,
        color: "#10b981",
        enabled: true,
      },
    ];
    renderVisualization(3000, fullCategories);
    // The "unallocated" text showing amounts should not appear
    const unallocatedElements = screen.queryAllByText(/unallocated/);
    // Only the legend might have it; the amount line should not
    const amountUnallocated = unallocatedElements.filter(
      (el) => el.tagName === "P",
    );
    expect(amountUnallocated).toHaveLength(0);
  });

  it("excludes categories without names", () => {
    const cats: Category[] = [
      { id: "1", name: "", percentage: 50, color: "#6366f1", enabled: true },
      {
        id: "2",
        name: "Savings",
        percentage: 50,
        color: "#10b981",
        enabled: true,
      },
    ];
    renderVisualization(3000, cats);
    // Only "Savings" should appear in legend
    expect(screen.getByText(/Savings/)).toBeInTheDocument();
    expect(screen.queryByText(/50%.*50%/)).not.toBeInTheDocument();
  });
});
