import fs from 'fs';
import path from 'path';

function getInput(): string {
  return fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
}

export function countXs(matrix: string[][]): number {
  let count = 0;

  matrix.forEach(row => {
    row.forEach(cell => {
      if (cell === 'x') {
        count ++;
      }
    });
  });

  return count;
}

export function createMatrix(matrixString: string): string[][] {
  // console.log('Creating matrix from string:\n', matrixString);
  const matrix = matrixString.trim().split('\n').map(line => line.trim().split(''));
  // console.log('Created matrix:', matrix);
  return matrix;
}

export function movePaperRolls(matrix: string[][]): string[][] {
  const adjacents = [[-1, -1], [-1, 0], [-1, 1],
                     [ 0, -1],          [ 0, 1],
                     [ 1, -1], [ 1, 0], [ 1, 1]];
                     
  // Create a deep copy so we don't mutate the original matrix while iterating
  const newMatrix = matrix.map(row => [...row]);
  
  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      let adjacentPaperRollCount = 0;

      // Look at 8 adjacent positions for paper rolls (@)
      if (cell === '@') {
        adjacents.forEach(([adjacentRow, adjacentCol]) => {
          matrix[rowIndex + adjacentRow]?.[colIndex + adjacentCol] === '@' && adjacentPaperRollCount++;
        });

        adjacentPaperRollCount < 4 && (newMatrix[rowIndex][colIndex] = 'x');
      }
    });
  });

  return newMatrix;
}

// Only run when executed directly, not when imported by tests
if (require.main === module) {
  const count = countXs(movePaperRolls(createMatrix(getInput())));
  console.log('The count of x\'s after moving paper rolls is:', count);
}

// Part 1
// Guess 1 = 1363 is correct!