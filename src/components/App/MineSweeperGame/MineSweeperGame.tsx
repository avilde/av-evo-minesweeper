import React, { useContext, useEffect, useState } from 'react';
import { MineSweeperContext } from '../../../api/MineSweeperContext';
import MineGrid, { Cell } from './MineGrid/MineGrid';
import classes from './MineSweeper.module.sass';

import {
  transformMessageToGrid,
  updateGridCell,
  findCell,
  MineSweeperCommand,
  Mode,
} from '../../../utils/mineGridUtils';

export interface MineSweeperGameProps {
  mode: Mode;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const MineSweeperGame = (props: MineSweeperGameProps) => {
  const { gameOver, setGameOver, mode } = props;
  const subject = useContext(MineSweeperContext);
  const [, setMessages] = useState<string[]>([]);
  const [grid, setGrid] = useState<Cell[][]>([]);

  useEffect(() => {
    if (!gameOver) {
      setGrid([]);
    }
  }, [gameOver]);

  useEffect(() => {
    const onMessageSubscriber = {
      next: (message: string) => {
        if (message.startsWith(MineSweeperCommand.MAP)) {
          setGrid((oldGrid) => transformMessageToGrid(message, oldGrid));
        }

        if (message.includes('You lose')) {
          setGameOver(true);
        }

        return setMessages((m) => [...m, message]);
      },
    };

    subject.subscribe(onMessageSubscriber);
  }, [subject, setGameOver]);

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    if (gameOver) {
      return;
    }

    const cell = findCell(grid, rowIndex, cellIndex);

    if (!cell) {
      return;
    }

    switch (mode) {
      case Mode.DEFAULT: {
        if (cell.flag || cell.question) {
          return;
        }

        subject.sendMessage(
          `${MineSweeperCommand.OPEN} ${cell.cellIndex} ${cell.rowIndex}`
        );
        subject.sendMessage(MineSweeperCommand.MAP);
        break;
      }

      case Mode.FLAG: {
        setGrid(() =>
          updateGridCell(grid, {
            ...cell,
            flag: !cell.flag,
          })
        );
        break;
      }

      case Mode.QUESTION: {
        setGrid(() =>
          updateGridCell(grid, {
            ...cell,
            question: !cell.question,
          })
        );
        break;
      }
    }
  };

  return (
    <div className={classes.MineSweeper}>
      <MineGrid grid={grid} onCellClick={handleCellClick} />
    </div>
  );
};

export default MineSweeperGame;
