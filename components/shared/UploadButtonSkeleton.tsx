// components/shared/UploadButtonSkeleton.tsx

export function UploadButtonSkeleton() {
  return (
    <button
      className='inline-flex h-10 items-center justify-center rounded-md border bg-muted px-4 text-sm font-medium text-muted-foreground'
      disabled
    >
      Upload
    </button>
  );
}
