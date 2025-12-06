import {
  getCountOfFreshIngredients,
  getCountOfFreshIngredientIdsInRange,
  getFreshIngredientRanges,
  getIngredientIds,
} from './index';

const input = `
  3-5
  10-14
  16-20
  12-18

  1
  5
  8
  11
  17
  32
`
  .replace(/ /g, '')
  .trim();

describe('day 5, part 1 tests', () => {
  it('should get fresh ingredient ranges', () => {
    const ranges = getFreshIngredientRanges(input);
    expect(ranges).toEqual([
      [3, 5],
      [10, 14],
      [16, 20],
      [12, 18],
    ]);
  });

  it('should get ingredient ids', () => {
    const ids = getIngredientIds(input);
    expect(ids).toEqual([1, 5, 8, 11, 17, 32]);
  });

  it('should identify fresh ingredients', () => {
    const ranges = getFreshIngredientRanges(input);
    const ids = getIngredientIds(input);

    const countOfFreshIngredients = getCountOfFreshIngredients(ranges, ids);
    expect(countOfFreshIngredients).toBe(3);
  });
});

describe('day 5, part 2 tests', () => {
  it('should count the number of fresh ingredient ids in the ranges', () => {
    const ranges = getFreshIngredientRanges(input);
    const countOfFreshIngredientIdsInRange = getCountOfFreshIngredientIdsInRange(ranges);
    expect(countOfFreshIngredientIdsInRange).toBe(14);
  });
});
