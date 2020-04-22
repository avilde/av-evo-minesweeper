import React, { useContext } from 'react';
import classes from './MineSweeperNewGame.module.sass';
import { MineSweeperContext } from '../../../../api/MineSweeperContext';
import { MineSweeperCommand } from '../../../../utils/mineGridUtils';

interface MineSweeperNewGameProps {
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const MineSweeperNewGame = (props: MineSweeperNewGameProps) => {
  const { setGameOver, setNewGame } = props;

  const subject = useContext(MineSweeperContext);

  const newGame = (level: number) => {
    setGameOver(false);
    setNewGame(false);
    subject.sendMessage(`${MineSweeperCommand.NEW} ${level}`);
    subject.sendMessage(MineSweeperCommand.MAP);
  };

  return (
    <div className={classes.MineSweeperNewGame}>
      <div className={classes.Controls}>
        <button onClick={() => newGame(1)}>Easy</button>
        <button onClick={() => newGame(2)}>Hard</button>
        <button onClick={() => newGame(3)}>Expert</button>
        <button onClick={() => newGame(4)}>Master</button>
      </div>
    </div>
  );
};

export default MineSweeperNewGame;
