import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { getSession } from "@/lib/session";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadSchema = z.object({
  dataUrl: z.string().min(50), // base64 data url
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      { error: "Cloudinary env vars not configured" },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = UploadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const uploaded = await cloudinary.uploader.upload(parsed.data.dataUrl, {
    folder: "bikebazaar/bikes",
    resource_type: "image",
  });

  return NextResponse.json({ url: uploaded.secure_url }, { status: 201 });
}

