// components/shared/UploadButton.tsx
'use client';

import { CldUploadButton } from 'next-cloudinary';
import { Upload } from 'lucide-react';
// 1. Remove the import for 'Button'
// import { Button } from '@/components/ui/button';

// 2. Add imports for 'buttonVariants' and 'cn'
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ... (Your types are all correct)
type CloudinaryUploadInfo = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  moderation: Array<{
    kind: 'aws_rekognition' | 'webpurify';
    status: 'approved' | 'rejected' | 'pending';
  }>;
};

type UploadResult = {
  event: 'success';
  info: CloudinaryUploadInfo;
};

export function UploadButton() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return (
      <p className='text-red-500'>
        Cloudinary environment variables are not configured.
      </p>
    );
  }

  const onUploadSuccess = (result: unknown) => {
    const uploadData = result as UploadResult;
    console.log('Upload successful! Data:', uploadData);

    if (uploadData?.info?.moderation) {
      console.log('Moderation results:', uploadData.info.moderation);
    } else {
      console.log('Moderation data not found in response.');
    }
  };

  return (
    <CldUploadButton
      uploadPreset={uploadPreset}
      onSuccess={onUploadSuccess}
      // 3. Apply the button styles directly to CldUploadButton
      className={cn(buttonVariants({ size: 'lg' }))}
    >
      {/* 4. Pass the icon and text as direct children */}
      <Upload className='mr-2 h-4 w-4' /> Upload an Image
    </CldUploadButton>
  );
}
