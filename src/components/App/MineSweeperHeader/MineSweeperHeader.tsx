import React, { useContext } from 'react';
import classes from './MineSweeperHeader.module.sass';
import logo from '../../../assets/logo.svg';
import { Mode, MineSweeperCommand } from '../../../utils/mineGridUtils';
import ModeControl from './ModeControl/ModeControl';
import { MineSweeperContext } from '../../../api/MineSweeperContext';

interface MineSweeperHeaderProps {
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setShowHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const MineSweeperHeader = (props: MineSweeperHeaderProps) => {
  const { gameOver, setGameOver } = props;
  const subject = useContext(MineSweeperContext);

  const newGame = (level: number) => {
    gameOver && setGameOver(false);
    subject.sendMessage(`${MineSweeperCommand.NEW} ${level}`);
    subject.sendMessage(MineSweeperCommand.MAP);
  };

  return (
    <header className={classes.MineSweeperHeader}>
      <img src={logo} className={classes.Logo} alt="Av Mine Sweeper logo" />

      <div className={classes.Title}>AV Mine Sweeper</div>

      <div className={classes.Controls}>
        <button onClick={() => newGame(1)}>Easy</button>
        <button onClick={() => newGame(2)}>Hard</button>
        <button onClick={() => newGame(3)}>Expert</button>
        <button onClick={() => newGame(4)}>Master</button>
      </div>

      <ModeControl {...props} />
    </header>
  );
};

export default MineSweeperHeader;
