import { render, screen, fireEvent } from "@testing-library/react";
import { SalaryInput } from "@/components/salary-input";
import { IntlWrapper } from "./test-utils";

function renderSalaryInput(props?: Partial<Parameters<typeof SalaryInput>[0]>) {
  const defaultProps = {
    onSalaryChange: jest.fn(),
    currentSalary: 0,
    ...props,
  };
  return {
    ...render(
      <IntlWrapper>
        <SalaryInput {...defaultProps} />
      </IntlWrapper>,
    ),
    onSalaryChange: defaultProps.onSalaryChange,
  };
}

describe("SalaryInput", () => {
  it("renders with the label", () => {
    renderSalaryInput();
    expect(screen.getByLabelText("Monthly Income")).toBeInTheDocument();
  });

  it("renders the euro symbol", () => {
    renderSalaryInput();
    expect(screen.getByText("€")).toBeInTheDocument();
  });

  it("shows current salary as initial value", () => {
    renderSalaryInput({ currentSalary: 2500 });
    const input = screen.getByLabelText("Monthly Income") as HTMLInputElement;
    expect(input.value).toBe("2500");
  });

  it("shows empty input when salary is 0", () => {
    renderSalaryInput({ currentSalary: 0 });
    const input = screen.getByLabelText("Monthly Income") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("calls onSalaryChange when user types a valid number", () => {
    const { onSalaryChange } = renderSalaryInput();
    const input = screen.getByLabelText("Monthly Income");

    fireEvent.change(input, { target: { value: "3000" } });

    expect(onSalaryChange).toHaveBeenCalledWith(3000);
  });

  it("does not call onSalaryChange for invalid input", () => {
    const { onSalaryChange } = renderSalaryInput();
    const input = screen.getByLabelText("Monthly Income");

    fireEvent.change(input, { target: { value: "abc" } });

    expect(onSalaryChange).not.toHaveBeenCalled();
  });

  it("has placeholder text", () => {
    renderSalaryInput();
    const input = screen.getByPlaceholderText("0.00");
    expect(input).toBeInTheDocument();
  });
});
