import React from 'react';
import classes from './ModeControl.module.sass';
import classNames from 'classnames';
import { Mode } from '../../MineSweeper';

export interface ModeControlProps {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const ModeControl = (props: ModeControlProps) => {
  const { mode, setMode } = props;

  return (
    <div className={classes.ModeControl}>
      <div>Mode: </div>
      <div
        className={classNames(
          classes.Mode,
          classes.Default,
          mode === Mode.DEFAULT ? classes.Active : null
        )}
        onClick={() => setMode(Mode.DEFAULT)}
      >
        💣default
      </div>
      <div
        className={classNames(
          classes.Mode,
          classes.Flag,
          mode === Mode.FLAG ? classes.Active : null
        )}
        onClick={() => setMode(Mode.FLAG)}
      >
        🚩flag
      </div>
      <div
        className={classNames(
          classes.Mode,
          classes.Question,
          mode === Mode.QUESTION ? classes.Active : null
        )}
        onClick={() => setMode(Mode.QUESTION)}
      >
        ❓question
      </div>
    </div>
  );
};

export default ModeControl;
