import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsModal from "@/components/ui/SettingsModal";
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
    student: { name: "Hadi", avatarId: 0, companionId: "falcon" },
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

describe("SettingsModal", () => {
  it("does not render when closed", () => {
    render(<SettingsModal open={false} onClose={() => {}} />);
    expect(screen.queryByText(/settings/i)).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(<SettingsModal open={true} onClose={() => {}} />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("displays the user's current name", () => {
    render(<SettingsModal open={true} onClose={() => {}} />);
    expect(screen.getByText("Hadi")).toBeInTheDocument();
  });

  it("shows ON label when sound is enabled", () => {
    render(<SettingsModal open={true} onClose={() => {}} />);
    const onLabels = screen.getAllByText("ON");
    expect(onLabels.length).toBeGreaterThan(0);
  });

  it("toggles sound when sound switch clicked", async () => {
    const user = userEvent.setup();
    render(<SettingsModal open={true} onClose={() => {}} />);
    expect(useGameStore.getState().soundEnabled).toBe(true);
    const soundToggle = screen.getByLabelText(/toggle sound effects/i);
    await user.click(soundToggle);
    expect(useGameStore.getState().soundEnabled).toBe(false);
  });

  it("toggles reduced motion when motion switch clicked", async () => {
    const user = userEvent.setup();
    render(<SettingsModal open={true} onClose={() => {}} />);
    expect(useGameStore.getState().reducedMotion).toBe(false);
    const motionToggle = screen.getByLabelText(/toggle reduced animations/i);
    await user.click(motionToggle);
    expect(useGameStore.getState().reducedMotion).toBe(true);
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(<SettingsModal open={true} onClose={onClose} />);
    const closeBtn = screen.getByLabelText(/close settings/i);
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it("requires confirmation before reset", async () => {
    const user = userEvent.setup();
    render(<SettingsModal open={true} onClose={() => {}} />);
    const resetBtn = screen.getByRole("button", { name: /^reset$/i });
    await user.click(resetBtn);
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });
});
