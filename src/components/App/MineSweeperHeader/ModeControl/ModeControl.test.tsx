import React from 'react';
import { render } from '@testing-library/react';
import ModeControl from './ModeControl';
import { Mode, modeUiMapping } from '../../../../api/constants';

test('ModeControl renders all 3 modes - success ', () => {
  const { getByText } = render(
    <ModeControl
      mode={Mode.DEFAULT}
      setMode={jest.fn()}
      setShowHelp={jest.fn()}
    />
  );
  const modeDefaultElement = getByText (modeUiMapping[Mode.DEFAULT])
  expect(modeDefaultElement).toBeInTheDocument();

  const modeFlagElement = getByText (modeUiMapping[Mode.FLAG])
  expect(modeFlagElement).toBeInTheDocument();

  const modeQuestionElement = getByText (modeUiMapping[Mode.QUESTION])
  expect(modeQuestionElement).toBeInTheDocument();
});
