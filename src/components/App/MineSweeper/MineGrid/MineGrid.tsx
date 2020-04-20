import React from 'react';
import classes from './MineGrid.module.sass';
import GridCell from './GridCell/GridCell';

export interface Cell {
  row: number;
  col: number;
  value: string;
  flag: boolean;
  open: boolean;
}

interface MineGridProps {
  grid: Cell[][];
  onCellClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: number,
    column: number
  ) => void;
}

const MineGrid = (props: MineGridProps) => {
  const { grid, onCellClick } = props;

  return (
    <div className={classes.MineGrid}>
      {grid.map((row: Cell[], rowIndex: number) => {
        return (
          <div key={rowIndex} className={classes.Row}>
            {row.map((cell: Cell, columnIndex: number) => {
              return (
                <GridCell
                  key={columnIndex}
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
