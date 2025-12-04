import input from './input.json';

export function calculateJoltageRatingsSum(banks: string[], batteries: number = 2): number {
  let totalJoltage = 0;

  banks.forEach(bank => {
    totalJoltage += getJoltage(bank, batteries);
  });

  return totalJoltage;
}
function getMaxDigit(digits: number[]): { digit: number, position: number} {
  const digit = Math.max(...digits);
  const position = digits.indexOf(digit);

  return { digit, position };
}

export function getJoltage(bank: string, batteries: number = 2): number {
  let joltage: any[] = [];
  let digits = Array.from(bank, Number);

  if (batteries == 2) {
    // This logic works for Part 1 where we only need to pick 2 digits
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
  } else {
    // This logic works for Part 2 where we need to pick 12 digits, but this also works for Part 1
    const batteriesToActivate: { value: number; index: number }[] = [];
    
    // Scan from 9 down to 1, collecting all positions for each digit
    for (let value = 9; value >= 1 && batteriesToActivate.length < batteries; value--) {
      const stack: number[] = [];
      let toRemove = digits.length - batteries;
      
      for (const digit of digits) {
        while (stack.length && toRemove > 0 && stack[stack.length - 1] < digit) {
          stack.pop();
          toRemove -= 1;
        }

        stack.push(digit);
      }

      const result = stack.slice(0, batteries);

      return parseInt(result.join(''));
    }

    // Sort by original index to preserve left-to-right order in the bank
    const ordered = batteriesToActivate
      .slice(0, batteries)
      .sort((a, b) => a.index - b.index);

    // Assemble the largest batteries-digit number by preserving order of selected digits
    joltage = ordered.map(b => b.value);

    return parseInt(joltage.join(''));
  }
}

console.log('The sum of joltage ratings is:', calculateJoltageRatingsSum(input, 12));

// Part 1
// Guess 1 = 17034 is correct!

// Part 2
// Guess 1 = 168798209663590 is correct!