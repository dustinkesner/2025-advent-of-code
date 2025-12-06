import {
  calculate,
  getEquation,
  removeEquation,
  solveEquations
} from './index';

const mathProblems = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`;

describe('day 5, part 1 tests', () => {
  it('should get equation from input', () => {
    const result = getEquation(mathProblems);
    expect(result).toEqual(['123', ' 45', '  6', '*']);
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

  it('should solve all equations and return the sum', () => {
    const result = solveEquations(mathProblems);
    expect(result).toBe(33210 + 490 + 4243455 + 401);
  });
});