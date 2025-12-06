import fs from 'fs';
import path from 'path';

const re = /^\s*\S+/gm;

function getInput(): string {
  return fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
}

export function getEquation(input: string): Array<string> | null {
  return input.match(re);
}

export function removeEquation(input: string): string {
  return input.replace(re, '').trimStart();
}

export function calculate(equationParts: Array<string>): number {
  const operator = equationParts.pop()?.trim();

  switch (operator) {
    case '+':
      return equationParts.reduce((acc, curr) => acc + parseInt(curr), 0);
    case '*':
      return equationParts.reduce((acc, curr) => acc * parseInt(curr), 1);
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

export function solveEquations(input: string): number {
  let total = 0;
  
  while (input.length > 0) {
    let equationParts = getEquation(input);
    total += calculate(equationParts!);
    input = removeEquation(input);
  }

  return total;
}

// Only run when executed directly, not when imported by tests
if (require.main === module) {
  console.log('The sum of all equations is:', solveEquations(getInput()));
}

// Part 1
// Guess 1 = 6605396225322 is correct!