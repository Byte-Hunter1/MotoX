import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Wishlist } from "@/models/Wishlist";
import { getSession } from "@/lib/session";

const ToggleSchema = z.object({ bikeId: z.string().min(5) });

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const items = await Wishlist.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = ToggleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const { bikeId } = parsed.data;
  const existing = await Wishlist.findOne({
    userId: session.user.id,
    bikeId,
  });

  if (existing) {
    await existing.deleteOne();
    return NextResponse.json({ wished: false });
  }

  await Wishlist.create({ userId: session.user.id, bikeId });
  return NextResponse.json({ wished: true }, { status: 201 });
}

