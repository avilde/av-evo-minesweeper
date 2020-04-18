import React from 'react';
import logo from '../../assets/logo.svg';
import classes from './App.module.sass';

const App = () => {
  return (
    <div className={classes.App}>
      <header className={classes.Header}>
        <img src={logo} className={classes.Logo} alt="logo" />
      </header>
    </div>
  );
};

export default App;
