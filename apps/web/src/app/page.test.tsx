import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';
import Home from './page';

test('renders the project heading on the home page', () => {
  render(<Home />);

  expect(screen.getByText('Anggit Mono')).toBeDefined();
});
