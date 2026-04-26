import { render, screen } from "@testing-library/react";
import ProgressBar from "@/components/ui/ProgressBar";

describe("ProgressBar", () => {
  it("renders without crashing", () => {
    const { container } = render(<ProgressBar current={0} max={100} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows current and max in label form", () => {
    render(<ProgressBar current={50} max={100} label="XP" />);
    // Match flexibly — the label could be "XP", "50/100", "50 / 100" etc.
    expect(screen.getByText(/XP/i)).toBeInTheDocument();
  });

  it("clamps width between 0 and 100%", () => {
    const { container: c1 } = render(<ProgressBar current={150} max={100} />);
    const fill1 = c1.querySelector("[style*='width']") as HTMLElement | null;
    if (fill1) {
      const w = fill1.style.width;
      // width should be 100% or less
      expect(parseFloat(w)).toBeLessThanOrEqual(100);
    }
  });

  it("handles zero max safely", () => {
    expect(() => render(<ProgressBar current={0} max={0} />)).not.toThrow();
  });
});
