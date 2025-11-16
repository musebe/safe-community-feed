// components/layout/Navbar.tsx

import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container flex items-center justify-between px-4 py-4 md:px-6'>
        <Link href='/' className='flex items-center gap-2'>
          <ShieldCheck className='h-6 w-6 text-primary' />
          <span className='text-sm font-semibold'>Safe Community Feed</span>
        </Link>

        <nav className='hidden gap-6 sm:flex'>
          <Link
            href='/'
            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
          >
            Home
          </Link>
          <Link
            href='/about'
            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
          >
            About
          </Link>
          <Link
            href='/docs'
            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
          >
            Docs
          </Link>
        </nav>

        <div className='sm:hidden'>
          <button
            type='button'
            aria-label='Open menu'
            className='p-2 text-muted-foreground hover:text-foreground transition-colors'
          >
            <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z'
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
