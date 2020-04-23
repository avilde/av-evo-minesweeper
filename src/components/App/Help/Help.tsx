import React from 'react';
import classes from './Help.module.sass';
import CloseIcon from '../../../assets/close.svg';
import { Mode } from '../../../api/constants';

interface HelpProps {
  setShowHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const Help = (props: HelpProps) => {
  const handleCloseClick = () => {
    props.setShowHelp(false);
  };

  return (
    <div className={classes.Help}>
      <div className={classes.HelpDialog}>
        <div className={classes.Header}>
          <div className={classes.Title}>Help</div>
          <div
            className={classes.CloseIcon}
            onClick={handleCloseClick}
            title="Close dialog"
          >
            <img src={CloseIcon} alt="Close help dialog" />
          </div>
        </div>
        <div className={classes.Body}>
          <h3>Tips</h3>
          <ul>
            <li>
              Uncover all fields without stepping on a mine
              <span role="img" aria-label={Mode.QUESTION}>
                💣
              </span>
            </li>

            <li>
              You can choose from 4 different difficult levels - <b>Easy</b>,
              <b>Normal</b>, <b>Hard</b>, <b>Expert</b>
            </li>

            <li>
              There are 3 different toggle modes which will help you identify
              mines:
              <ul>
                <li>
                  <span role="img" aria-label={Mode.QUESTION}>
                    💣
                  </span>
                  - default mode - uncover a field (cell)
                </li>

                <li>
                  <span role="img" aria-label={Mode.FLAG}>
                    🚩
                  </span>
                  - flag a field if you think that there is 100% a mine
                  underneath
                </li>

                <li>
                  <span role="img" aria-label={Mode.QUESTION}>
                    ❓
                  </span>- extra mode if you only have a hunch that there can be a mine
                </li>
              </ul>
            </li>

            <li>
              Check each cell neighboring cells (3 x 3 matrix) is the mine count
              match with number
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Help;
