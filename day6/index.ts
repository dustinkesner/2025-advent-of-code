import fs from 'fs';
import path from 'path';

const re = /^ *\S+(?: {2}(?=.)| (?=\S)| *$)/gm;

function getInput(): string {
  return fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
}

export function getEquation(input: string): Array<string> | null {
  return input.match(re);
}

export function getCephalopodEquation(input: string): Array<string> | null {
  const lines = input.split('\n');
  if (lines.length < 2) return null;
  
  const operatorLine = lines[lines.length - 1];
  const numberLines = lines.slice(0, -1);
  
  // Find the maximum line length
  const maxLength = Math.max(...lines.map(line => line.length));
  
  const numbers: string[] = [];
  let foundOperator = '';
  let hasFoundNumbers = false;
  
  // Read from LEFT to RIGHT (to match test expectations)
  for (let charPos = 0; charPos < maxLength; charPos++) {
    let columnDigits = '';
    
    // Read this character position from each number line (top to bottom)
    for (const line of numberLines) {
      const char = line[charPos] || ' ';
      if (char !== ' ') {
        columnDigits += char;
      }
    }
    
    // Check if operator line also has a space at this position
    const opChar = operatorLine[charPos] || ' ';
    
    // If this column has digits, it forms a number
    if (columnDigits.length > 0) {
      numbers.push(columnDigits);
      hasFoundNumbers = true;
      
      // Get the operator at this same position
      if (!foundOperator && opChar.trim().length > 0) {
        foundOperator = opChar.trim();
      }
    } else if (hasFoundNumbers) {
      // We've hit a separator column after finding some numbers - stop here
      break;
    }
    // If we haven't found numbers yet and this is a space, continue
  }
  
  // Reverse the numbers array to get them in the expected order (rightmost first)
  numbers.reverse();
  
  if (numbers.length > 0 && foundOperator) {
    return [...numbers, foundOperator];
  }
  
  return null;
}

export function removeEquation(input: string): string {
  // Split into lines, remove first match from each line, rejoin
  const lines = input.split('\n').map(line => line.replace(re, ''));

  // Trim the first line
  if (lines.length > 0) {
    lines[0] = lines[0].trimStart();
  }
  
  // Trim the last line (operator line) if it starts with whitespace
  if (lines.length > 1) {
    lines[lines.length - 1] = lines[lines.length - 1].trimStart();
  }
  
  return lines.join('\n');
}

export function removeCephalopodEquation(input: string): string {
  const lines = input.split('\n');
  if (lines.length < 2) return '';
  
  const numberLines = lines.slice(0, -1);
  const maxLength = Math.max(...lines.map(line => line.length));
  
  let charsToRemove = 0;
  let hasFoundNumbers = false;
  
  // Find how many characters from the LEFT to remove (up to and including the separator)
  for (let charPos = 0; charPos < maxLength; charPos++) {
    let hasDigit = false;
    
    for (const line of numberLines) {
      const char = line[charPos] || ' ';
      if (char !== ' ') {
        hasDigit = true;
        break;
      }
    }
    
    if (hasDigit) {
      hasFoundNumbers = true;
      charsToRemove = charPos + 1;
    } else if (hasFoundNumbers) {
      // Hit a separator after finding numbers - include this separator in removal
      charsToRemove = charPos + 1;
      break;
    }
  }
  
  if (charsToRemove === 0) {
    return '';
  }
  
  // Remove the characters from the left of each line
  // DON'T trim - leading spaces are significant separators
  const newLines = lines.map(line => {
    if (line.length <= charsToRemove) {
      return '';
    }
    return line.slice(charsToRemove);
  });
  
  // Filter out empty lines
  const filteredLines = newLines.filter(line => line.length > 0);
  
  return filteredLines.length > 0 ? filteredLines.join('\n') : '';
}

export function calculate(equationParts: Array<string>): number {
  const operator = equationParts.pop()?.trim();
  const numbers = equationParts.map(p => p.trim());

  switch (operator) {
    case '+':
      return numbers.reduce((acc, curr) => acc + parseInt(curr), 0);
    case '*':
      return numbers.reduce((acc, curr) => acc * parseInt(curr), 1);
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

export function solveEquations(
  input: string,
  getEquationFn: (input: string) => string[] | null = getEquation,
): number {
  let total = 0;
  
  // Choose the appropriate removal function based on the extraction function
  const removeFn = getEquationFn === getCephalopodEquation ? removeCephalopodEquation : removeEquation;

  while (input.length > 0) {
    const equationParts = getEquationFn(input);

    if (!equationParts || equationParts.length === 0) break;

    const result = calculate(equationParts);
    
    total += result;
    
    input = removeFn(input);
  }

  return total;
}

// Only run when executed directly, not when imported by tests
if (require.main === module) {
  console.log('The sum of all equations is:', solveEquations(getInput()));

  console.log('The sum of all cephalopod equations is:', solveEquations(getInput(), getCephalopodEquation));
}

// Part 1
// Guess 1 = 6605396225322 is correct!

// Part 2
// Guess 1 = ? is correct!
