import { Cell } from '../components/App/MineSweeper/MineGrid/MineGrid';

export enum CharacterCodes {
  LINE_FEED = 10,
  WHITE_BLOCK = 9633,
}

export const transformMessageToGrid = (
  message: string,
  oldGrid: Cell[][]
): Cell[][] => {
  message = message.replace('map:\n', '');

  const newGrid = message
    .split(String.fromCharCode(CharacterCodes.LINE_FEED))
    .reduce((result: Cell[][], messageRow: string, rowIndex: number) => {
      const newRow = [
        ...messageRow
          .split('')
          .reduce((r: Cell[], character: string, cellIndex: number) => {
            r.push({
              rowIndex: rowIndex,
              cellIndex: cellIndex,
              open: character.charCodeAt(0) !== CharacterCodes.WHITE_BLOCK,
              flag: false,
              question: false,
              value: character,
            });
            return r;
          }, []),
      ];

      if (newRow.length > 0) {
        result.push(newRow);
      }

      return result;
    }, []);

  if (oldGrid.length === 0) {
    return newGrid;
  }

  return mergeGrids(oldGrid, newGrid);
};

export const updateGridCell = (grid: Cell[][], cell: Cell): Cell[][] => {
  const newGrid = deepCopy(grid);
  newGrid[cell.rowIndex][cell.cellIndex] = cell;
  return newGrid;
};

export const findCell = (
  grid: Cell[][],
  rowIndex: number,
  cellIndex: number
): Cell | undefined => {
  const row = grid[rowIndex];
  if (typeof row === 'undefined') {
    return;
  }

  return row[cellIndex];
};

export const mergeGrids = (oldGrid: Cell[][], newGrid: Cell[][]): Cell[][] => {
  const newGridCopy = deepCopy(oldGrid);

  newGrid.flat().map((cell: Cell) => {
    const oldCell = findCell(newGridCopy, cell.rowIndex, cell.cellIndex);
    if (oldCell) {
      newGridCopy[cell.rowIndex][cell.cellIndex] = {
        ...oldCell,
        open: cell.open,
        value: cell.value,
      };
    }
  });

  return newGridCopy;
};

export const deepCopy = (array: any[]) => {
  return JSON.parse(JSON.stringify(array));
};
