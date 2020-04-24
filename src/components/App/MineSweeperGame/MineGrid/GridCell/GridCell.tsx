import React, { useState, useContext, useEffect } from 'react';

import classes from './GridCell.module.sass';
import classNames from 'classnames';
import {
  MapValue,
  modeUiMapping,
  Mode,
  MineSweeperCommand,
} from '../../../../../api/constants';
import { MineSweeperContext } from '../../../../../api/MineSweeperContext';
import { getUiCharacter } from '../../../../../utils/commonUtils';

export interface GridCellProps {
  value: MapValue;
  mode: Mode;
  gameOver: boolean;
  rowIndex: number;
  cellIndex: number;
}

export interface CellState {
  cellValue: MapValue;
  open: boolean;
  flag: boolean;
  question: boolean;
}

const GridCell = React.memo((props: GridCellProps) => {
  const { value, rowIndex, cellIndex, mode, gameOver } = props;
  const [cellState, setCelLState] = useState<CellState>({
    cellValue: value,
    open: false,
    flag: false,
    question: false,
  });
  const socket = useContext(MineSweeperContext);
  const { executeCommand } = socket;
  const { cellValue, open, flag, question } = cellState;

  useEffect(() => {
    if (value !== MapValue.WHITE_BLOCK) {
      setCelLState((oldState) => {
        if (oldState.cellValue === value) {
          return oldState;
        }

        return {
          cellValue: value,
          open: true,
          flag: false,
          question: false,
        };
      });
    }
  }, [value]);

  const handleCellClick = () => {
    if (gameOver) {
      return;
    }

    if (open) {
      return;
    }

    switch (mode) {
      case Mode.DEFAULT: {
        if (flag || question) {
          return;
        }
        executeCommand.call(
          socket,
          MineSweeperCommand.OPEN,
          `${cellIndex} ${rowIndex}`
        );
        executeCommand.call(socket, MineSweeperCommand.MAP);
        break;
      }

      case Mode.FLAG: {
        setCelLState({ ...cellState, question: false, flag: !cellState.flag });
        break;
      }

      case Mode.QUESTION: {
        setCelLState({
          ...cellState,
          flag: false,
          question: !cellState.question,
        });
        break;
      }
    }
  };

  return (
    <div
      className={classNames(
        classes.GridCell,
        open ? classes.Open : classes.Closed,
        flag ? classes.Flag : null,
        question ? classes.QuestionMark : null
      )}
      cell-value={value}
      onClick={handleCellClick}
    >
      {!open && !flag && !question ? (
        <span className={classes.WhiteBlock}>
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
        <span className={classes.CharIcon}>{getUiCharacter(cellValue)}</span>
      ) : null}
    </div>
  );
});

export default GridCell;
