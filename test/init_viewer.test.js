import { describe, expect, it } from "vitest";
import { initViewer } from "../index";

describe("custom_loader", () => {
  it("should throw an error if first parameter is not an object", () => {
    expect(() => initViewer()).toThrow("config must be an object");
  });
});
