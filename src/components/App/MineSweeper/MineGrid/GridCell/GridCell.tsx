import React from 'react';
import { Cell } from '../MineGrid';
import classes from './GridCell.module.sass';
import classNames from 'classnames';

export interface GridCellProps {
  cell: Cell;
  onCellClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: number,
    column: number
  ) => void;
}

const GridCell = (props: GridCellProps) => {
  const { cell, onCellClick } = props;
  const { open, flag, value, row, col } = cell;

  return (
    <div
      className={classNames(
        classes.GridCell,
        open ? classes.Open : classes.Closed,
        flag ? classes.Flag : null
      )}
      cell-value={value}
      onClick={(event) => !open && onCellClick(event, col, row)}
      onContextMenu={(event) =>
        !open && onCellClick(event, col, row)
      }
    >
      <span>{open ? value : null}</span>
    </div>
  );
};

export default GridCell;
