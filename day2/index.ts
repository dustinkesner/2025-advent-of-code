const input = '853-1994,1919078809-1919280414,1212082623-1212155811,2389-4173,863031-957102,9393261874-9393318257,541406-571080,1207634-1357714,36706-61095,6969667126-6969740758,761827-786237,5516637-5602471,211490-235924,282259781-282327082,587606-694322,960371-1022108,246136-353607,3-20,99-182,166156087-166181497,422-815,82805006-82876926,14165-30447,4775-7265,83298136-83428425,2439997-2463364,44-89,435793-511395,3291059-3440895,77768624-77786844,186-295,62668-105646,7490-11616,23-41,22951285-23017127'

export function parseRanges(rangeStr: string): Array<[number, number]> {
  return rangeStr.split(',').map(range => {
    const [start, end] = range.split('-').map(Number);
    return [start, end] as [number, number];
  });
}

export function splitId(id: number): [string, string] {
  const idStr = id.toString();
  const len = idStr.length;
  const firstHalf = idStr.substring(0, len / 2);
  // const secondHalf = idStr.slice(len - Math.floor(len / 2));
  // const secondHalf = idStr.slice(len - Math.round(len / 2));
  const secondHalf = idStr.slice(len / 2);

  return [firstHalf, secondHalf];
}

export function isIdInvalid(id: number): boolean {
  const idStr = id.toString();
  const len = idStr.length;

  for (let i = 1; i < len; i++) {
    const idPartsArray = idStr.split(idStr.substring(0, i))

    if (new Set(idPartsArray).size === 1) {
      return true;
    }
  }

  return false;
}

export function getInvalidIdsInRange(rangeStart: number, rangeEnd: number) {
  const invalidIds: number[] = [];

  for (let id = rangeStart; id <= rangeEnd; id++) {
    /** Part 1 solution **/
    // const [firstHalf, secondHalf] = splitId(id);
    
    // if (firstHalf === secondHalf) {
    //   invalidIds.push(id);
    // }

    /** Part 2 solution **/
    if (isIdInvalid(id)) {
      invalidIds.push(id);
    }
  }

  return invalidIds;
}

export function addInvalidIds(productIdRange: string): number {
  let sumOfInvalidIds = 0;

  parseRanges(productIdRange).forEach(([start, end]) => {
    const invalidIds = getInvalidIdsInRange(start, end);

    invalidIds.forEach(id => {
      sumOfInvalidIds += id;
    });
  });

  return sumOfInvalidIds;
}

console.log(addInvalidIds(input));

// Part 1
// Guess 1 = 23701357374 is correct!

// Part 2
// Guess 1 = 34284458938 is correct!