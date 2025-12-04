import { countXs, createMatrix, movePaperRolls } from './index';

describe('day 2, part 1 tests', () => {
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

  it('should mark the correct positions with x', () => {
    const inputMatrix = createMatrix(input);
    const result = movePaperRolls(inputMatrix);
    expect(result.map(row => row.join('')).join('\n')).toBe(output.replace(/ /g, '').trim());
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