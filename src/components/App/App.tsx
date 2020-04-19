import React from 'react';
import logo from '../../assets/logo.svg';
import classes from './App.module.sass';
import MineSweeper from '../MineSweeper/MineSweeper';

const App = () => {
  return (
    <div className={classes.App}>
      <header className={classes.Header}>
        <img src={logo} className={classes.Logo} alt="logo" />
        <div className={classes.Title}>Mine Sweeper Game</div>
      </header>

      <main className={classes.Main}>
        <MineSweeper />
      </main>
    </div>
  );
};

export default App;
