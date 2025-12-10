import fs from 'fs';
import path from 'path';
import { isPointInsideOrOnPolygon } from './utils';

function getInput(): string {
  return fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
}

export type Coordinates = [number, number];

export function mapToCoordinates(input: string): Array<Coordinates> {
  return input
    .trim()
    .split('\n')
    .map((line) => {
      const [xStr, yStr] = line.split(',');
      return [parseInt(xStr), parseInt(yStr)] as Coordinates;
    });
}

export function loopThroughCombinations(
  coords: Array<Coordinates>,
  callback: (pointA: Coordinates, pointB: Coordinates) => void,
  inBoundary = false
): void {
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const pointA: Coordinates = coords[i];
      const pointB: Coordinates = coords[j];

      if (inBoundary) {
        const oppositeCorners = getOppositeCorners([pointA, pointB]);

        if (
          /**
           * TODO: This does not account for the area inside of the Polygon, only testing the bondaries
           * Need to implement a proper polygon area check
           */
          !oppositeCorners.every((corner) =>
            isPointInsideOrOnPolygon(corner, coords)
          )
        )
          continue;
      }

      callback(pointA, pointB);
    }
  }
}

export function getOppositeCorners(
  coords: Array<Coordinates>
): Array<Coordinates> {
  return [
    [coords[0][0], coords[1][1]],
    [coords[1][0], coords[0][1]],
  ];
}

export function calculateArea(
  pointA: Coordinates,
  pointB: Coordinates
): number {
  const width = Math.abs(pointA[0] - pointB[0] + 1);
  const height = Math.abs(pointA[1] - pointB[1] + 1);
  return width * height;
}

export function findLargestArea(
  coords: Array<Coordinates>,
  inBoundary: boolean = false
): number {
  let largestArea = 0;

  loopThroughCombinations(
    coords,
    (pointA, pointB) => {
      const area = calculateArea(pointA, pointB);
      if (area > largestArea) {
        largestArea = area;
      }
    },
    inBoundary
  );

  return largestArea;
}

// Only run when executed directly, not when imported by tests
if (require.main === module) {
  console.log(
    '(Part 1)The largest area is:',
    findLargestArea(mapToCoordinates(getInput()))
  );


  console.log(
    '(Part 2) The largest area is:',
    findLargestArea(mapToCoordinates(getInput()), true)
  );
}

// Part 1
// Guess 1 = 4748826374 is correct!

// Part 2
// Guess 1 = 4638024000 is too high
