// components/shared/ImageCard.tsx

'use client';

import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { SavedImage } from '@/lib/actions';

type ImageCardProps = {
  image: SavedImage;
};

export function ImageCard({ image }: ImageCardProps) {
  const getBadgeVariant = (
    status: SavedImage['moderationStatus']
  ): 'default' | 'destructive' | 'secondary' => {
    if (status === 'approved') return 'default';
    if (status === 'rejected') return 'destructive';
    return 'secondary';
  };

  const getStatusLabel = (status: SavedImage['moderationStatus']) => {
    if (status === 'approved') return 'Approved';
    if (status === 'rejected') return 'Rejected';
    return 'Pending review';
  };

  const isRejected = image.moderationStatus === 'rejected';

  const showAws = image.aws_rekognition_status !== 'not_used';
  const showWeb = image.webpurify_status !== 'not_used';

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 px-4 py-3'>
        <div className='flex items-center gap-2'>
          <Badge
            variant={getBadgeVariant(image.moderationStatus)}
            className='text-[11px] uppercase tracking-wide'
          >
            {getStatusLabel(image.moderationStatus)}
          </Badge>
          <span className='text-xs uppercase text-muted-foreground'>
            {image.format}
          </span>
        </div>
        <span className='text-xs text-muted-foreground'>
          {image.width} × {image.height}
        </span>
      </CardHeader>

      {/* Clickable image with dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <CardContent className='p-0 cursor-pointer'>
            <div className='relative aspect-video'>
              {isRejected ? (
                <Image
                  src='/reject.png'
                  alt='Rejected content'
                  fill
                  sizes='(min-width: 1024px) 400px, 100vw'
                  className='object-cover'
                  loading='eager'
                  fetchPriority='high'
                />
              ) : (
                <CldImage
                  src={image.id}
                  alt='Uploaded image'
                  width={image.width}
                  height={image.height}
                  sizes='(min-width: 1024px) 400px, 100vw'
                  className='h-full w-full object-cover'
                />
              )}
            </div>
          </CardContent>
        </DialogTrigger>

        <DialogContent className='max-w-[90vw] max-h-[90vh] border-none bg-transparent p-0'>
          {/* Hidden title to satisfy a11y */}
          <DialogHeader>
            <DialogTitle className='sr-only'>Image preview</DialogTitle>
          </DialogHeader>

          <div className='relative flex items-center justify-center'>
            {isRejected ? (
              <Image
                src='/reject.png'
                alt='Rejected content'
                width={image.width || 1200}
                height={image.height || 675}
                className='max-h-[85vh] max-w-full object-contain rounded-md'
                loading='eager'
                fetchPriority='high'
              />
            ) : (
              <CldImage
                src={image.id}
                alt='Uploaded image full view'
                width={image.width}
                height={image.height}
                className='max-h-[85vh] max-w-full object-contain rounded-md'
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <CardFooter className='flex flex-col items-start gap-1 px-4 pb-4 pt-3 text-xs text-muted-foreground'>
        {showAws && (
          <p>
            AWS Rekognition
            <span className='ml-2 font-medium text-foreground'>
              {image.aws_rekognition_status}
            </span>
          </p>
        )}
        {showWeb && (
          <p>
            WebPurify
            <span className='ml-2 font-medium text-foreground'>
              {image.webpurify_status}
            </span>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
