import fs from 'fs';
import path from 'path';

function getInput(): string {
  return fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
}

export type Coordinates = [number, number];

export function mapToCoordinates(input: string): Array<Coordinates> {
  return input.trim().split('\n').map(line => {
    const [xStr, yStr] = line.split(',');
    return [parseInt(xStr), parseInt(yStr)] as Coordinates;
  });
}

export function loopThroughCombinations(coords: Array<Coordinates>, callback: (pointA: Coordinates, pointB: Coordinates) => void): void {
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const pointA: Coordinates = coords[i];
      const pointB: Coordinates = coords[j];
      callback(pointA, pointB);
    }
  }
}

export function calculateArea(pointA: Coordinates, pointB: Coordinates): number {
  const width = Math.abs(pointA[0] - pointB[0] + 1);
  const height = Math.abs(pointA[1] - pointB[1] + 1);
  return width * height;
}

export function findLargestArea(coords: Array<Coordinates>): number {
  let largestArea = 0;

  loopThroughCombinations(coords, (pointA, pointB) => {
    const area = calculateArea(pointA, pointB);
    if (area > largestArea) {
      largestArea = area;
    }
  });

  return largestArea;
}

// Only run when executed directly, not when imported by tests
if (require.main === module) {
  console.log('The largest area is:', findLargestArea(mapToCoordinates(getInput())));
}

// Part 1
// Guess 1 = 4748826374 is correct!