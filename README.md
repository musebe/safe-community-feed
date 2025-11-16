Here is a clean, simple README.
Short sentences, clear language, no jargon, fits your style rules.

---

# Safe Community Feed

AI powered content moderation with Next.js and Cloudinary.

## About

This app lets you upload images.
Each image is checked by moderation tools from Cloudinary.
You can use Amazon Rekognition, WebPurify, or both.
You pick the provider before you upload.
Rejected images show a local placeholder image.
Approved images show the Cloudinary version.
You can search, view, and filter uploads.

## Features

* Upload images from your device.
* Pick your moderation provider.
* Auto tagging with Cloudinary add ons.
* Store uploads in a database.
* Show safe or blocked status.
* Show a fallback image when needed.
* Real time updates sent by Cloudinary webhooks.
* Smooth UI with shadcn UI and Next.js.

## Tech Stack

* Next.js 16
* React Server Components
* Cache Components
* Cloudinary Upload API
* Cloudinary Moderation add ons
* Prisma and SQLite
* Tailwind CSS
* shadcn UI
* ngrok for local webhook testing

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/musebe/safe-community-feed.git
cd safe-community-feed
```

### 2. Install packages

```bash
npm install
```

### 3. Add environment values

Create a `.env` file.

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ai-moderation-demo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_AWS_REK=safe_ugc_aws_rek
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_WEBPURIFY=safe_ugc_webpurify

DATABASE_URL="file:./dev.db"
```

### 4. Set up Cloudinary

* Make 3 upload presets.
* One for Amazon Rekognition.
* One for WebPurify.
* One with both add ons.
* Enable auto tagging if you want.
* Enable the upload webhook.
* Point the webhook to your ngrok URL.
  Example:

  ```
  https://your-ngrok-url.ngrok-free.app/api/cloudinary-webhook
  ```

### 5. Set up Prisma

```bash
npx prisma migrate dev
```

### 6. Run dev server

```bash
npm run dev
```

### 7. Start ngrok for webhooks

```bash
ngrok http 3000
```

Copy the URL into your Cloudinary webhook settings.

## How it Works

### Upload

You upload an image.
The app sends it to Cloudinary with the preset you chose.

### Webhook

Cloudinary reviews your image.
It sends a webhook back.
The webhook updates the database.

### Display

The homepage loads images from the database.
If an image is approved you see it.
If an image is rejected you see a local `reject.png`.

## Folder Guide

```
app/
  page.tsx               main feed
  api/cloudinary-webhook webhook handler
components/
  layout/                navbar, footer
  shared/                upload button
lib/
  cloudinary.ts          client setup
  db.ts                  prisma client
public/
  reject.png             shown for blocked items
prisma/
  schema.prisma
```

## Notes

* This app uses Cache Components.
* Parts that use time or random values live in client components.
* Cloudinary tags help you search and organize uploads.
* You can change providers at any time without code changes.

## Future Ideas

* Add video moderation.
* Add user accounts.
* Add AI text checks for captions.
* Add filters for tags and labels.

## License

MIT
