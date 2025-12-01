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

  test.each([
    { inputs: ["R3", "L3", "R4", "L2"], expected: 0 },
    { inputs: ["R53", "L6", "R3"], expected: 3 },
    { inputs: ["R1000"], expected: 10 },
    { inputs: ["L68", "L30", "R48", "L5", "R60", "L55", "L1", "L99", "R14", "L82"], expected: 6 },
  ])("count the number of times the result points at zero", ({ inputs, expected }) => {
    const result = countZeros(inputs);
    expect(result).toBe(expected);
  });
});
