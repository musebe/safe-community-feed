// app/page.tsx

export default function Home() {
  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <div className='flex max-w-[980px] flex-col items-start gap-2'>
        <h1 className='text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl'>
          Community Uploads
        </h1>
        <p className='max-w-[700px] text-lg text-muted-foreground sm:text-xl'>
          Upload an image to see the AI moderation in action. All uploads are
          scanned by AWS Rekognition and WebPurify.
        </p>
      </div>

      {/* Upload Button will go here */}
      <div className='mt-8 w-full max-w-[700px]'>
        <p className='text-center text-muted-foreground'>
          [Upload Component Placeholder]
        </p>
      </div>

      {/* Image Gallery will go here */}
      <div className='mt-12'>
        <p className='text-center text-muted-foreground'>
          [Image Gallery Placeholder]
        </p>
      </div>
    </section>
  );
}
