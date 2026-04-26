import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonButton from "@/components/lesson/LessonButton";

describe("LessonButton", () => {
  it("renders children", () => {
    render(<LessonButton>Continue</LessonButton>);
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<LessonButton onClick={onClick}>Tap</LessonButton>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <LessonButton onClick={onClick} disabled>
        Disabled
      </LessonButton>
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies primary variant by default", () => {
    const { container } = render(<LessonButton>x</LessonButton>);
    expect(container.querySelector(".lesson-btn-primary")).toBeInTheDocument();
  });

  it("applies danger variant", () => {
    const { container } = render(<LessonButton variant="danger">x</LessonButton>);
    expect(container.querySelector(".lesson-btn-danger")).toBeInTheDocument();
  });

  it("applies neutral variant", () => {
    const { container } = render(<LessonButton variant="neutral">x</LessonButton>);
    expect(container.querySelector(".lesson-btn-neutral")).toBeInTheDocument();
  });
});
