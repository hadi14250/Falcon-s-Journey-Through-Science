import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuizPhase from "@/components/level/QuizPhase";
import type { QuizQuestion } from "@/data/levels";
import { useGameStore } from "@/lib/store";

const sampleQuestions: QuizQuestion[] = [
  {
    question: "What is the Sun?",
    options: ["A planet", "A star", "A moon", "A comet"],
    correctIndex: 1,
    explanation: "The Sun is a star.",
  },
  {
    question: "How many planets in our solar system?",
    options: ["6", "7", "8", "9"],
    correctIndex: 2,
    explanation: "There are 8 planets.",
  },
];

beforeEach(() => {
  useGameStore.setState({
    student: { name: "Hadi", avatarId: 0, companionId: "falcon" },
    soundEnabled: true,
  });
});

describe("QuizPhase", () => {
  it("renders the first question", () => {
    render(<QuizPhase questions={sampleQuestions} onComplete={() => {}} />);
    expect(screen.getByText(/what is the sun/i)).toBeInTheDocument();
  });

  it("shows all 4 answer options", () => {
    render(<QuizPhase questions={sampleQuestions} onComplete={() => {}} />);
    expect(screen.getByText("A planet")).toBeInTheDocument();
    expect(screen.getByText("A star")).toBeInTheDocument();
    expect(screen.getByText("A moon")).toBeInTheDocument();
    expect(screen.getByText("A comet")).toBeInTheDocument();
  });

  it("displays question counter as 'Question 1 / 2'", () => {
    render(<QuizPhase questions={sampleQuestions} onComplete={() => {}} />);
    expect(screen.getByText(/question 1 \/ 2/i)).toBeInTheDocument();
  });

  it("shows feedback modal after selecting an answer", async () => {
    const user = userEvent.setup();
    render(<QuizPhase questions={sampleQuestions} onComplete={() => {}} />);
    await user.click(screen.getByRole("button", { name: /option B: A star/i }));
    await waitFor(
      () => {
        expect(screen.getByText(/the sun is a star/i)).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  it("shows correct headline on right answer", async () => {
    const user = userEvent.setup();
    render(<QuizPhase questions={sampleQuestions} onComplete={() => {}} />);
    await user.click(screen.getByRole("button", { name: /option B: A star/i }));
    await waitFor(
      () => {
        // Either "Mashallah!" or "{streak}x Streak!" or "You're a hero!"
        const hasPositive =
          screen.queryByText(/mashallah/i) ||
          screen.queryByText(/hero/i) ||
          screen.queryByText(/streak/i);
        expect(hasPositive).toBeTruthy();
      },
      { timeout: 4000 }
    );
  });

  it("shows wrong feedback on incorrect answer", async () => {
    const user = userEvent.setup();
    render(<QuizPhase questions={sampleQuestions} onComplete={() => {}} />);
    await user.click(screen.getByRole("button", { name: /option A: A planet/i }));
    await waitFor(
      () => {
        expect(screen.getByText(/not quite/i)).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  it("calls onComplete with score after final question's Continue", async () => {
    const onComplete = jest.fn();
    const user = userEvent.setup();
    // Single-question quiz to short-circuit the flow
    const oneQ: QuizQuestion[] = [sampleQuestions[0]];
    render(<QuizPhase questions={oneQ} onComplete={onComplete} />);

    await user.click(screen.getByRole("button", { name: /option B: A star/i }));
    await waitFor(
      () => {
        expect(screen.getByRole("button", { name: /see results/i })).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
    await user.click(screen.getByRole("button", { name: /see results/i }));
    await waitFor(() => expect(onComplete).toHaveBeenCalledWith(1));
  });

  it("disables answer buttons after one is selected", async () => {
    const user = userEvent.setup();
    render(<QuizPhase questions={sampleQuestions} onComplete={() => {}} />);
    const planet = screen.getByRole("button", { name: /option A: A planet/i });
    const star = screen.getByRole("button", { name: /option B: A star/i });
    await user.click(star);
    expect(planet).toBeDisabled();
  });
});
