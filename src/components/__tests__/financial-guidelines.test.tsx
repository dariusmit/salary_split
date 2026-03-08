import { render, screen } from "@testing-library/react";
import { FinancialGuidelines } from "@/components/financial-guidelines";
import { IntlWrapper } from "./test-utils";

function renderGuidelines() {
  return render(
    <IntlWrapper>
      <FinancialGuidelines />
    </IntlWrapper>,
  );
}

describe("FinancialGuidelines", () => {
  it("renders the section heading", () => {
    renderGuidelines();
    expect(screen.getByText("Popular Budgeting Methods")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderGuidelines();
    expect(screen.getByText(/Two widely used frameworks/)).toBeInTheDocument();
  });

  it("renders the 50/30/20 rule card", () => {
    renderGuidelines();
    expect(screen.getByText("50 / 30 / 20 Rule")).toBeInTheDocument();
  });

  it("renders the 6 Accounts rule card", () => {
    renderGuidelines();
    expect(screen.getByText("6 Accounts Rule")).toBeInTheDocument();
  });

  it("renders the 'or' divider", () => {
    renderGuidelines();
    expect(screen.getByText("or")).toBeInTheDocument();
  });

  it("renders 50/30/20 guideline categories", () => {
    renderGuidelines();
    expect(screen.getByText("Housing / Rent")).toBeInTheDocument();
    expect(screen.getByText("Savings & Investments")).toBeInTheDocument();
    expect(screen.getByText("Food & Groceries")).toBeInTheDocument();
    expect(screen.getByText("Transportation")).toBeInTheDocument();
    expect(screen.getByText("Utilities & Bills")).toBeInTheDocument();
    expect(screen.getByText("Entertainment / Fun")).toBeInTheDocument();
    expect(screen.getByText("Emergency Fund")).toBeInTheDocument();
  });

  it("renders 6 Accounts categories", () => {
    renderGuidelines();
    expect(screen.getByText("Necessities")).toBeInTheDocument();
    expect(screen.getByText("Financial Freedom")).toBeInTheDocument();
    expect(screen.getByText("Long-term Savings")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Play")).toBeInTheDocument();
    expect(screen.getByText("Give")).toBeInTheDocument();
  });

  it("renders recommended percentages", () => {
    renderGuidelines();
    expect(screen.getByText("25 – 30%")).toBeInTheDocument();
    expect(screen.getByText("20%+")).toBeInTheDocument();
    expect(screen.getAllByText("10 – 15%")).toHaveLength(2); // Food + Transport
    expect(screen.getAllByText("5 – 10%")).toHaveLength(2); // Utilities + Entertainment
  });

  it("renders 6 Accounts percentages", () => {
    renderGuidelines();
    expect(screen.getByText("55%")).toBeInTheDocument();
    expect(screen.getAllByText("10%")).toHaveLength(4); // Freedom, Long-term, Education, Play
    expect(screen.getByText("5%")).toBeInTheDocument(); // Give
  });

  it("renders disclaimer text for both cards", () => {
    renderGuidelines();
    expect(
      screen.getByText(/These are general guidelines/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The percentages above total 100%/),
    ).toBeInTheDocument();
  });

  it("renders notes for guideline items", () => {
    renderGuidelines();
    expect(screen.getByText(/Includes rent or mortgage/)).toBeInTheDocument();
    expect(screen.getByText(/Pay yourself first/)).toBeInTheDocument();
  });
});
