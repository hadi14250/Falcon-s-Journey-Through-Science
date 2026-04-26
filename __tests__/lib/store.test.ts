/**
 * @jest-environment jsdom
 */
import { useGameStore } from "@/lib/store";

const initialSnapshot = useGameStore.getState();

const blankSubjectProgress = () => ({
  currentLevel: 1,
  completedLevels: [],
  unlockedBadges: [],
  quizScores: {},
  bestHearts: {},
  perfectClears: [],
  totalXP: 0,
});

beforeEach(() => {
  // Reset store between tests
  useGameStore.setState({
    student: { name: "", avatarId: 0, companionId: "camel" },
    currentSubject: "space",
    subjectProgress: {
      space: blankSubjectProgress(),
      heritage: blankSubjectProgress(),
      nature: blankSubjectProgress(),
    },
    dirhams: 0,
    dirhamsEarnedAllTime: 0,
    ownedItems: [],
    equipped: { human: null, companion: null },
    soundEnabled: true,
    reducedMotion: false,
    arabicNumerals: false,
  });
});

// Helper to read the active subject's progress
const progress = () => {
  const s = useGameStore.getState();
  return s.subjectProgress[s.currentSubject];
};

describe("useGameStore — initial state", () => {
  it("starts with default student", () => {
    const s = useGameStore.getState();
    expect(s.student.name).toBe("");
    expect(s.student.avatarId).toBe(0);
    expect(s.student.companionId).toBe("camel");
  });

  it("starts at level 1 with 0 XP for the active subject", () => {
    const p = progress();
    expect(p.currentLevel).toBe(1);
    expect(p.totalXP).toBe(0);
    expect(p.completedLevels).toEqual([]);
    expect(p.unlockedBadges).toEqual([]);
  });

  it("defaults sound on and reduced-motion off", () => {
    const s = useGameStore.getState();
    expect(s.soundEnabled).toBe(true);
    expect(s.reducedMotion).toBe(false);
  });

  it("exposes the expected setter functions", () => {
    expect(typeof initialSnapshot.setStudent).toBe("function");
    expect(typeof initialSnapshot.completeLevel).toBe("function");
    expect(typeof initialSnapshot.setCurrentSubject).toBe("function");
    expect(typeof initialSnapshot.setSoundEnabled).toBe("function");
    expect(typeof initialSnapshot.setReducedMotion).toBe("function");
    expect(typeof initialSnapshot.resetProgress).toBe("function");
  });
});

describe("useGameStore — setStudent", () => {
  it("updates name and avatar", () => {
    useGameStore.getState().setStudent("Hadi", 3);
    const s = useGameStore.getState();
    expect(s.student.name).toBe("Hadi");
    expect(s.student.avatarId).toBe(3);
  });

  it("preserves existing companion when not provided", () => {
    useGameStore.setState({ student: { name: "X", avatarId: 0, companionId: "oryx" } });
    useGameStore.getState().setStudent("Y", 1);
    expect(useGameStore.getState().student.companionId).toBe("oryx");
  });

  it("updates companion when provided", () => {
    useGameStore.getState().setStudent("Z", 2, "camel");
    expect(useGameStore.getState().student.companionId).toBe("camel");
  });
});

describe("useGameStore — completeLevel", () => {
  it("adds level to completedLevels and awards XP for the active subject", () => {
    useGameStore.getState().completeLevel(1, 5, 100, 0, 5);
    const p = progress();
    expect(p.completedLevels).toContain(1);
    expect(p.totalXP).toBe(100);
    expect(p.unlockedBadges).toContain("badge-space-1");
  });

  it("advances currentLevel by one", () => {
    useGameStore.getState().completeLevel(1, 5, 100, 0, 5);
    expect(progress().currentLevel).toBe(2);
  });

  it("does NOT double-count XP on retry of an already completed level", () => {
    useGameStore.getState().completeLevel(1, 5, 100, 0, 5);
    useGameStore.getState().completeLevel(1, 5, 100, 0, 5); // retry
    expect(progress().totalXP).toBe(100);
    expect(progress().completedLevels).toEqual([1]);
  });

  it("does not duplicate badges", () => {
    useGameStore.getState().completeLevel(2, 5, 100, 0, 5);
    useGameStore.getState().completeLevel(2, 5, 100, 0, 5);
    const badges = progress().unlockedBadges;
    expect(badges.filter((b: string) => b === "badge-space-2").length).toBe(1);
  });

  it("records latest quiz score for that level", () => {
    useGameStore.getState().completeLevel(3, 4, 80, 0, 5);
    expect(progress().quizScores[3]).toBe(4);
    useGameStore.getState().completeLevel(3, 5, 100, 0, 5);
    expect(progress().quizScores[3]).toBe(5);
  });

  it("doesn't regress currentLevel when completing earlier levels later", () => {
    useGameStore.setState((s) => ({
      subjectProgress: {
        ...s.subjectProgress,
        space: { ...s.subjectProgress.space, currentLevel: 4 },
      },
    }));
    useGameStore.getState().completeLevel(1, 5, 100, 0, 5);
    expect(progress().currentLevel).toBe(4);
  });

  it("scopes progress per subject — completing in space does not affect heritage", () => {
    useGameStore.getState().completeLevel(1, 5, 100, 0, 5);
    expect(progress().completedLevels).toContain(1);
    useGameStore.getState().setCurrentSubject("heritage");
    expect(progress().completedLevels).toEqual([]);
    expect(progress().currentLevel).toBe(1);
  });
});

describe("useGameStore — settings toggles", () => {
  it("setSoundEnabled flips sound state", () => {
    useGameStore.getState().setSoundEnabled(false);
    expect(useGameStore.getState().soundEnabled).toBe(false);
    useGameStore.getState().setSoundEnabled(true);
    expect(useGameStore.getState().soundEnabled).toBe(true);
  });

  it("setReducedMotion flips motion state", () => {
    useGameStore.getState().setReducedMotion(true);
    expect(useGameStore.getState().reducedMotion).toBe(true);
    useGameStore.getState().setReducedMotion(false);
    expect(useGameStore.getState().reducedMotion).toBe(false);
  });
});

describe("useGameStore — resetProgress", () => {
  it("clears progress but preserves user preferences", () => {
    useGameStore.getState().setStudent("Hadi", 2, "oryx");
    useGameStore.getState().completeLevel(1, 5, 100, 0, 5);
    useGameStore.getState().setSoundEnabled(false);
    useGameStore.getState().setReducedMotion(true);

    useGameStore.getState().resetProgress();
    const p = progress();
    const s = useGameStore.getState();
    expect(p.totalXP).toBe(0);
    expect(p.completedLevels).toEqual([]);
    expect(p.unlockedBadges).toEqual([]);
    expect(p.currentLevel).toBe(1);
    expect(s.student.name).toBe("");
    // Preferences preserved
    expect(s.soundEnabled).toBe(false);
    expect(s.reducedMotion).toBe(true);
  });
});
