import { Cell } from './MineGrid';
import {
  MineSweeperCommand,
  MapCharacterCode,
  MapValue,
} from '../../../../api/constants';

export const transformMessageToGrid = (
  message: string,
  oldGrid: Cell[][]
): Cell[][] => {
  message = message.replace(`${MineSweeperCommand.MAP}:\n`, '');

  const newGrid = message
    .split(String.fromCharCode(MapCharacterCode.LINE_FEED))
    .reduce((result: Cell[][], messageRow: string, rowIndex: number) => {
      const newRow = [
        ...messageRow
          .split('')
          .reduce((r: Cell[], character: string, cellIndex: number) => {
            r.push({
              rowIndex: rowIndex,
              cellIndex: cellIndex,
              open: character.charCodeAt(0) !== MapCharacterCode.WHITE_BLOCK,
              flag: false,
              question: false,
              value: character as MapValue,
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

export const mergeGrids = (
  existingGrid: Cell[][],
  newGrid: Cell[][]
): Cell[][] => {
  newGrid.flat().map((cell: Cell) => {
    if (!cell.open) {
      return cell;
    }

    const oldCell = findCell(existingGrid, cell.rowIndex, cell.cellIndex);
    if (oldCell) {
      existingGrid[cell.rowIndex][cell.cellIndex] = {
        ...oldCell,
        open: cell.open,
        value: cell.value,
      };
    }
    return oldCell;
  });

  return existingGrid;
};

export const deepCopy = (array: any[]) => {
  return JSON.parse(JSON.stringify(array));
};
