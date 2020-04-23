import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App - new game rendered - success ', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Choose Difficulty/i);
  expect(linkElement).toBeInTheDocument();
});
