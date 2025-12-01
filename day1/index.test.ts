import {
  dial,
  startingPosition,
  countZeros,
  rotateLeft,
  rotateRight,
} from "./index";

describe("day 1 tests", () => {
  test.each([
    { steps: 3, expected: 53 },
    { steps: 10, expected: 60 },
    { steps: 50, expected: 0 },
  ])("rotates the dial to the right by $steps steps", ({ steps, expected }) => {
    const result = rotateRight(dial, startingPosition, steps);
    expect(result).toEqual(expected);
  });

  test.each([
    { steps: 3, expected: 47 },
    { steps: 10, expected: 40 },
    { steps: 50, expected: 0 },
  ])("rotates the dial to the left by $steps steps", ({ steps, expected }) => {
    const result = rotateLeft(dial, startingPosition, steps);
    expect(result).toEqual(expected);
  });

  it("count the number of times the result is zero", () => {
    const inputs = ["R53", "L6", "R3"];
    const result = countZeros(inputs);
    expect(result).toBe(1);
  });
});
