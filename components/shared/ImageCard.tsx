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

      <CardContent className='p-0'>
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
