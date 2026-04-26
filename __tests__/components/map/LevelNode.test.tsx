import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LevelNode from "@/components/map/LevelNode";
import { levels } from "@/data/levels";

const sunLevel = levels[0]; // Level 1

describe("LevelNode", () => {
  it("renders the level number and title", () => {
    render(
      <LevelNode
        level={sunLevel}
        isCompleted={false}
        isCurrent={true}
        isLocked={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText(/level 1/i)).toBeInTheDocument();
    expect(screen.getByText(sunLevel.title)).toBeInTheDocument();
  });

  it("disables click when locked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <LevelNode
        level={sunLevel}
        isCompleted={false}
        isCurrent={false}
        isLocked={true}
        onClick={onClick}
      />
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onClick when current and unlocked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <LevelNode
        level={sunLevel}
        isCompleted={false}
        isCurrent={true}
        isLocked={false}
        onClick={onClick}
      />
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("uses 'Locked' aria-label when locked", () => {
    render(
      <LevelNode
        level={sunLevel}
        isCompleted={false}
        isCurrent={false}
        isLocked={true}
        onClick={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /locked/i })).toBeInTheDocument();
  });

  it("uses 'Completed' aria-label when completed", () => {
    render(
      <LevelNode
        level={sunLevel}
        isCompleted={true}
        isCurrent={false}
        isLocked={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /completed/i })).toBeInTheDocument();
  });

  it("uses 'Current level' aria-label when current", () => {
    render(
      <LevelNode
        level={sunLevel}
        isCompleted={false}
        isCurrent={true}
        isLocked={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /current level/i })).toBeInTheDocument();
  });
});
