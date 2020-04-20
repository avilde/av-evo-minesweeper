import React from 'react';
import { Cell } from '../MineGrid';
import classes from './GridCell.module.sass';
import classNames from 'classnames';

export interface GridCellProps {
  cell: Cell;
  onCellClick: (rowIndex: number, cellIndex: number) => void;
}

const GridCell = React.memo((props: GridCellProps) => {
  const { cell, onCellClick } = props;
  const { open, flag, value, question } = cell;

  return (
    <div
      className={classNames(
        classes.GridCell,
        open ? classes.Open : classes.Closed,
        flag ? classes.Flag : null,
        question ? classes.QuestionMark : null
      )}
      cell-value={value}
      onClick={(event) => !open && onCellClick(cell.rowIndex, cell.cellIndex)}
    >
      <span>{open ? value : null}</span>
    </div>
  );
});

export default GridCell;
