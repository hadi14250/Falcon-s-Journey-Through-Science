import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Badge from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders the badge name", () => {
    render(<Badge name="Sun Seeker" levelId={1} unlocked />);
    expect(screen.getByText("Sun Seeker")).toBeInTheDocument();
  });

  it("renders the Arabic name when provided", () => {
    render(<Badge name="Sun Seeker" nameAr="مستكشف الشمس" levelId={1} unlocked />);
    expect(screen.getByText("مستكشف الشمس")).toBeInTheDocument();
  });

  it("shows the level number", () => {
    render(<Badge name="Hope Pioneer" levelId={6} unlocked />);
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("calls onClick when clicked and unlocked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Badge name="X" levelId={1} unlocked onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onClick when locked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Badge name="X" levelId={1} unlocked={false} onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("uses 'Locked badge' aria-label when locked", () => {
    render(<Badge name="Mystery" levelId={1} unlocked={false} />);
    expect(screen.getByRole("button", { name: /locked badge/i })).toBeInTheDocument();
  });

  it("applies custom gradient and accent when provided", () => {
    const { container } = render(
      <Badge name="X" levelId={1} unlocked gradient={["#FF0000", "#0000FF"]} accent="#00FF00" />
    );
    // The badge circle uses inline style with linear-gradient
    const html = container.innerHTML;
    expect(html).toContain("#FF0000");
    expect(html).toContain("#0000FF");
  });
});
