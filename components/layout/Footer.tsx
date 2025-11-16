// components/layout/Footer.tsx

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t bg-background/80 backdrop-blur'>
      <div className='container flex flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6'>
        <div className='space-y-1 text-center md:text-left'>
          <p className='text-sm font-medium'>
            Built to demonstrate AI powered moderation with Cloudinary.
          </p>
          <p className='text-xs text-muted-foreground'>
            © {year} Cloudinary AI Moderation Demo
          </p>
        </div>

        <div className='flex items-center justify-center gap-4 md:justify-end'>
          <a
            href='#'
            className='text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            Docs
          </a>
          <span className='h-4 w-px bg-border' />
          <a
            href='#'
            className='text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            GitHub
          </a>
          <span className='h-4 w-px bg-border' />
          <a
            href='#'
            className='text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
