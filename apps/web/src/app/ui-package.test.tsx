import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';
import {Button} from '@anggit-mono/ui/components/button';

test('exports shared UI components to the web app', () => {
  render(<Button>Shared button</Button>);

  expect(screen.getByRole('button', {name: 'Shared button'})).toBeDefined();
});
