import { render } from "@testing-library/react";
import BadgeIcon from "@/components/ui/BadgeIcon";

describe("BadgeIcon", () => {
  it("renders an SVG for level 1 (Sun)", () => {
    const { container } = render(<BadgeIcon levelId={1} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders a different SVG per level", () => {
    const html1 = render(<BadgeIcon levelId={1} />).container.innerHTML;
    const html6 = render(<BadgeIcon levelId={6} />).container.innerHTML;
    expect(html1).not.toBe(html6);
  });

  it("renders for all 6 levels without throwing", () => {
    for (let id = 1; id <= 6; id++) {
      const { container } = render(<BadgeIcon levelId={id} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    }
  });

  it("falls back to default icon for unknown level", () => {
    const { container } = render(<BadgeIcon levelId={999} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BadgeIcon levelId={1} className="custom-class" />);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain("custom-class");
  });

  it("uses dimmed colors when locked", () => {
    const unlockedHtml = render(<BadgeIcon levelId={1} unlocked={true} />).container.innerHTML;
    const lockedHtml = render(<BadgeIcon levelId={1} unlocked={false} />).container.innerHTML;
    expect(unlockedHtml).not.toBe(lockedHtml);
  });
});
