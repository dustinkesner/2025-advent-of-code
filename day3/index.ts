import input from './input.json';

export function calculateJoltageRatingsSum(banks: string[]): number {
  let totalJoltage = 0;

  banks.forEach(bank => {
    totalJoltage += getJoltage(bank);
  });

  return totalJoltage;
}

function getMaxDigit(digits: number[]): { digit: number, position: number} {
  const digit = Math.max(...digits);
  const position = digits.indexOf(digit);

  return { digit, position };
}

export function getJoltage(bank: string): number {
  let joltage: [number, number] = [0, 0];
  let digits = Array.from(bank, Number);
  let { digit, position } = getMaxDigit(digits);

  if (position === digits.length - 1) {
    joltage[1] = digit;
    digits.pop();
    ({ digit, position } = getMaxDigit(digits));
    joltage[0] = digit;
  } else {
    joltage[0] = digit;
    digits = digits.slice(position + 1);
    joltage[1] = getMaxDigit(digits).digit;
  }

  return parseInt(joltage.join(''));
}

console.log('The sum of joltage ratings is:', calculateJoltageRatingsSum(input));

// Part 1
// Guess 1 = 17034 is correct!