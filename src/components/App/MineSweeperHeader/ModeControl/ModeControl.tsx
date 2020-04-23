import React from 'react';
import classes from './ModeControl.module.sass';
import classNames from 'classnames';
import { Mode, modeUiMapping } from '../../../../api/constants';
import InfoIcon from '../../../../assets/info.svg';

export interface ModeControlProps {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setShowHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModeControl = (props: ModeControlProps) => {
  const { mode, setMode, setShowHelp } = props;

  return (
    <div className={classes.ModeControl}>
      <div
        className={classNames(
          classes.Mode,
          classes.Default,
          mode === Mode.DEFAULT ? classes.Active : null
        )}
        onClick={() => setMode(Mode.DEFAULT)}
      >
        <span className={classes.ModeIcon} role="img" aria-label={Mode.DEFAULT}>
          {modeUiMapping[Mode.DEFAULT]}
        </span>
        <span className={classes.Description}>{Mode.DEFAULT}</span>
      </div>

      <div
        className={classNames(
          classes.Mode,
          classes.Flag,
          mode === Mode.FLAG ? classes.Active : null
        )}
        onClick={() => setMode(Mode.FLAG)}
      >
        <span className={classes.ModeIcon} role="img" aria-label={Mode.FLAG}>
          {modeUiMapping[Mode.FLAG]}
        </span>

        <span className={classes.Description}>{Mode.FLAG}</span>
      </div>

      <div
        className={classNames(
          classes.Mode,
          classes.Question,
          mode === Mode.QUESTION ? classes.Active : null
        )}
        onClick={() => setMode(Mode.QUESTION)}
      >
        <span
          className={classes.ModeIcon}
          role="img"
          aria-label={Mode.QUESTION}
        >
          {modeUiMapping[Mode.QUESTION]}
        </span>

        <span className={classes.Description}>{Mode.QUESTION}</span>
      </div>

      <div
        className={classes.HelpIcon}
        title="Click for help"
        onClick={() => setShowHelp(true)}
      >
        <img src={InfoIcon} alt="Info Icon button" />
      </div>
    </div>
  );
};

export default ModeControl;
