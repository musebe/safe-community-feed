// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Safe Community Feed - AI Moderation Demo',
  description: 'AI-Powered UGC Moderation with Next.js and Cloudinary',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <div className='relative flex min-h-screen flex-col'>
          <Navbar />
          <main className='flex-1'>
            <div className='container mx-auto flex flex-col gap-8 px-4 py-10 md:gap-10 md:py-14'>
              {children}
            </div>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>

        <Toaster richColors />
      </body>
    </html>
  );
}
