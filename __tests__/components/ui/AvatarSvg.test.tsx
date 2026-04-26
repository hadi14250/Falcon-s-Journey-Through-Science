import { render } from "@testing-library/react";
import AvatarSvg from "@/components/ui/AvatarSvg";
import { useGameStore } from "@/lib/store";

describe("AvatarSvg", () => {
  beforeEach(() => {
    useGameStore.setState({
      equipped: { human: null, companion: null },
    });
  });

  it("renders an <img> for avatar 0 (legacy plain)", () => {
    const { container } = render(<AvatarSvg avatarId={0} />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute("src")).toMatch(/^\/avatars\/0\.svg/);
  });

  it("renders all 4 legacy avatars with the right src", () => {
    for (let id = 0; id < 4; id++) {
      const { container } = render(<AvatarSvg avatarId={id} />);
      const img = container.querySelector("img");
      expect(img?.getAttribute("src")).toMatch(new RegExp(`^/avatars/${id}\\.svg`));
    }
  });

  it("renders different src per avatar", () => {
    const a = render(<AvatarSvg avatarId={0} />).container.querySelector("img")?.getAttribute("src");
    const b = render(<AvatarSvg avatarId={3} />).container.querySelector("img")?.getAttribute("src");
    expect(a).not.toBe(b);
  });

  it("falls back gracefully for invalid avatarId", () => {
    expect(() => render(<AvatarSvg avatarId={999} />)).not.toThrow();
    const { container } = render(<AvatarSvg avatarId={999} />);
    expect(container.querySelector("img")?.getAttribute("src")).toMatch(/^\/avatars\/0\.svg/);
  });

  it("swaps to flag variant for legacy avatars when uae-flag is equipped", () => {
    useGameStore.setState({
      equipped: { human: "uae-flag", companion: null },
    });
    const { container } = render(<AvatarSvg avatarId={0} />);
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toMatch(/^\/avatars\/0-flag\.svg/);
  });

  it("ignoreEquipped renders the plain variant even when an item is equipped", () => {
    useGameStore.setState({
      equipped: { human: "uae-flag", companion: null },
    });
    const { container } = render(<AvatarSvg avatarId={0} ignoreEquipped />);
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toMatch(/^\/avatars\/0\.svg/);
  });
});
