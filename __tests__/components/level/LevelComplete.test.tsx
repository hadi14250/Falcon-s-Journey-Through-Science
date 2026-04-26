import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LevelComplete from "@/components/level/LevelComplete";
import { useGameStore } from "@/lib/store";

beforeEach(() => {
  useGameStore.setState({
    student: { name: "Hadi", avatarId: 0, companionId: "falcon" },
  });
});

describe("LevelComplete — passed", () => {
  const passedProps = {
    levelId: 1,
    score: 5,
    totalQuestions: 5,
    xpEarned: 100,
    badgeName: "Sun Seeker",
    badgeNameAr: "مستكشف الشمس",
    onRetry: () => {},
  };

  it("shows 'Level Complete!' headline", () => {
    render(<LevelComplete {...passedProps} />);
    expect(screen.getByText(/level complete/i)).toBeInTheDocument();
  });

  it("shows the score and XP", () => {
    render(<LevelComplete {...passedProps} />);
    expect(screen.getByText("5")).toBeInTheDocument(); // score
    expect(screen.getByText(/\+100 xp/i)).toBeInTheDocument();
  });

  it("displays the unlocked badge name", () => {
    render(<LevelComplete {...passedProps} />);
    expect(screen.getByText("Sun Seeker")).toBeInTheDocument();
    expect(screen.getByText("مستكشف الشمس")).toBeInTheDocument();
  });

  it("shows 'Next Level' button when not on last level", () => {
    render(<LevelComplete {...passedProps} />);
    expect(screen.getByRole("button", { name: /next level/i })).toBeInTheDocument();
  });

  it("does NOT show 'Next Level' button on level 6 (final)", () => {
    render(<LevelComplete {...passedProps} levelId={6} />);
    expect(screen.queryByRole("button", { name: /next level/i })).not.toBeInTheDocument();
  });

  it("always shows 'Back to Map' button", () => {
    render(<LevelComplete {...passedProps} />);
    expect(screen.getByRole("button", { name: /back to map/i })).toBeInTheDocument();
  });

  it("does NOT show Try Again on a pass", () => {
    render(<LevelComplete {...passedProps} />);
    expect(screen.queryByRole("button", { name: /try again/i })).not.toBeInTheDocument();
  });
});

describe("LevelComplete — failed", () => {
  const failedProps = {
    levelId: 1,
    score: 2,
    totalQuestions: 5,
    xpEarned: 40,
    badgeName: "Sun Seeker",
    badgeNameAr: "مستكشف الشمس",
    onRetry: jest.fn(),
  };

  it("shows 'Keep Going!' headline on fail", () => {
    render(<LevelComplete {...failedProps} />);
    expect(screen.getByText(/keep going/i)).toBeInTheDocument();
  });

  it("shows Try Again button on fail", () => {
    render(<LevelComplete {...failedProps} />);
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("does NOT show Next Level on fail", () => {
    render(<LevelComplete {...failedProps} />);
    expect(screen.queryByRole("button", { name: /next level/i })).not.toBeInTheDocument();
  });

  it("does NOT show badge unlock on fail", () => {
    render(<LevelComplete {...failedProps} />);
    // Badge name should not appear since the level wasn't passed
    expect(screen.queryByText("Sun Seeker")).not.toBeInTheDocument();
  });

  it("calls onRetry when Try Again clicked", async () => {
    const onRetry = jest.fn();
    const user = userEvent.setup();
    render(<LevelComplete {...failedProps} onRetry={onRetry} />);
    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalled();
  });
});

describe("LevelComplete — dark biome", () => {
  const props = {
    levelId: 6,
    score: 5,
    totalQuestions: 5,
    xpEarned: 100,
    badgeName: "Hope Pioneer",
    badgeNameAr: "رائد الأمل",
    onRetry: () => {},
  };

  it("uses light text on dark biome background", () => {
    const { container } = render(<LevelComplete {...props} darkBg={true} />);
    expect(container.innerHTML).toContain("text-white");
  });

  it("uses dark text on light biome background", () => {
    const { container } = render(<LevelComplete {...props} darkBg={false} />);
    expect(container.innerHTML).toContain("text-desert-night");
  });
});
