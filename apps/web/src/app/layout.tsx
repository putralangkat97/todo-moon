import type {Metadata} from 'next';
import {Geist_Mono, Inter} from 'next/font/google';
import {TooltipProvider} from '@anggit-mono/ui/components/tooltip';
import '@anggit-mono/ui/globals.css';
import {cn} from '@anggit-mono/ui/lib/utils';
import {appName} from '#/constants';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: appName,
  description:
    'A full-stack TypeScript monorepo boilerplate with Next.js, NestJS, Prisma, PostgreSQL, and shared UI',
};

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full antialiased font-sans',
        geistMono.variable,
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
