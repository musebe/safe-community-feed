// app/page.tsx

import { UploadButton } from '@/components/shared/UploadButton';

export default function Home() {
  return (
    <section className='container space-y-10 pb-16 pt-10'>
      {/* Header + upload action */}
      <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
        <div className='max-w-xl space-y-3'>
          <h1 className='text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl'>
            Community Uploads
          </h1>
          <p className='text-base text-muted-foreground sm:text-lg'>
            Upload an image to see the AI moderation in action. All uploads are
            scanned by AWS Rekognition and WebPurify.
          </p>
        </div>

        <div className='flex w-full justify-start md:w-auto md:justify-end'>
          <UploadButton />
        </div>
      </div>

      {/* Gallery area */}
      <div className='rounded-lg border border-dashed bg-muted/40 p-6 sm:p-8'>
        <div className='flex h-48 items-center justify-center text-center'>
          <p className='text-sm text-muted-foreground'>
            Image gallery will appear here after you upload.
          </p>
        </div>
      </div>
    </section>
  );
}
