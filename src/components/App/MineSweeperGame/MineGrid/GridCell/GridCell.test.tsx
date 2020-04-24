import React from 'react';
import { render } from '@testing-library/react';
import GridCell from './GridCell';
import { MapValue, Mode } from '../../../../../api/constants';

test('GridCell renders input value', () => {
  const wrapper = render(
    <GridCell
      value={MapValue.WHITE_BLOCK}
      rowIndex={0}
      cellIndex={0}
      gameOver={false}
      mode={Mode.DEFAULT}
    />
  );

  const cellValueAttribute = wrapper.container.getAttribute('cell-value');

  expect(cellValueAttribute).toBe(cellValueAttribute);
});
