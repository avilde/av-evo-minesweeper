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
  MineSweeperResponse,
} from '../../../utils/mineGridUtils';
import { SocketStatus } from '../../../api/MineSweeperService';
import { _debug } from '../../../utils/commonUtils';
import MineSweeperNewGame from './MineSweeperNewGame/MineSweeperNewGame';
import MineSweeperGameOver from './MineSweeperGameOver/MineSweeperGameOver';

export interface MineSweeperGameProps {
  mode: Mode;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  newGame: boolean;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const MineSweeperGame = (props: MineSweeperGameProps) => {
  const { gameOver, setGameOver, mode, newGame, setNewGame } = props;
  const subject = useContext(MineSweeperContext);
  const [, setMessages] = useState<string[]>([]);
  const [grid, setGrid] = useState<Cell[][]>([]);

  useEffect(() => {
    if (!gameOver || newGame) {
      setGrid([]);
    }
  }, [gameOver, newGame]);

  useEffect(() => {
    const onMessageSubscriber = {
      next: (message: string) => {
        if (message.startsWith(MineSweeperResponse.MAP.toLowerCase())) {
          setGrid((oldGrid) => transformMessageToGrid(message, oldGrid));
        }

        if (message.includes(MineSweeperResponse.GAME_OVER.toLowerCase())) {
          setGameOver(true);
        }

        return setMessages((m) => [...m, message]);
      },
    };

    const onSocketStatusSubscriber = {
      next: (status: number) => {
        _debug('socket status', status);
        if (status === SocketStatus.CONNECTED) {
          subject.subscribe(onMessageSubscriber);
        }
      },
    };
    _debug('subscribe status');
    subject.socketStatus?.subscribe(onSocketStatusSubscriber);
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
      {newGame && !gameOver ? (
        <MineSweeperNewGame setNewGame={setNewGame} setGameOver={setGameOver} />
      ) : null}

      {!newGame && gameOver ? (
        <MineSweeperGameOver
          setNewGame={setNewGame}
          setGameOver={setGameOver}
        />
      ) : null}

      {!newGame && !gameOver ? (
        <MineGrid grid={grid} onCellClick={handleCellClick} />
      ) : null}
    </div>
  );
};

export default MineSweeperGame;
