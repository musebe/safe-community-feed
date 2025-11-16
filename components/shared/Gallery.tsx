// components/shared/Gallery.tsx
import { getImages } from '@/lib/actions';
import { ImageCard } from '@/components/shared/ImageCard';

export async function Gallery() {
  const images = await getImages();

  if (!images.length) {
    return (
      <div className='rounded-lg border border-dashed bg-muted/40 p-6 sm:p-8'>
        <div className='flex h-48 items-center justify-center text-center'>
          <p className='text-sm text-muted-foreground'>
            Image gallery will appear here after you upload.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='rounded-lg border bg-muted/40 p-4 sm:p-6'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
