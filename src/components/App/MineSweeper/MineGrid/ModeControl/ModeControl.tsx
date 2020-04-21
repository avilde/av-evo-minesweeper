import React from 'react';
import classes from './ModeControl.module.sass';
import classNames from 'classnames';
import { Mode, modeUiMapping } from '../../../../../utils/mineGridUtils';

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
