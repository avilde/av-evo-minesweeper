import React from 'react';
import classes from './ModeControl.module.sass';
import classNames from 'classnames';
import { Mode, modeUiMapping } from '../../../../api/constants';

export interface ModeControlProps {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setShowHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModeControl = (props: ModeControlProps) => {
  const { mode, setMode, setShowHelp } = props;

  return (
    <div className={classes.ModeControl}>
      <div className={classes.ModeLabel}>
        <div
          className={classes.Info}
          aria-label="Info Icon"
          role="img"
          title="Click for help"
          onClick={() => setShowHelp(true)}
        >
          🛈
        </div>
        Mode
      </div>
      <div
        className={classNames(
          classes.Mode,
          classes.Default,
          mode === Mode.DEFAULT ? classes.Active : null
        )}
        onClick={() => setMode(Mode.DEFAULT)}
      >
        <span role="img" aria-label="Bomb">
          {modeUiMapping[Mode.DEFAULT]}
        </span>
        default
      </div>
      <div
        className={classNames(
          classes.Mode,
          classes.Flag,
          mode === Mode.FLAG ? classes.Active : null
        )}
        onClick={() => setMode(Mode.FLAG)}
      >
        <span role="img" aria-label="Flag">
          {modeUiMapping[Mode.FLAG]}
        </span>
        flag
      </div>
      <div
        className={classNames(
          classes.Mode,
          classes.Question,
          mode === Mode.QUESTION ? classes.Active : null
        )}
        onClick={() => setMode(Mode.QUESTION)}
      >
        <span role="img" aria-label="Question">
          {modeUiMapping[Mode.QUESTION]}
        </span>
        question
      </div>
    </div>
  );
};

export default ModeControl;
