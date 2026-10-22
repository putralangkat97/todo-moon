import type {GreetingResponse} from '@anggit-mono/types';
import {connection} from 'next/server';
import {Suspense} from 'react';

async function HelloFromApi() {
  await connection();
  const response = await fetch(`${process.env.API_URL ?? 'http://localhost:4000'}/hello`);

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  const greeting: GreetingResponse = await response.text();

  return <p>{greeting}</p>;
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-4 px-16 py-32">
        <h1 className="text-3xl font-semibold">Anggit Mono</h1>
        <Suspense fallback={<p>Connecting to API...</p>}>
          <HelloFromApi />
        </Suspense>
      </main>
    </div>
  );
}
