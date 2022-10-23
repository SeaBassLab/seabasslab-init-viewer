import { describe, expect, it } from "vitest";
import { custom_loader } from "../index";

describe("custom_loader", () => {
  it("should return a string", () => {
    expect(custom_loader()).toBeTypeOf("string");
  });
  it("return must contain a html element", () => {
    expect(custom_loader()).toContain("<div></div>");
  });
});
