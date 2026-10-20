import type {DashboardView} from '#/components/dashboard/dashboard-shell';
import DashboardShell from '#/components/dashboard/dashboard-shell';
import {Suspense} from 'react';

function getDashboardView(view: string | string[] | undefined): DashboardView {
  const value = Array.isArray(view) ? view[0] : view;

  return value === 'today' ||
    value === 'upcoming' ||
    value === 'completed' ||
    value === 'projects'
    ? value
    : 'inbox';
}

export async function DashboardPageContent({
  searchParams,
}: {
  searchParams: Promise<{view?: string | string[]}>;
}) {
  const {view} = await searchParams;

  return <DashboardShell currentView={getDashboardView(view)} />;
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{view?: string | string[]}>;
}) {
  return (
    <Suspense fallback={<DashboardShell currentView="inbox" />}>
      <DashboardPageContent searchParams={searchParams} />
    </Suspense>
  );
}
