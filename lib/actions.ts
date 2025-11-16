// lib/actions.ts
"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export type CloudinaryUploadInfo = {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    moderation?: Array<{
        kind: "aws_rek" | "webpurify";
        status: "approved" | "rejected" | "pending";
    }>;
};

export type SavedImage = {
    id: string;
    url: string;
    width: number;
    height: number;
    format: string;
    moderationStatus: "approved" | "rejected" | "pending";
    aws_rekognition_status: string;   // "approved" | "rejected" | "pending" | "not_used"
    webpurify_status: string;         // same
};

const dbPath = path.join(process.cwd(), "data/db.json");

async function readDb(): Promise<SavedImage[]> {
    try {
        const data = await fs.readFile(dbPath, "utf8");
        return (JSON.parse(data) as SavedImage[]) || [];
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return [];
        }
        console.error("Error reading database:", error);
        return [];
    }
}

export async function saveUpload(uploadInfo: CloudinaryUploadInfo) {
    try {
        const awsMod = uploadInfo.moderation?.find(
            (m) => m.kind === "aws_rek"
        );
        const webpurifyMod = uploadInfo.moderation?.find(
            (m) => m.kind === "webpurify"
        );

        // mark unused providers explicitly
        const awsStatus = awsMod ? awsMod.status : "not_used";
        const webStatus = webpurifyMod ? webpurifyMod.status : "not_used";

        // overall status looks only at real providers
        const statuses = [awsStatus, webStatus];
        let overall: SavedImage["moderationStatus"] = "pending";

        if (statuses.some((s) => s === "rejected")) {
            overall = "rejected";
        } else if (statuses.some((s) => s === "approved")) {
            overall = "approved";
        } else {
            overall = "pending";
        }

        const newImage: SavedImage = {
            id: uploadInfo.public_id,
            url: uploadInfo.secure_url,
            width: uploadInfo.width,
            height: uploadInfo.height,
            format: uploadInfo.format,
            moderationStatus: overall,
            aws_rekognition_status: awsStatus,
            webpurify_status: webStatus,
        };

        const dbData = await readDb();
        const updatedData = [newImage, ...dbData];

        await fs.writeFile(dbPath, JSON.stringify(updatedData, null, 2));

        revalidatePath("/");

        console.log("Successfully saved image to db:", newImage.id);
    } catch (error) {
        console.error("Error saving to database:", error);
    }
}

export async function updateModeration(
    publicId: string,
    kind: "aws_rek" | "webpurify",
    status: "approved" | "rejected" | "pending"
) {
    try {
        const dbData = await readDb();

        const index = dbData.findIndex((img) => img.id === publicId);

        if (index === -1) {
            console.warn("Image not found for moderation update:", publicId);
            return;
        }

        const image = dbData[index];

        if (kind === "aws_rek") {
            image.aws_rekognition_status = status;
        } else if (kind === "webpurify") {
            image.webpurify_status = status;
        }

        const statuses = [
            image.aws_rekognition_status,
            image.webpurify_status,
        ];

        let overall: SavedImage["moderationStatus"] = "pending";

        if (statuses.some((s) => s === "rejected")) {
            overall = "rejected";
        } else if (statuses.some((s) => s === "approved")) {
            overall = "approved";
        } else {
            overall = "pending";
        }

        image.moderationStatus = overall;

        dbData[index] = image;
        await fs.writeFile(dbPath, JSON.stringify(dbData, null, 2));
        revalidatePath("/");

        console.log(
            "Updated moderation for",
            publicId,
            "kind:",
            kind,
            "status:",
            status,
            "overall:",
            overall
        );
    } catch (error) {
        console.error("Error updating moderation:", error);
    }
}

export async function getImages(): Promise<SavedImage[]> {
    return await readDb();
}
