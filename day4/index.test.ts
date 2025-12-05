import {
  countXs,
  createMatrix,
  movePaperRolls,
  removePaperRolls,
} from './index';

const input = `
    ..@@.@@@@.
    @@@.@.@.@@
    @@@@@.@.@@
    @.@@@@..@.
    @@.@@@@.@@
    .@@@@@@@.@
    .@.@.@.@@@
    @.@@@.@@@@
    .@@@@@@@@.
    @.@.@@@.@.`;
const output = `
    ..xx.xx@x.
    x@@.@.@.@@
    @@@@@.x.@@
    @.@@@@..@.
    x@.@@@@.@x
    .@@@@@@@.@
    .@.@.@.@@@
    x.@@@.@@@@
    .@@@@@@@@.
    x.x.@@@.x.`;

describe('day 5, part 1 tests', () => {
  it('should mark the correct positions with x', () => {
    const inputMatrix = createMatrix(input);
    const result = movePaperRolls(inputMatrix);
    expect(result.map((row) => row.join('')).join('\n')).toBe(
      output.replace(/ /g, '').trim()
    );
  });

  it('should have 13 x\'s in output', () => {
    const outputMatrix = createMatrix(output);
    const result = countXs(outputMatrix);
    expect(result).toBe(13);
  });

  it('should have moved 13 paper rolls', () => {
    const inputMatrix = createMatrix(input);
    const outputMatrix = movePaperRolls(inputMatrix);
    const result = countXs(outputMatrix);
    expect(result).toBe(13);
  });
});

describe('day 5, part 2 tests', () => {
  it('should have 43 paper rolls removed', () => {
    const result = removePaperRolls(input);
    expect(result).toBe(43);
  });
});
