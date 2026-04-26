import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LearningCards from "@/components/level/LearningCards";
import type { LearningCard } from "@/data/levels";
import { useGameStore } from "@/lib/store";

const sampleCards: LearningCard[] = [
  {
    title: "What is the Sun?",
    body: "The Sun is a star.",
    funFact: "The Sun is huge.",
    illustration: "sun-glow",
  },
  {
    title: "How Hot is the Sun?",
    body: "Very hot indeed.",
    funFact: "5,500 degrees C.",
    illustration: "sun-temperature",
  },
];

beforeEach(() => {
  useGameStore.setState({
    student: { name: "Hadi", avatarId: 0, companionId: "falcon" },
    soundEnabled: true,
  });
});

describe("LearningCards", () => {
  it("renders the first card", () => {
    render(<LearningCards cards={sampleCards} onComplete={() => {}} />);
    expect(screen.getByText("What is the Sun?")).toBeInTheDocument();
    expect(screen.getByText(/the sun is a star/i)).toBeInTheDocument();
  });

  it("shows the fun fact", () => {
    render(<LearningCards cards={sampleCards} onComplete={() => {}} />);
    expect(screen.getByText(/the sun is huge/i)).toBeInTheDocument();
  });

  it("shows card counter as 'Card 1 / 2'", () => {
    render(<LearningCards cards={sampleCards} onComplete={() => {}} />);
    expect(screen.getByText(/card 1 \/ 2/i)).toBeInTheDocument();
  });

  it("Continue advances to the next card", async () => {
    const user = userEvent.setup();
    render(<LearningCards cards={sampleCards} onComplete={() => {}} />);
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByText("How Hot is the Sun?")).toBeInTheDocument();
  });

  it("Back button returns to previous card", async () => {
    const user = userEvent.setup();
    render(<LearningCards cards={sampleCards} onComplete={() => {}} />);
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.click(screen.getByRole("button", { name: /previous card/i }));
    expect(screen.getByText("What is the Sun?")).toBeInTheDocument();
  });

  it("last card shows 'Start Quiz' instead of 'Continue'", async () => {
    const user = userEvent.setup();
    render(<LearningCards cards={sampleCards} onComplete={() => {}} />);
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByRole("button", { name: /start quiz/i })).toBeInTheDocument();
  });

  it("calls onComplete after Start Quiz on last card", async () => {
    const onComplete = jest.fn();
    const user = userEvent.setup();
    render(<LearningCards cards={sampleCards} onComplete={onComplete} />);
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.click(screen.getByRole("button", { name: /start quiz/i }));
    expect(onComplete).toHaveBeenCalled();
  });
});
