import React from 'react';
import classes from './MineGrid.module.sass';
import GridCell from './GridCell/GridCell';
import { MapValue, MapCharacterCode, Mode } from '../../../../api/constants';

interface MineGridProps {
  grid: string;
  mode: Mode;
  gameOver: boolean;
}

const MineGrid = (props: MineGridProps) => {
  const { grid, mode, gameOver } = props;

  const newGrid = grid
    .split(String.fromCharCode(MapCharacterCode.LINE_FEED))
    .reduce((result: string[][], messageRow: string, rowIndex: number) => {
      const newRow = [
        ...messageRow
          .split('')
          .reduce((r: MapValue[], character: string, cellIndex: number) => {
            r.push(character as MapValue);
            return r;
          }, []),
      ];

      if (newRow.length > 0) {
        result.push(newRow);
      }

      return result;
    }, []);

  return (
    <div className={classes.MineGrid}>
      {newGrid.map((rowOfCells: string[], rowIndex) => {
        return (
          <div key={rowIndex} className={classes.Row}>
            {rowOfCells.map((value: string, cellIndex: number) => {
              return (
                <GridCell
                  key={`${rowIndex}-${cellIndex}`}
                  value={value as MapValue}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  mode={mode}
                  gameOver={gameOver}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MineGrid;
