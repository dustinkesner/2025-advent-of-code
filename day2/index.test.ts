import {
  getInvalidIdsInRange,
  parseRanges,
  splitId,
  addInvalidIds,
} from "./index";

describe("day 2 tests", () => {
  it("parses ranges correctly", () => {
    const rangeStr = "10-20,30-40,50-60";
    const expected = [
      [10, 20],
      [30, 40],
      [50, 60],
    ];
    const result = parseRanges(rangeStr);
    expect(result).toEqual(expected);
  });

  test.each([
    { id: 11, expected: ['1', '1'] },
    // { id: 123, expected: ['1', '3'] },
    { id: 5678, expected: ['56', '78'] }
  ])("splits ID correctly", ({ id, expected }) => {
    const result = splitId(id);
    expect(result).toEqual(expected);
  });

  it("gets invalid IDs in range", () => {
    const rangeStart = 998;
    const rangeEnd = 1011;

    const results = getInvalidIdsInRange(rangeStart, rangeEnd);

    expect(results).toEqual([1010]);
  });

  it("add invalid IDs", () => {
    const productIdRange =
      "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

    const result = addInvalidIds(productIdRange);

    expect(result).toBe(1227775554);
  });
});
