import { render } from "@testing-library/react";
import HeartRow from "@/components/lesson/HeartRow";

describe("HeartRow", () => {
  it("renders the right number of hearts", () => {
    const { container } = render(<HeartRow total={5} remaining={5} />);
    // Each heart is an svg
    expect(container.querySelectorAll("svg").length).toBe(5);
  });

  it("renders zero remaining (all empty)", () => {
    const { container } = render(<HeartRow total={5} remaining={0} />);
    expect(container.querySelectorAll("svg").length).toBe(5);
  });

  it("aria-label reflects state", () => {
    const { getByLabelText } = render(<HeartRow total={5} remaining={3} />);
    expect(getByLabelText(/3 hearts remaining/i)).toBeInTheDocument();
  });
});
