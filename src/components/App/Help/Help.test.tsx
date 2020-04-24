import React from 'react';
import { render } from '@testing-library/react';
import Help from './Help';

test('Help - tips rendered - success ', () => {
  const { getByText } = render(<Help setShowHelp={jest.fn()} />);
  const textElement = getByText(/Tips/i);
  expect(textElement).toBeInTheDocument();
});
