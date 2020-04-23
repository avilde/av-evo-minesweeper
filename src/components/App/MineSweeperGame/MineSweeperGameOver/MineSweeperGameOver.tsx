import React, { useContext } from 'react';
import classes from './MineSweeperGameOver.module.sass';
import classNames from 'classnames';
import {
  MineSweeperCommand,
  MineSweeperLevel,
  MineSweeperResponse,
} from '../../../../api/constants';
import { MineSweeperContext } from '../../../../api/MineSweeperContext';

interface MineSweeperGameOverProps {
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  gameOverMessage: string;
  setGameOverMessage: React.Dispatch<React.SetStateAction<string>>;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
  currentLevel: number;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
}

const MineSweeperGameOver = (props: MineSweeperGameOverProps) => {
  const {
    gameOver,
    setGameOver,
    setNewGame,
    currentLevel,
    setCurrentLevel,
    gameOverMessage,
    setGameOverMessage
  } = props;

  const socket = useContext(MineSweeperContext);
  const playerWon = gameOverMessage.toLowerCase().includes(MineSweeperResponse.YOU_WIN);
  const playerLost = gameOverMessage.toLowerCase().includes(MineSweeperResponse.YOU_LOST);

  return (
    <div
      className={classNames(
        classes.MineSweeperGameOver,
        playerWon ? classes.Winner : null,
        playerLost ? classes.Loser : null,
        gameOver ? classes.Visible : null
      )}
    >
      <div className={classes.GameOverTitle}>{gameOverMessage}</div>

      <div className={classes.ButtonContainer}>
        <button
          onClick={() => {
            socket.executeCommand(MineSweeperCommand.NEW, currentLevel);
            socket.executeCommand(MineSweeperCommand.MAP);
            setGameOver(false);
            setGameOverMessage('');
          }}
        >
          Restart
        </button>
        <button
          onClick={() => {
            setCurrentLevel(MineSweeperLevel.EASY);
            setNewGame(true);
            setGameOver(false);
            setGameOverMessage('');
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default MineSweeperGameOver;
