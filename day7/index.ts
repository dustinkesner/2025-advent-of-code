import fs from 'fs';
import path from 'path';

function getInput(): string {
  return fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
}

export function getStartPosition(input?: string): number {
  return input?.indexOf('S') ?? -1;
}

export function splitInputLines(input: string): string[] {
  return input.trim().split('\n');
}

export function splitTachyonBeams(
  tachyonBeams: number[],
  manifolds: string
): { tachyonBeamPositions: Set<number>; splitCount: number } {
  const newTachyonBeams = new Set<number>();
  let splitCount = 0;

  tachyonBeams.forEach((beamPosition) => {
    if (manifolds.charAt(beamPosition) === '^') {
      // console.log(`Tachyon beam at position ${beamPosition} hits a manifold and splits.`);
      newTachyonBeams.add(beamPosition - 1);
      newTachyonBeams.add(beamPosition + 1);
      splitCount++;
    } else {
      // console.log(`Tachyon beam at position ${beamPosition} continues straight.`);
      newTachyonBeams.add(beamPosition);
    }
  });
  
  return { tachyonBeamPositions: newTachyonBeams, splitCount };
}

export function getManifoldPostions(input: string): number[] {
  const indices = Array.from(input).reduce<number[]>((acc, current, index) => {
    if (current === '^') {
      acc.push(index);
    }
    return acc;
  }, []);
  
  return indices;
}

export function countSplits(input: string): number {
  const lines = splitInputLines(input);
  let tachyonBeams: number[] = [];
  tachyonBeams.push(getStartPosition(lines[0]));
  lines.shift(); // Remove the first line as it's already processed

  let splitCount = 0;

  lines.forEach(line => {
    if (line.includes('^')) {
      const result = splitTachyonBeams(tachyonBeams, line);
      tachyonBeams = Array.from(result.tachyonBeamPositions);
      splitCount += result.splitCount;
    }
  });

  return splitCount;
}

// Only run when executed directly, not when imported by tests
if (require.main === module) {
  console.log('Total tachyon beam splits:', countSplits(getInput()));
}

// Part 1
// Guess 1 = 1499 is correct!