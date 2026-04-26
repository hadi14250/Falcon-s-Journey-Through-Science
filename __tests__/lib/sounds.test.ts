/**
 * @jest-environment jsdom
 */
import { sounds } from "@/lib/sounds";

describe("sounds", () => {
  beforeEach(() => {
    sounds.setMuted(false);
  });

  it("exposes mute toggle API", () => {
    expect(typeof sounds.setMuted).toBe("function");
    expect(typeof sounds.isMuted).toBe("function");
  });

  it("starts unmuted by default", () => {
    expect(sounds.isMuted()).toBe(false);
  });

  it("mutes when setMuted(true)", () => {
    sounds.setMuted(true);
    expect(sounds.isMuted()).toBe(true);
  });

  it("can be unmuted again", () => {
    sounds.setMuted(true);
    sounds.setMuted(false);
    expect(sounds.isMuted()).toBe(false);
  });

  it("exposes all expected sound effect functions", () => {
    expect(typeof sounds.correct).toBe("function");
    expect(typeof sounds.wrong).toBe("function");
    expect(typeof sounds.streak).toBe("function");
    expect(typeof sounds.tap).toBe("function");
    expect(typeof sounds.next).toBe("function");
    expect(typeof sounds.complete).toBe("function");
    expect(typeof sounds.fail).toBe("function");
  });

  it("does not throw when sounds are triggered", () => {
    expect(() => sounds.correct()).not.toThrow();
    expect(() => sounds.wrong()).not.toThrow();
    expect(() => sounds.streak()).not.toThrow();
    expect(() => sounds.tap()).not.toThrow();
    expect(() => sounds.next()).not.toThrow();
    expect(() => sounds.complete()).not.toThrow();
    expect(() => sounds.fail()).not.toThrow();
  });

  it("does not throw when muted", () => {
    sounds.setMuted(true);
    expect(() => sounds.correct()).not.toThrow();
    expect(() => sounds.complete()).not.toThrow();
  });
});
