describe("smoke", () => {
  it("Jest is wired up and runs", () => {
    expect(1 + 1).toBe(2);
  });

  it("jest-dom matchers are loaded", () => {
    const div = document.createElement("div");
    div.textContent = "hi";
    expect(div).toHaveTextContent("hi");
  });
});
