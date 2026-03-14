import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Bike } from "@/models/Bike";
import { getSession } from "@/lib/session";

const BikeUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  brand: z.string().min(2).optional(),
  model: z.string().min(1).optional(),
  year: z.number().int().min(1990).max(new Date().getFullYear() + 1).optional(),
  price: z.number().int().min(1).optional(),
  kilometers: z.number().int().min(0).optional(),
  city: z.string().min(2).optional(),
  fuelType: z.string().min(2).optional(),
  ownerType: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string().url()).min(1).optional(),
  registrationState: z.string().optional(),
  condition: z.string().optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const bike = await Bike.findById(id).lean();
  if (!bike) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ bike });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = BikeUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const bike = await Bike.findById(id);
  if (!bike) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (String(bike.sellerId) !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  Object.assign(bike, parsed.data);
  await bike.save();
  return NextResponse.json({ bike });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const bike = await Bike.findById(id);
  if (!bike) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (String(bike.sellerId) !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await bike.deleteOne();
  return NextResponse.json({ ok: true });
}

