import {
  getInvalidIdsInRange,
  isIdInvalid,
  parseRanges,
  splitId,
  addInvalidIds,
} from "./index";

xdescribe("day 2, part 1 tests", () => {
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
  ])("splits ID correctly for $id", ({ id, expected }) => {
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

describe('day 2, part 2 tests', () => {
  test.each([
    11,
    111,
    1010,
    222222,
    446446,
    565656,
    2121212121
  ])("check if %s is an invalid product id", (id) => {
      const result = isIdInvalid(id);
      expect(result).toBe(true);
  });

  test.each([
    1,
    12,
    1001,
    1234567,
    12321,
  ])("check if %s is a valid product id", (id) => {
      const result = isIdInvalid(id);
      expect(result).toBe(false);
  });

  test.each([
    {range: [11, 22], expected: [11,22]},
    {range: [95, 115], expected: [99, 111]},
    {range: [998, 1012], expected: [999, 1010]},
    {range: [1188511880, 1188511890], expected: [1188511885]},
    {range: [222220, 222224], expected: [222222]},
    {range: [1698522, 1698528], expected: []},
    {range: [446443, 446449], expected: [446446]},
    {range: [38593856, 38593862], expected: [38593859]},
    {range: [565653, 565659], expected: [565656]},
    {range: [824824821, 824824827], expected: [824824824]},
    {range: [2121212118, 2121212124], expected: [2121212121]},
  ])("return invalid IDs in range for $range", ({range, expected}) => {
    const result = getInvalidIdsInRange(range[0], range[1]);

    console.log('Result:', result, 'Expected:', expected);

    expect(expected).toEqual(result);
  })
});
