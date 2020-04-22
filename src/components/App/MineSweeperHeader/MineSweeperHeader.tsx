import React from 'react';
import classes from './MineSweeperHeader.module.sass';
import logo from '../../../assets/logo.svg';

import ModeControl from './ModeControl/ModeControl';
import { Mode } from '../../../api/constants';

interface MineSweeperHeaderProps {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setShowHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const MineSweeperHeader = (props: MineSweeperHeaderProps) => {
  return (
    <header className={classes.MineSweeperHeader}>
      <img src={logo} className={classes.Logo} alt="Av Mine Sweeper logo" />

      <div className={classes.Title}>AV Mine Sweeper</div>

      <ModeControl {...props} />
    </header>
  );
};

export default MineSweeperHeader;
