import React from 'react';
import { render } from '@testing-library/react';
import MineSweeperNewGame from './MineSweeperNewGame';


test('MineSweeperNewGame renders start buttons - success ', () => {
  const { getByText } = render(
    <MineSweeperNewGame
      setGameOver={jest.fn()}
      setNewGame={jest.fn()}
      setCurrentLevel={jest.fn()}
      setGameOverMessage={jest.fn()}
    />
  );
  const easyDifficultyButton = getByText ('Easy')
  expect(easyDifficultyButton).toBeInTheDocument();

  const normalDifficultyButton = getByText ('Normal')
  expect(normalDifficultyButton).toBeInTheDocument();

  const hardDifficultyButton = getByText ('Hard')
  expect(hardDifficultyButton).toBeInTheDocument();

  const expertDifficultyButton = getByText ('Expert')
  expect(expertDifficultyButton).toBeInTheDocument();

});
