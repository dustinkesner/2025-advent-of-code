import {
  Coordinates,
  calculateArea,
  findLargestArea,
  loopThroughCombinations,
  mapToCoordinates
} from './index';

const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

describe('day 9, part 1 tests', () => {
  it('should map input to coordinates', () => {
    const result: Array<Coordinates> = mapToCoordinates(input);
    expect(result).toHaveLength(8);
    expect(result[0]).toEqual([7, 1]);
  });

  it('should loop through all combinations of coordinates', () => {
    const coords: Array<Coordinates> = mapToCoordinates(input);
    const callback = jest.fn((pointA, pointB) => {
      return calculateArea(pointA, pointB);
    });
    loopThroughCombinations(coords, callback);
    expect(callback).toHaveBeenCalledTimes(28);
  });

  it('should calculate area between two points', () => {
    const pointA: Coordinates = [2, 3];
    const pointB: Coordinates = [7, 5];
    const area = calculateArea(pointA, pointB);
    expect(area).toBe(4);
  });

  it('should find the largest area from the coordinates', () => {
    const coords: Array<Coordinates> = mapToCoordinates(input);
    const largestArea = findLargestArea(coords);
    expect(largestArea).toBe(50);
  });
});
