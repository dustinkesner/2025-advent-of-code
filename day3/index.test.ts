import { calculateJoltageRatingsSum, getJoltage } from './index';

describe('day 2, part 1 tests', () => {
  const testCases = [
    { bank: '987654321111111', joltage: 98},
    { bank: '811111111111119', joltage: 89 },
    { bank: '234234234234278', joltage: 78},
    { bank: '818181911112111', joltage: 92}
  ];

  test.each(testCases)(
    'it should return the largest number made from $bank',
    ({ bank, joltage: expectedJoltage }) => {
      const joltage = getJoltage(bank);
      expect(joltage).toBe(expectedJoltage);
    }
  );

  it('should return the correct sum of joltage ratings', () => {
    const totalJoltage = calculateJoltageRatingsSum(testCases.map(tc => tc.bank));
    expect(totalJoltage).toBe(357);
  });
});
