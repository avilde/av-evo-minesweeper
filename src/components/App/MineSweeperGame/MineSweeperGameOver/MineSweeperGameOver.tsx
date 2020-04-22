import React from 'react';
import classes from './MineSweeperGameOver.module.sass';

interface MineSweeperGameOverProps {
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const MineSweeperGameOver = (props: MineSweeperGameOverProps) => {
  const { setGameOver, setNewGame } = props;

  return (
    <div className={classes.MineSweeperGameOver}>
      Game Over. Start new game?
      <button
        onClick={() => {
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
