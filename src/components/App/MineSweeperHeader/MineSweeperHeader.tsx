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
  const handleOnLogoClick = () => {
    const confirmResult = window.confirm('Do you really want to reload page?');
    if (confirmResult) {
      window.location.reload();
    }
  };

  return (
    <header className={classes.MineSweeperHeader}>
      <div className={classes.Logo} onClick={handleOnLogoClick}>
        <img src={logo} alt="Av Mine Sweeper logo" />
      </div>

      <div className={classes.Title}>AV Mine Sweeper</div>

      <ModeControl {...props} />
    </header>
  );
};

export default MineSweeperHeader;
