import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {afterEach, beforeAll, describe, expect, test, vi} from 'vitest';
import {TooltipProvider} from '@anggit-mono/ui/components/tooltip';

import CompletedPage from './completed/page';
import InboxPage from './inbox/page';
import ProjectsPage from './projects/page';
import TodayPage from './today/page';
import UpcomingPage from './upcoming/page';

describe('dashboard pages', () => {
  afterEach(cleanup);

  beforeAll(() => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  test.each([
    [InboxPage, 'No tickets in Inbox'],
    [TodayPage, 'No tickets today'],
    [UpcomingPage, 'No upcoming tickets'],
    [CompletedPage, 'No completed tickets'],
  ])('renders the dedicated ticket page', (Page, title) => {
    render(<Page />, {wrapper: TooltipProvider});

    expect(screen.getByText(title)).toBeDefined();
  });

  test('selects and clears an assignee', async () => {
    render(<InboxPage />, {wrapper: TooltipProvider});

    expect(screen.getByText('Assignee')).toBeDefined();
    const input = screen.getByPlaceholderText('Select an assignee');

    fireEvent.keyDown(input, {key: 'ArrowDown'});
    fireEvent.click(await screen.findByText('shadcn@vercel.com'));

    expect(screen.getByText('shadcn')).toBeDefined();
    expect(screen.queryByPlaceholderText('Select an assignee')).toBeNull();

    fireEvent.click(screen.getByRole('button', {name: 'Remove assignee'}));

    expect(screen.getByPlaceholderText('Select an assignee')).toBeDefined();
  });

  test('renders the projects page', () => {
    render(<ProjectsPage />, {wrapper: TooltipProvider});

    expect(screen.getByText('No projects yet')).toBeDefined();
    expect(screen.getByRole('button', {name: 'Create project'})).toBeDefined();
  });
});
