import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HurrIntro from "@/components/level/HurrIntro";
import { useGameStore } from "@/lib/store";

beforeEach(() => {
  useGameStore.setState({
    student: { name: "Hadi", avatarId: 0, companionId: "falcon" },
  });
});

const baseProps = {
  levelId: 1,
  title: "The Sun & Our Star",
  titleAr: "الشمس ونجمنا",
  introText: "Welcome, young explorer!",
  hurrLine: "Yalla, let's go!",
  onContinue: () => {},
};

describe("HurrIntro", () => {
  it("renders the level title", () => {
    render(<HurrIntro {...baseProps} />);
    expect(screen.getByText(/the sun & our star/i)).toBeInTheDocument();
  });

  it("renders the Arabic title", () => {
    render(<HurrIntro {...baseProps} />);
    expect(screen.getByText(/الشمس ونجمنا/)).toBeInTheDocument();
  });

  it("renders Hurr's intro line", () => {
    render(<HurrIntro {...baseProps} />);
    expect(screen.getByText(/yalla, let's go/i)).toBeInTheDocument();
  });

  it("shows the Yalla button", () => {
    render(<HurrIntro {...baseProps} />);
    expect(screen.getByRole("button", { name: /yalla/i })).toBeInTheDocument();
  });

  it("calls onContinue when Yalla button clicked", async () => {
    const onContinue = jest.fn();
    const user = userEvent.setup();
    render(<HurrIntro {...baseProps} onContinue={onContinue} />);
    await user.click(screen.getByRole("button", { name: /yalla/i }));
    expect(onContinue).toHaveBeenCalled();
  });
});
