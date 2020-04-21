import React from 'react';
import classes from './MineGrid.module.sass';
import GridCell from './GridCell/GridCell';
import { MapValue } from '../../../../utils/mineGridUtils';

export interface Cell {
  rowIndex: number;
  cellIndex: number;
  value: MapValue;
  flag: boolean;
  question: boolean;
  open: boolean;
}

interface MineGridProps {
  grid: Cell[][];
  onCellClick: (rowIndex: number, cellIndex: number) => void;
}

const MineGrid = (props: MineGridProps) => {
  const { grid, onCellClick } = props;

  return (
    <div className={classes.MineGrid}>
      {grid.map((rowOfCells: Cell[], rowIndex) => {
        return (
          <div key={rowIndex} className={classes.Row}>
            {rowOfCells.map((cell: Cell) => {
              return (
                <GridCell
                  key={`${cell.rowIndex}-${cell.cellIndex}`}
                  cell={cell}
                  onCellClick={onCellClick}
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
