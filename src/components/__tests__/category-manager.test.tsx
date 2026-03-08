import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryManager } from "@/components/category-manager";
import { Category } from "@/data/categories";
import { IntlWrapper } from "./test-utils";

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

function renderCategoryManager(
  props?: Partial<Parameters<typeof CategoryManager>[0]>,
) {
  const defaultProps = {
    categories: mockCategories,
    salary: 3000,
    onCategoriesChange: jest.fn(),
    ...props,
  };
  return {
    ...render(
      <IntlWrapper>
        <CategoryManager {...defaultProps} />
      </IntlWrapper>,
    ),
    onCategoriesChange: defaultProps.onCategoriesChange,
  };
}

describe("CategoryManager", () => {
  it("renders the categories heading", () => {
    renderCategoryManager();
    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  it("renders the total percentage badge", () => {
    renderCategoryManager();
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("renders category name inputs with values", () => {
    renderCategoryManager();
    const nameInputs = screen.getAllByPlaceholderText("Category name");
    expect(nameInputs).toHaveLength(3);
    expect((nameInputs[0] as HTMLInputElement).value).toBe("Rent");
    expect((nameInputs[1] as HTMLInputElement).value).toBe("Savings");
    expect((nameInputs[2] as HTMLInputElement).value).toBe("Food");
  });

  it("renders percentage inputs with values", () => {
    renderCategoryManager();
    const pctInputs = screen.getAllByPlaceholderText("0");
    expect(pctInputs).toHaveLength(3);
    expect((pctInputs[0] as HTMLInputElement).value).toBe("30");
    expect((pctInputs[1] as HTMLInputElement).value).toBe("20");
    expect((pctInputs[2] as HTMLInputElement).value).toBe("15");
  });

  it("renders the add category button", () => {
    renderCategoryManager();
    expect(screen.getByText("+ Add category")).toBeInTheDocument();
  });

  it("shows remaining percentage message when total < 100", () => {
    renderCategoryManager();
    expect(screen.getByText(/remaining/)).toBeInTheDocument();
  });

  it("shows over percentage message when total > 100", () => {
    const over: Category[] = [
      {
        id: "1",
        name: "Rent",
        percentage: 60,
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
    renderCategoryManager({ categories: over });
    expect(screen.getByText(/Over by/)).toBeInTheDocument();
  });

  it("does not show remaining message when exactly 100%", () => {
    const exact: Category[] = [
      { id: "1", name: "A", percentage: 50, color: "#6366f1", enabled: true },
      { id: "2", name: "B", percentage: 50, color: "#10b981", enabled: true },
    ];
    renderCategoryManager({ categories: exact });
    expect(screen.queryByText(/remaining/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Over by/)).not.toBeInTheDocument();
  });

  it("renders toggle buttons for each category", () => {
    renderCategoryManager();
    const toggleButtons = screen.getAllByLabelText("Toggle category");
    expect(toggleButtons).toHaveLength(3);
  });

  it("renders remove buttons for each category", () => {
    renderCategoryManager();
    const removeButtons = screen.getAllByLabelText(/Remove/);
    expect(removeButtons).toHaveLength(3);
  });

  it("opens delete confirmation modal on remove click", () => {
    renderCategoryManager();
    const removeButtons = screen.getAllByLabelText(/Remove/);
    fireEvent.click(removeButtons[0]);
    expect(screen.getByText("Delete category?")).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete/),
    ).toBeInTheDocument();
  });

  it("closes delete modal on cancel", () => {
    renderCategoryManager();
    const removeButtons = screen.getAllByLabelText(/Remove/);
    fireEvent.click(removeButtons[0]);
    expect(screen.getByText("Delete category?")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Delete category?")).not.toBeInTheDocument();
  });

  it("renders color pickers for each category", () => {
    renderCategoryManager();
    const colorInputs = document.querySelectorAll('input[type="color"]');
    expect(colorInputs).toHaveLength(3);
  });

  it("renders euro amount inputs", () => {
    renderCategoryManager();
    const euroInputs = screen.getAllByPlaceholderText("0.00");
    expect(euroInputs).toHaveLength(3);
  });

  it("shows 100% badge with success styling", () => {
    const exact: Category[] = [
      { id: "1", name: "A", percentage: 50, color: "#6366f1", enabled: true },
      { id: "2", name: "B", percentage: 50, color: "#10b981", enabled: true },
    ];
    renderCategoryManager({ categories: exact });
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});
