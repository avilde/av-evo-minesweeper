import React, { useContext } from 'react';
import classes from './MineSweeperNewGame.module.sass';
import { MineSweeperContext } from '../../../../api/MineSweeperContext';
import {
  MineSweeperCommand,
  MineSweeperLevel,
} from '../../../../api/constants';
import MineSweeperImage from '../../../../assets/minesweeper.png';

interface MineSweeperNewGameProps {
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  setGameOverMessage: React.Dispatch<React.SetStateAction<string>>;
}

const MineSweeperNewGame = (props: MineSweeperNewGameProps) => {
  const {
    setGameOver,
    setNewGame,
    setCurrentLevel,
    setGameOverMessage,
  } = props;

  const socket = useContext(MineSweeperContext);

  const newGame = (level: MineSweeperLevel) => {
    setGameOver(false);
    setGameOverMessage('');
    setCurrentLevel(level);
    setNewGame(false);
    socket.executeCommand(MineSweeperCommand.NEW, level);
    socket.executeCommand(MineSweeperCommand.MAP);
  };

  return (
    <div className={classes.MineSweeperNewGame}>
      <img src={MineSweeperImage} alt="AV Mine Sweeper" />

      <p>Choose Difficulty</p>
      
      <div className={classes.Controls}>
        <button onClick={() => newGame(MineSweeperLevel.EASY)}>Easy</button>
        <button onClick={() => newGame(MineSweeperLevel.NORMAL)}>Normal</button>
        <button onClick={() => newGame(MineSweeperLevel.HARD)}>Hard</button>
        <button onClick={() => newGame(MineSweeperLevel.EXPERT)}>Expert</button>
      </div>
    </div>
  );
};

export default MineSweeperNewGame;
