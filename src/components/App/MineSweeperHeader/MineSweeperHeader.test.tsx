import React from 'react';
import { render } from '@testing-library/react';
import MineSweeperHeader from './MineSweeperHeader';
import { Mode } from '../../../api/constants';

test('MineSweeperHeader renders without crashing - success ', () => {
  const { getByText } = render(
    <MineSweeperHeader
      mode={Mode.DEFAULT}
      setMode={jest.fn()}
      setShowHelp={jest.fn()}
    />
  );
  const linkElement = getByText(/AV Mine Sweeper/i);
  expect(linkElement).toBeInTheDocument();
});
