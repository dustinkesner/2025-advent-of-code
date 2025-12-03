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
    const len = dial.length;
    const residual = steps % len;
    
    count += Math.floor(steps / len);

    switch (direction) {
      case 'R': {
        const start = position;
        const r = (len - start) % len;
        if (r !== 0 && residual >= r) {
          count += 1;
        }
        position = rotateRight(dial, position, residual);
        break;
      }
      case 'L': {
        const start = position;
        const r = start % len;
        if (r !== 0 && residual >= r) {
          count += 1;
        }
        position = rotateLeft(dial, position, residual);
        break;
      }
      default:
        throw new Error(`Invalid direction '${direction}' in input '${item}'. Expected 'R' or 'L'.`);
    }
  });

  return count;
}

console.log('The count of zeros is:', countZeros(inputs));

// Guess 1 = 4096 is too low
// Guess 2 = 6296 is too high
// Guess 3 = 5874 is too low
// Guess 4 = 5923 is correct!