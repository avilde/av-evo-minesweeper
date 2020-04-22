import React from 'react';
import { Cell } from '../MineGrid';
import classes from './GridCell.module.sass';
import classNames from 'classnames';
import {
  getUiCharacter,
  modeUiMapping,
  MapValue,
  Mode,
} from '../../../../../utils/mineGridUtils';

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
      onClick={() => !open && onCellClick(cell.rowIndex, cell.cellIndex)}
    >
      {!open && !flag && !question ? (
        <span className={classes.FlagIcon}>
          {getUiCharacter(MapValue.WHITE_BLOCK)}
        </span>
      ) : null}
      {!open && flag ? (
        <span className={classes.FlagIcon}>{modeUiMapping[Mode.FLAG]}</span>
      ) : null}
      {!open && question ? (
        <span className={classes.QuestionIcon}>
          {modeUiMapping[Mode.QUESTION]}
        </span>
      ) : null}
      {open ? (
        <span className={classes.CharIcon}>{getUiCharacter(value)}</span>
      ) : null}
    </div>
  );
});

export default GridCell;
