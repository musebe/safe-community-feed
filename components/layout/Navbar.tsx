// components/layout/Navbar.tsx

import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <Link href='/' className='mr-6 flex items-center space-x-2'>
          <ShieldCheck className='h-6 w-6 text-primary' />
          <span className='font-bold sm:inline-block'>Safe Community Feed</span>
        </Link>
        {/* We can add nav links here later if we expand the app */}
      </div>
    </header>
  );
}
