import inputs from './input.json';

export const dial = Array.from({ length: 100 }, (_, index) => index);
export const startingPosition = 50;

function rotate(arr: number[], position: number, steps: number, direction: 1 | -1): number {
  const len = arr.length;
  const newPosition = (direction * steps + position + len) % len;
  return newPosition;
}

export function rotateRight(dial: number[], startingPosition: number, steps: number): number {
  return rotate(dial, startingPosition, steps, 1);
}

export function rotateLeft(dial: number[], startingPosition: number, steps: number): number {
  return rotate(dial, startingPosition, steps, -1);
}

export function countZeros(inputs: string[]): number {
  let count = 0;
  let position = startingPosition;

  inputs.forEach((item) => {
    const direction = item.charAt(0);
    const steps = parseInt(item.slice(1), 10);

    if (direction === 'R') {
      position = rotateRight(dial, position, steps);
    } else if (direction === 'L') {
      position = rotateLeft(dial, position, steps);
    }

    if (dial[position] === 0) {
      count++;
    }
  })

  return count;
}

console.log('The count of zeros is:', countZeros(inputs));