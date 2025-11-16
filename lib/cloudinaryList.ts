// lib/cloudinaryList.ts
import { cacheLife } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

export async function listRecentAssets() {
    "use cache";
    cacheLife("minutes"); // or 'hours'

    const res = await cloudinary.api.resources({
        type: "upload",
        max_results: 20,
        prefix: "safe-community-app/",
    });

    return res.resources;
}
