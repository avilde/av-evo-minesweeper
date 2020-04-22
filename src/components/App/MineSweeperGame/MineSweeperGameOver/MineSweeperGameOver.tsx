import React, { useContext } from 'react';
import classes from './MineSweeperGameOver.module.sass';
import classNames from 'classnames';
import {
  MineSweeperCommand,
  MineSweeperLevel,
} from '../../../../api/constants';
import { MineSweeperContext } from '../../../../api/MineSweeperContext';

interface MineSweeperGameOverProps {
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
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
  } = props;

  const socket = useContext(MineSweeperContext);

  return (
    <div
      className={classNames(
        classes.MineSweeperGameOver,
        gameOver ? classes.Visible : null
      )}
    >
      Game Over
      <button
        onClick={() => {
          socket.executeCommand(MineSweeperCommand.NEW, currentLevel);
          socket.executeCommand(MineSweeperCommand.MAP);
          setGameOver(false);
        }}
      >
        Restart
      </button>
      <button
        onClick={() => {
          setCurrentLevel(MineSweeperLevel.EASY);
          setNewGame(true);
          setGameOver(false);
        }}
      >
        New Game
      </button>
    </div>
  );
};

export default MineSweeperGameOver;
