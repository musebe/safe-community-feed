// app/api/cloudinary-webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import { updateModeration } from "@/lib/actions";

type CloudinaryModerationRecord = {
    kind: string;
    status: "approved" | "rejected" | "pending";
};

type WebhookBody = {
    notification_type: string;
    public_id?: string;
    moderation_status?: "approved" | "rejected" | "pending";
    moderation_kind?: "aws_rek" | "webpurify";
    moderation?: CloudinaryModerationRecord[];
};

export async function POST(req: NextRequest) {
    const body = (await req.json()) as WebhookBody;

    console.log(
        "Cloudinary webhook received:",
        JSON.stringify(body, null, 2)
    );

    const publicId = body.public_id;

    if (!publicId) {
        console.warn("Webhook missing public_id");
        return NextResponse.json({ error: "missing public_id" }, { status: 400 });
    }

    if (
        body.notification_type === "moderation" &&
        body.moderation_kind &&
        body.moderation_status
    ) {
        console.log(
            "Moderation notification:",
            publicId,
            body.moderation_kind,
            body.moderation_status
        );

        await updateModeration(
            publicId,
            body.moderation_kind,
            body.moderation_status
        );

        return NextResponse.json({ ok: true, source: "moderation" });
    }

    if (
        body.notification_type === "upload" &&
        Array.isArray(body.moderation)
    ) {
        console.log(
            "Upload notification with moderation array for",
            publicId,
            body.moderation
        );

        for (const record of body.moderation) {
            if (
                record.kind === "aws_rek" ||
                record.kind === "webpurify"
            ) {
                await updateModeration(
                    publicId,
                    record.kind,
                    record.status
                );
            }
        }

        return NextResponse.json({ ok: true, source: "upload" });
    }

    console.log(
        "Webhook ignored, notification_type:",
        body.notification_type
    );

    return NextResponse.json({ ok: true, source: "ignored" });
}
