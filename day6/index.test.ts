import {
  calculate,
  getEquation,
  getCephalopodEquation,
  removeEquation,
  solveEquations
} from './index';

const mathProblems = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`;

describe('day 6, part 1 tests', () => {
  it('should get equation from input', () => {
    const result = getEquation(mathProblems);
    expect(result).toEqual(['123 ', ' 45 ', '  6 ', '*  ']);
  });
  
  it.each([
    { equationParts: ['123','45','6','*'], answer: 33210},
    { equationParts: ['328','64','98','+'], answer: 490},
    { equationParts: ['51','387','215','*'], answer: 4243455},
    { equationParts: ['64','23','314','+'], answer: 401}
  ])('should solve the math problem and return $answer', ({ equationParts, answer }: { equationParts: string[]; answer: number }) => {
    const result = calculate(equationParts!);
    expect(result).toBe(answer);
  });

  it('should remove first column from string', () => {
    const result = removeEquation(mathProblems);
    const expected = `328  51 64 
64  387 23 
98  215 314
+   *   +`;
    expect(result).toBe(expected);
  });

  it('should make sure the second column is correct after removal', () => {
    const result = getEquation(removeEquation(mathProblems));
    expect(result).toEqual(['328  ', '64  ', '98  ', '+  ']);
  });

  it('should solve all equations and return the sum', () => {
    const result = solveEquations(mathProblems);
    expect(result).toBe(33210 + 490 + 4243455 + 401);
  });
});

describe('day 6, part 2 tests', () => {
  it('should get cephalopod equation from input', () => {
    const result = getCephalopodEquation(mathProblems);
    expect(result).toEqual(['356', '24', '1', '*']);
  });

  it.each([
    { equationParts: ['4','431','623','+'], answer: 1058},
    { equationParts: ['175','581','32','*'], answer: 3253600},
    { equationParts: ['8','248','369','+'], answer: 625},
    { equationParts: ['356','24','1','*'], answer: 8544}
  ])('should solve the cephalopod math problem and return $answer', ({ equationParts, answer }: { equationParts: string[]; answer: number }) => {
    const result = calculate(equationParts!);
    expect(result).toBe(answer);
  });

  it('should solve all cephalopod equations and return the sum', () => {
    const result = solveEquations(mathProblems, getCephalopodEquation);
    expect(result).toBe(1058 + 3253600 + 625 + 8544);
  });
});