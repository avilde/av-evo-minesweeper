import React, { useState, useEffect, useContext } from 'react';
import classes from './App.module.sass';
import MineSweeperGame from './MineSweeperGame/MineSweeperGame';
import MineSweeperHeader from './MineSweeperHeader/MineSweeperHeader';
import { Mode } from '../../utils/mineGridUtils';
import { MineSweeperContext } from '../../api/MineSweeperContext';
import classNames from 'classnames';

const App = () => {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(Mode.DEFAULT);
  const subject = useContext(MineSweeperContext);

  useEffect(() => {
    subject.connect();

    return () => subject.disconnect();
  }, [subject]);

  return (
    <div className={classNames(classes.App, classes[mode])}>
      <MineSweeperHeader
        mode={mode}
        setMode={setMode}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />

      <main className={classes.Main}>
        <MineSweeperGame
          mode={mode}
          gameOver={gameOver}
          setGameOver={setGameOver}
        />
      </main>
    </div>
  );
};

export default App;
