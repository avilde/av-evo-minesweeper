import React, { useContext, useEffect, useState } from 'react';
import { MineSweeperContext } from '../../../api/MineSweeperContext';
import MineGrid, { Cell } from './MineGrid/MineGrid';
import classes from './MineSweeperGame.module.sass';

import {
  transformMessageToGrid,
  updateGridCell,
  findCell,
} from './MineGrid/mineGridUtils';
import { _debug } from '../../../utils/commonUtils';
import MineSweeperNewGame from './MineSweeperNewGame/MineSweeperNewGame';
import MineSweeperGameOver from './MineSweeperGameOver/MineSweeperGameOver';
import {
  Mode,
  MineSweeperResponse,
  SocketStatus,
  MineSweeperCommand,
  MineSweeperLevel,
} from '../../../api/constants';
import classNames from 'classnames';

export interface MineSweeperGameProps {
  mode: Mode;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  newGame: boolean;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const MineSweeperGame = (props: MineSweeperGameProps) => {
  const { gameOver, setGameOver, mode, newGame, setNewGame } = props;
  const socket = useContext(MineSweeperContext);
  const [, setMessages] = useState<string[]>([]);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(
    MineSweeperLevel.EASY
  );

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

        if (message.toLowerCase().includes(MineSweeperResponse.GAME_OVER)) {
          setGameOver(true);
        }

        return setMessages((m) => [...m, message]);
      },
    };

    const onSocketStatusSubscriber = {
      next: (status: number) => {
        _debug('socket status', status);
        if (status === SocketStatus.CONNECTED) {
          socket.subscribe(onMessageSubscriber);
        }
      },
    };

    socket.socketStatus?.subscribe(onSocketStatusSubscriber);
  }, [socket, setGameOver]);

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

        socket.executeCommand(
          MineSweeperCommand.OPEN,
          `${cell.cellIndex} ${cell.rowIndex}`
        );
        socket.executeCommand(MineSweeperCommand.MAP);
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
    <div
      className={classNames(
        classes.MineSweeper,
        gameOver ? classes.GameOver : null
      )}
    >
      {newGame && !gameOver ? (
        <MineSweeperNewGame
          setNewGame={setNewGame}
          setGameOver={setGameOver}
          setCurrentLevel={setCurrentLevel}
        />
      ) : null}

      {!newGame ? (
        <MineSweeperGameOver
          gameOver={gameOver}
          setNewGame={setNewGame}
          setGameOver={setGameOver}
          currentLevel={currentLevel}
          setCurrentLevel={setCurrentLevel}
        />
      ) : null}

      {!newGame ? <MineGrid grid={grid} onCellClick={handleCellClick} /> : null}
    </div>
  );
};

export default MineSweeperGame;
