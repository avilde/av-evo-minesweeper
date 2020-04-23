import React, { useState, useEffect, useContext } from 'react';
import classes from './App.module.sass';
import MineSweeperGame from './MineSweeperGame/MineSweeperGame';
import MineSweeperHeader from './MineSweeperHeader/MineSweeperHeader';

import { MineSweeperContext } from '../../api/MineSweeperContext';
import classNames from 'classnames';
import { Mode } from '../../api/constants';
import Help from './Help/Help';
import { mySignature } from '../../utils/commonUtils';

const App = () => {
  const [newGame, setNewGame] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameOverMessage, setGameOverMessage] = useState<string>('');
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(Mode.DEFAULT);
  const subject = useContext(MineSweeperContext);

  useEffect(() => {
    subject.connect();

    mySignature();

    return () => subject.onDisconnect();
  }, [subject]);

  return (
    <div className={classNames(classes.App, classes[mode])}>
      <MineSweeperHeader
        mode={mode}
        setMode={setMode}
        setShowHelp={setShowHelp}
      />

      <main className={classes.Main}>
        <MineSweeperGame
          mode={mode}
          gameOver={gameOver}
          setGameOver={setGameOver}
          gameOverMessage={gameOverMessage}
          setGameOverMessage={setGameOverMessage}
          newGame={newGame}
          setNewGame={setNewGame}
        />
      </main>

      {showHelp ? <Help setShowHelp={setShowHelp} /> : null}
    </div>
  );
};

export default App;
