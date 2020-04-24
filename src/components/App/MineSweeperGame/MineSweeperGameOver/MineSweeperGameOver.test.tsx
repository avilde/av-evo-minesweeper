import React from 'react';
import { render } from '@testing-library/react';
import MineSweeperGameOver from './MineSweeperGameOver';
import { MineSweeperResponse } from '../../../../api/constants';

test('MineSweeperGameOver renders start buttons - success ', () => {
  const { getByText } = render(
    <MineSweeperGameOver
      gameOver={true}
      setGameOver={jest.fn()}
      setNewGame={jest.fn()}
      currentLevel={0}
      setCurrentLevel={jest.fn()}
      gameOverMessage={MineSweeperResponse.YOU_WIN}
      setGameOverMessage={jest.fn()}
    />
  );

  const messageElement = getByText(/you win/i);
  expect(messageElement).toBeInTheDocument();
});
