import React from 'react';
import { render } from '@testing-library/react';
import MineSweeperGame from './MineSweeperGame';
import { Mode } from '../../../api/constants';
import classes from './MineSweeperGame.module.sass';

test('MineSweeperGame renders without crashing - success ', () => {
  const wrapper = render(
    <MineSweeperGame
      mode={Mode.DEFAULT}
      gameOver={false}
      setGameOver={jest.fn()}
      newGame={true}
      setNewGame={jest.fn()}
      gameOverMessage={''}
      setGameOverMessage={jest.fn()}
    />
  );
  
  expect(wrapper.container.querySelector(`.${classes.MineSweeperGame}`)).toBeInTheDocument();
});
