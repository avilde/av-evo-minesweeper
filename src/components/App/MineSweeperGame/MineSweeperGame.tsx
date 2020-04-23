import React, { useContext, useEffect, useState } from 'react';
import { MineSweeperContext } from '../../../api/MineSweeperContext';
import MineGrid from './MineGrid/MineGrid';
import classes from './MineSweeperGame.module.sass';

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
  gameOverMessage: string;
  setGameOverMessage: React.Dispatch<React.SetStateAction<string>>;
  newGame: boolean;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const MineSweeperGame = (props: MineSweeperGameProps) => {
  const {
    mode,
    gameOver,
    setGameOver,
    newGame,
    setNewGame,
    gameOverMessage,
    setGameOverMessage,
  } = props;
  const socket = useContext(MineSweeperContext);
  const [grid, setGrid] = useState<string>('');
  const [currentLevel, setCurrentLevel] = useState<number>(
    MineSweeperLevel.EASY
  );

  useEffect(() => {
    if (!gameOver || newGame) {
      setGrid('');
    }
  }, [gameOver, newGame]);

  useEffect(() => {
    const onMessageSubscriber = {
      next: (message: string) => {
        if (message.startsWith(MineSweeperResponse.MAP.toLowerCase())) {
          const newGrid = message.replace(`${MineSweeperCommand.MAP}:\n`, '');
          setGrid(newGrid);
        }

        if (
          message.toLowerCase().includes(MineSweeperResponse.YOU_LOST) ||
          message.toLowerCase().includes(MineSweeperResponse.YOU_WIN)
        ) {
          const newGameOverMessage = message.replace(
            `${MineSweeperCommand.OPEN}:`,
            ''
          );
          setGameOver(true);
          setGameOverMessage(newGameOverMessage);
        }
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
  }, [socket, grid, setGameOver, setGameOverMessage]);

  return (
    <div
      className={classNames(
        classes.MineSweeper,
        gameOver ? classes.GameOver : null,
        newGame ? classes.NewGame: null
      )}
    >
      {newGame && !gameOver ? (
        <MineSweeperNewGame
          setNewGame={setNewGame}
          setGameOver={setGameOver}
          setCurrentLevel={setCurrentLevel}
          setGameOverMessage={setGameOverMessage}
        />
      ) : null}

      {!newGame ? (
        <MineSweeperGameOver
          gameOver={gameOver}
          setNewGame={setNewGame}
          setGameOver={setGameOver}
          gameOverMessage={gameOverMessage}
          setGameOverMessage={setGameOverMessage}
          currentLevel={currentLevel}
          setCurrentLevel={setCurrentLevel}
        />
      ) : null}

      {!newGame ? (
        <MineGrid grid={grid} mode={mode} gameOver={gameOver} />
      ) : null}
    </div>
  );
};

export default MineSweeperGame;
