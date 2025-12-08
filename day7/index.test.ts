import {
  countSplits,
  getManifoldPostions,
  getStartPosition,
  splitInputLines,
  splitTachyonBeams
} from './index';

const input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

describe('day 7, part 1 tests', () => {
  it('should split input into lines', () => {
    const lines = splitInputLines(input);
    expect(lines.length).toBe(16);
  });

  it('should find start position', () => {
    const startPos = getStartPosition(input);
    expect(startPos).toBe(7);
  });

  it.each([
    {input: '.......^.......', expected: [7]},
    {input: '......^.^......', expected: [6, 8]},
    {input: '.....^.^.^.....', expected: [5, 7, 9]},
    {input: '....^.^...^....', expected: [4, 6, 10]},
    {input: '...^.^...^.^...', expected: [3, 5, 9, 11]},
    {input: '..^...^.....^..', expected: [2, 6, 12]},
    {input: '.^.^.^.^.^...^.', expected: [1, 3, 5, 7, 9, 13]}
  ])('should get manifold positions for input: $input', ({input, expected}) => {
    const positions = getManifoldPostions(input);
    expect(positions).toEqual(expected);
  });

  it.each([
    {tachyonBeams: [1], result: [1], count: 0},
    {tachyonBeams: [7], result: [6, 8], count: 1},
    {tachyonBeams: [5, 7], result: [4, 6, 8], count: 2},
  ])('should split tachyon beams at position(s) $tachyonBeams $count times', ({tachyonBeams, result, count}) => {
    const manifolds = '.....^.^.^.....';
    const { tachyonBeamPositions, splitCount } = 
      splitTachyonBeams(tachyonBeams, manifolds);
    expect(tachyonBeamPositions).toEqual(new Set(result));
    expect(splitCount).toBe(count);
  });

  it('should count splits', () => {
    const splits = countSplits(input);
    expect(splits).toBe(21);
  });
});