import { render } from "@testing-library/react";
import Companion from "@/components/mascot/Companion";
import { useGameStore } from "@/lib/store";

describe("Companion wrapper (static SVG variant)", () => {
  it("renders an <img> for the chosen companion", () => {
    useGameStore.setState({
      student: { name: "", avatarId: 0, companionId: "camel" },
      equipped: { human: null, companion: null },
    });
    const { container } = render(<Companion />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img!.getAttribute("src")).toBe("/companions/plain/camel.svg");
  });

  it("swaps to the ghutra variant when companion item is equipped", () => {
    useGameStore.setState({
      student: { name: "", avatarId: 0, companionId: "camel" },
      equipped: { human: null, companion: "ghutra" },
    });
    const { container } = render(<Companion />);
    const img = container.querySelector("img");
    expect(img!.getAttribute("src")).toBe("/companions/ghutra/camel.svg");
  });

  it("swaps to the collar variant when collar is equipped", () => {
    useGameStore.setState({
      student: { name: "", avatarId: 0, companionId: "camel" },
      equipped: { human: null, companion: "collar" },
    });
    const { container } = render(<Companion />);
    const img = container.querySelector("img");
    expect(img!.getAttribute("src")).toBe("/companions/collar/camel.svg");
  });

  it("renders without throwing for any companion id", () => {
    useGameStore.setState({
      student: { name: "", avatarId: 0, companionId: "unknown-id" },
      equipped: { human: null, companion: null },
    });
    expect(() => render(<Companion />)).not.toThrow();
  });
});
