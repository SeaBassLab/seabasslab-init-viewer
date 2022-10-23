import { describe, expect, it } from "vitest";
import { build_url } from "../index";

describe("build_url", () => {
  it("should throw a specific error message if not string is provided as parameter", () => {
    expect(() => build_url()).toThrow("model uid must be a string");
  });
  it("should return a new URL", () => {
    expect(build_url("1234")).toContain("https://sketchfab.com/models/1234");
  });
});
