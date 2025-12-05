import fs from 'fs';
import path from 'path';

function getInput(): string {
  return fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
}

export function getFreshIngredientRanges(input: string): [number, number][] {
  const ingredientRanges = input.split('\n\n')[0];
  const ingredientRangesArray = ingredientRanges.trim().split('\n');

  const ingredientRangesArrayParsed: [number, number][] =
    ingredientRangesArray.map((line) => {
      const [startStr, endStr] = line.split('-');
      return [parseInt(startStr), parseInt(endStr)];
    });

  return ingredientRangesArrayParsed;
}

export function getIngredientIds(input: string): number[] {
  const ingredientIds = input.split('\n\n')[1];
  const ingredientIdsArray = ingredientIds
    .trim()
    .split('\n')
    .map((idStr) => parseInt(idStr));

  return ingredientIdsArray;
}

export function getCountOfFreshIngredients(
  ranges: [number, number][],
  ids: number[]
): number {
  let freshIngredientCount = 0;

  ids.forEach((id) => {
    const isFresh = ranges.some(([start, end]) => id >= start && id <= end);
    isFresh && freshIngredientCount++;
  });

  return freshIngredientCount;
}

// Only run when executed directly, not when imported by tests
if (require.main === module) {
  console.log('The count of fresh ingredients is:', getCountOfFreshIngredients(
    getFreshIngredientRanges(getInput()),
    getIngredientIds(getInput())
  ));
}

// Part 1
// Guess 1 = 896 is correct!