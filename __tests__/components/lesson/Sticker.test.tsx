import { render } from "@testing-library/react";
import Sticker, { type StickerName } from "@/components/lesson/Sticker";

describe("Sticker", () => {
  const names: StickerName[] = [
    "sun",
    "earth",
    "moon",
    "mars",
    "jupiter",
    "saturn",
    "asteroid",
    "hope-probe",
    "uae-astronaut",
    "mars-city",
    "rocket",
    "uae-flag",
    "dallah",
    "ghaf-tree",
  ];

  it("renders every sticker name without crashing", () => {
    for (const name of names) {
      const { container, unmount } = render(<Sticker name={name} size={120} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      unmount();
    }
  });

  it("respects custom size", () => {
    const { container } = render(<Sticker name="sun" size={300} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe("300px");
    expect(wrapper.style.height).toBe("300px");
  });
});
