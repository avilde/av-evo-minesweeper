import React from 'react';
import { render } from '@testing-library/react';
import { Mode } from '../../../../api/constants';
import MineGrid from './MineGrid';

test('MineGrid renders start buttons - success ', () => {
  const wrapper = render(
    <MineGrid gameOver={true} grid={''} mode={Mode.DEFAULT} />
  );

  expect(wrapper.container).toBeInTheDocument();
});
