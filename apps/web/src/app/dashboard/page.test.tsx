import {cleanup, render, screen} from '@testing-library/react';
import {afterEach, beforeAll, describe, expect, test, vi} from 'vitest';
import {TooltipProvider} from '@anggit-mono/ui/components/tooltip';
import {DashboardPageContent} from './page';

describe('dashboard', () => {
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
    ['inbox', 'No tickets in Inbox'],
    ['today', 'No tickets today'],
    ['upcoming', 'No upcoming tickets'],
    ['completed', 'No completed tickets'],
  ])('renders the %s ticket empty state', async (view, title) => {
    render(
      await DashboardPageContent({searchParams: Promise.resolve({view})}),
      {
        wrapper: TooltipProvider,
      },
    );

    expect(screen.getByText(title)).toBeDefined();
  });

  test('renders the projects empty state and dashboard links', async () => {
    render(
      await DashboardPageContent({
        searchParams: Promise.resolve({view: 'projects'}),
      }),
      {wrapper: TooltipProvider},
    );

    expect(screen.getByText('No projects yet')).toBeDefined();
    expect(screen.getByRole('button', {name: 'Create project'})).toBeDefined();
    expect(screen.getByRole('link', {name: 'Today'}).getAttribute('href')).toBe(
      '/dashboard?view=today',
    );
  });

  test('falls back to Inbox for an unknown view', async () => {
    render(
      await DashboardPageContent({
        searchParams: Promise.resolve({view: 'unknown'}),
      }),
      {wrapper: TooltipProvider},
    );

    expect(screen.getByText('No tickets in Inbox')).toBeDefined();
  });
});
