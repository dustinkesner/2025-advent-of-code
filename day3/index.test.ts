import { calculateJoltageRatingsSum, getJoltage } from './index';

describe('day 3, part 1 tests', () => {
  const testCases = [
    { bank: '987654321111111', joltage: 98 },
    { bank: '811111111111119', joltage: 89 },
    { bank: '234234234234278', joltage: 78 },
    { bank: '818181911112111', joltage: 92 },
  ];

  test.each(testCases)(
    'it should return the largest number made from $bank',
    ({ bank, joltage: expectedJoltage }) => {
      const joltage = getJoltage(bank);
      expect(joltage).toBe(expectedJoltage);
    }
  );

  it('should return the correct sum of joltage ratings', () => {
    const totalJoltage = calculateJoltageRatingsSum(
      testCases.map((tc) => tc.bank)
    );
    expect(totalJoltage).toBe(357);
  });
});

describe('day 3, part 2 tests', () => {
  const testCases = [
    { bank: '987654321111111', joltage: 987654321111, batteries: 12 },
    { bank: '811111111111119', joltage: 811111111119, batteries: 12 },
    { bank: '234234234234278', joltage: 434234234278, batteries: 12 },
    { bank: '818181911112111', joltage: 888911112111, batteries: 12 },
  ];

  test.each(testCases)(
    'it should return the largest $batteries digit number made from $bank',
    ({ bank, joltage: expectedJoltage, batteries }) => {
      const joltage = getJoltage(bank, batteries);
      expect(joltage).toBe(expectedJoltage);
    }
  );

  it('should return the correct sum of joltage ratings', () => {
    const totalJoltage = calculateJoltageRatingsSum(
      testCases.map((tc) => tc.bank),
      12
    );
    expect(totalJoltage).toBe(3121910778619);
  });
});
