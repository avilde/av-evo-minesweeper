import React from 'react';
import { Cell } from '../MineGrid';
import classes from './GridCell.module.sass';
import classNames from 'classnames';

export interface GridCellProps {
  cell: Cell;
  rowIndex: number;
  columnIndex: number;
  onCellClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: number,
    column: number
  ) => void;
}

const GridCell = (props: GridCellProps) => {
  const { cell, columnIndex, rowIndex, onCellClick } = props;
  const { open, flag, value } = cell;

  return (
    <div
      key={columnIndex}
      className={classNames(
        classes.GridCell,
        open ? classes.Open : classes.Closed,
        flag ? classes.Flag : null
      )}
      cell-value={value}
      onClick={(event) => !open && onCellClick(event, columnIndex, rowIndex)}
      onContextMenu={(event) =>
        !open && onCellClick(event, columnIndex, rowIndex)
      }
    >
      <span>{open ? value : null}</span>
    </div>
  );
};

export default GridCell;
