import React from 'react';
import classes from './Help.module.sass';

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
        <div className={classes.Header} onClick={handleCloseClick}>
          Help
        </div>
        <div className={classes.Body}>Legend</div>
      </div>
    </div>
  );
};

export default Help;
