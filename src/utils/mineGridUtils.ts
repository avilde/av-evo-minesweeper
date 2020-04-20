import { Cell } from '../components/App/MineSweeper/MineGrid/MineGrid';

export const transformMessageToGrid = (
  message: string,
  existingGrid?: Cell[][]
): Cell[][] => {
  message = message.replace('map:\n', '');

  return message
    .split(String.fromCharCode(10))
    .reduce((result: Cell[][], messageRow: string, rowIndex: number) => {
      const newRow = [
        ...messageRow
          .split('')
          .reduce((r: Cell[], character: string, cellIndex: number) => {
            r.push({
              rowIndex: rowIndex,
              cellIndex: cellIndex,
              open: character.charCodeAt(0) !== 9633,
              flag:
                (existingGrid &&
                  existingGrid.length > 0 &&
                  existingGrid[rowIndex][cellIndex].flag) ||
                false,
              question:
                (existingGrid &&
                  existingGrid.length > 0 &&
                  existingGrid[rowIndex][cellIndex].question) ||
                false,
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
};

export const updateGridCell = (grid: Cell[][], cell: Cell): Cell[][] => {
  const newGrid = JSON.parse(JSON.stringify(grid));
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
