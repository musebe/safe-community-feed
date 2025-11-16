// components/shared/UploadButton.tsx
'use client';

import { useState, useTransition } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { saveUpload, type CloudinaryUploadInfo } from '@/lib/actions';

type UploadResult = {
  event: 'success';
  info: CloudinaryUploadInfo;
};

type Mode = 'aws' | 'webpurify' | 'both';

export function UploadButton() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const awsPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_AWS_REK;
  const webpurifyPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_WEBPURIFY;
  const bothPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const [mode, setMode] = useState<Mode>('aws');
  const [isPending, startTransition] = useTransition();

  const presetByMode: Record<Mode, string | undefined> = {
    aws: awsPreset,
    webpurify: webpurifyPreset,
    both: bothPreset,
  };

  const activePreset = presetByMode[mode];

  const modeLabel: Record<Mode, string> = {
    aws: 'Amazon Rekognition',
    webpurify: 'WebPurify',
    both: 'Both providers',
  };

  if (!cloudName) {
    return (
      <p className='text-sm text-red-500'>
        Cloudinary cloud name is not configured.
      </p>
    );
  }

  if (!activePreset) {
    return (
      <p className='text-sm text-red-500'>
        Upload preset missing for selected mode. Check your environment
        variables.
      </p>
    );
  }

  const onUploadSuccess = (result: unknown) => {
    const uploadData = result as UploadResult;

    if (!uploadData || uploadData.event !== 'success') {
      toast.error('Upload failed', {
        description: 'Could not read the upload response.',
      });
      return;
    }

    startTransition(async () => {
      try {
        await saveUpload(uploadData.info);

        toast.success('Upload successful', {
          description: 'Your image has been saved and is being processed.',
        });
      } catch (error) {
        console.error(error);
        toast.error('Upload failed', {
          description: 'Something went wrong while saving your image.',
        });
      }
    });
  };

  return (
    <div className='flex flex-col items-start gap-4'>
      {/* Provider selector */}
      <div className='space-y-1'>
        <p className='text-xs font-medium text-muted-foreground'>
          Moderation provider
        </p>
        <div className='inline-flex rounded-md border bg-background p-1 text-xs'>
          {(['aws', 'webpurify', 'both'] as Mode[]).map((value) => {
            const selected = mode === value;
            return (
              <button
                key={value}
                type='button'
                onClick={() => setMode(value)}
                className={cn(
                  'px-3 py-1 rounded-md transition-colors',
                  selected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-muted-foreground hover:bg-muted'
                )}
              >
                {modeLabel[value]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload button */}
      <CldUploadButton
        key={activePreset}
        uploadPreset={activePreset}
        onSuccess={onUploadSuccess}
        className={cn(
          buttonVariants({ size: 'lg' }),
          'w-full sm:w-auto justify-center'
        )}
      >
        {isPending ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Upload className='mr-2 h-4 w-4' />
        )}
        {isPending ? 'Saving...' : 'Upload an Image'}
      </CldUploadButton>
    </div>
  );
}
