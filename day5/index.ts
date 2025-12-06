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

export function getCountOfFreshIngredientIdsInRange(
  ranges: [number, number][]
): number {
  let condensedRanges: [number, number][] = [];
  let iterator = 0;

  ranges.sort((a, b) => a[0] - b[0]);

  condensedRanges.push(ranges[0]);

  ranges.forEach(([start, end]) => {
    if (start > condensedRanges[iterator][1]) {
      iterator++;
      condensedRanges.push([start, end]);
    } else if (end > condensedRanges[iterator][1]) {
      condensedRanges[iterator][1] = end;
    }
  });

  let totalCount = 0;
  condensedRanges.forEach(([start, end]) => {
    totalCount += end - start + 1;
  });

  return totalCount;
}

// Only run when executed directly, not when imported by tests
if (require.main === module) {
  console.log(
    'The count of fresh ingredients is:',
    getCountOfFreshIngredients(
      getFreshIngredientRanges(getInput()),
      getIngredientIds(getInput())
    )
  );

  console.log(
    'The count of fresh ingredient IDs in range is:',
    getCountOfFreshIngredientIdsInRange(getFreshIngredientRanges(getInput()))
  );
}

// Part 1
// Guess 1 = 896 is correct!

// Part 2
// Guess 2 = 346240317247002 is correct!