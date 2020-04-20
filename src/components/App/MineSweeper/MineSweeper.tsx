import React, { useContext, useEffect, useState } from 'react';
import { MineSweeperContext } from '../../../api/MineSweeperContext';
import MineGrid, { Cell } from './MineGrid/MineGrid';
import classes from './MineSweeper.module.sass';
import classNames from 'classnames';
import {
  transformMessageToGrid,
  updateGridCell,
  findCell,
  MineSweeperCommand,
} from '../../../utils/mineGridUtils';
import ModeControl from './MineGrid/ModeControl/ModeControl';

export enum Mode {
  DEFAULT = 'default',
  FLAG = 'flag',
  QUESTION = 'question',
}

const MineSweeper = () => {
  const subject = useContext(MineSweeperContext);
  const [, setMessages] = useState<string[]>([]);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [mode, setMode] = useState<string>(Mode.DEFAULT);

  useEffect(() => {
    subject.connect();

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

    return () => subject.disconnect();
  }, [subject]);

  const newGame = (level: number) => {
    gameOver && setGameOver(false);
    setGrid([]);
    subject.sendMessage(`${MineSweeperCommand.NEW} ${level}`);
    subject.sendMessage(MineSweeperCommand.MAP);
  };

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
      <div className={classes.Controls}>
        <button onClick={() => newGame(1)}>New Level 1</button>
        <button onClick={() => newGame(2)}>New Level 2</button>
        <button onClick={() => newGame(3)}>New Level 3</button>
        <button onClick={() => newGame(4)}>New Level 4</button>

        <span
          className={classNames(
            classes.GameOver,
            gameOver ? null : classes.Hidden
          )}
        >
          Game Over
        </span>
      </div>
      <ModeControl mode={mode} setMode={setMode} />
      <MineGrid grid={grid} onCellClick={handleCellClick} />
    </div>
  );
};

export default MineSweeper;
