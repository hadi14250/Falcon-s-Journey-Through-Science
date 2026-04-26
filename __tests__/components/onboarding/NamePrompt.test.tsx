import { render, screen } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NamePrompt from "@/components/onboarding/NamePrompt";
import { useGameStore } from "@/lib/store";

const blankProgress = () => ({
  currentLevel: 1,
  completedLevels: [],
  unlockedBadges: [],
  quizScores: {},
  bestHearts: {},
  perfectClears: [],
  totalXP: 0,
});

beforeEach(() => {
  useGameStore.setState({
    student: { name: "", avatarId: 0, companionId: "falcon" },
    currentSubject: "space",
    subjectProgress: {
      space: blankProgress(),
      heritage: blankProgress(),
      nature: blankProgress(),
    },
    soundEnabled: true,
    reducedMotion: false,
  });
});

/* The modal opens on the new "subject" step. The original tests assume
   the name step is the first one, so we click Next once to advance past
   subject before each test that targets later steps. */
async function advancePastSubject(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /next/i }));
}

describe("NamePrompt — Step 0: Subject", () => {
  it("opens on the subject picker", () => {
    render(<NamePrompt onComplete={() => {}} />);
    expect(screen.getByText(/space exploration/i)).toBeInTheDocument();
  });

  it("Next button is enabled with default subject selected", () => {
    render(<NamePrompt onComplete={() => {}} />);
    const nextBtn = screen.getByRole("button", { name: /next/i });
    expect(nextBtn).not.toBeDisabled();
  });
});

describe("NamePrompt — Step 1: Name", () => {
  it("renders the name input on the name step", async () => {
    const user = userEvent.setup();
    render(<NamePrompt onComplete={() => {}} />);
    await advancePastSubject(user);
    expect(screen.getByPlaceholderText(/type your name/i)).toBeInTheDocument();
  });

  it("Next button is disabled when name is empty", async () => {
    const user = userEvent.setup();
    render(<NamePrompt onComplete={() => {}} />);
    await advancePastSubject(user);
    const nextBtn = screen.getByRole("button", { name: /next/i });
    expect(nextBtn).toBeDisabled();
  });

  it("Next button enables after typing a name", async () => {
    const user = userEvent.setup();
    render(<NamePrompt onComplete={() => {}} />);
    await advancePastSubject(user);
    const input = screen.getByPlaceholderText(/type your name/i);
    await user.type(input, "Hadi");
    const nextBtn = screen.getByRole("button", { name: /next/i });
    expect(nextBtn).not.toBeDisabled();
  });
});

describe("NamePrompt — Step 2: Avatar", () => {
  it("transitions to avatar step after name + Next", async () => {
    const user = userEvent.setup();
    render(<NamePrompt onComplete={() => {}} />);
    await advancePastSubject(user);
    await user.type(screen.getByPlaceholderText(/type your name/i), "Hadi");
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/choose your explorer/i)).toBeInTheDocument();
  });

  it("Back button returns to name step", async () => {
    const user = userEvent.setup();
    render(<NamePrompt onComplete={() => {}} />);
    await advancePastSubject(user);
    await user.type(screen.getByPlaceholderText(/type your name/i), "Hadi");
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByPlaceholderText(/type your name/i)).toBeInTheDocument();
  });
});

describe("NamePrompt — Step 3: Companion + finish", () => {
  it("transitions to companion step after avatar + Next", async () => {
    const user = userEvent.setup();
    render(<NamePrompt onComplete={() => {}} />);
    await advancePastSubject(user);
    await user.type(screen.getByPlaceholderText(/type your name/i), "Hadi");
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/choose your companion/i)).toBeInTheDocument();
  });

  it("calls onComplete and saves name+avatar+companion to store", async () => {
    const onComplete = jest.fn();
    const user = userEvent.setup();
    render(<NamePrompt onComplete={onComplete} />);

    // Step 0: subject (default = space)
    await advancePastSubject(user);

    // Step 1: name
    await user.type(screen.getByPlaceholderText(/type your name/i), "Hadi");
    await user.click(screen.getByRole("button", { name: /next/i }));

    // Step 2: avatar (default avatar 0 stays selected)
    await user.click(screen.getByRole("button", { name: /next/i }));

    // Step 3: companion (default = first enabled = camel) + finish
    await user.click(screen.getByRole("button", { name: /yalla/i }));

    expect(onComplete).toHaveBeenCalled();
    const state = useGameStore.getState();
    expect(state.student.name).toBe("Hadi");
    expect(state.student.companionId).toBe("camel");
    expect(state.currentSubject).toBe("space");
  });
});
