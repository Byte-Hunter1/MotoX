import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Bike } from "@/models/Bike";
import { getSession } from "@/lib/session";

const BikeCreateSchema = z.object({
  title: z.string().min(3),
  brand: z.string().min(2),
  model: z.string().min(1),
  year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  price: z.number().int().min(1),
  kilometers: z.number().int().min(0),
  city: z.string().min(2),
  fuelType: z.string().min(2),
  ownerType: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string().url()).min(1),
  registrationState: z.string().optional(),
  condition: z.string().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get("brand") || undefined;
  const city = searchParams.get("city") || undefined;
  const q = searchParams.get("q") || undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minYear = searchParams.get("minYear");
  const maxYear = searchParams.get("maxYear");
  const fuelType = searchParams.get("fuelType") || undefined;

  await connectDB();
  const filter: Record<string, unknown> = {};
  if (brand) filter.brand = brand;
  if (city) filter.city = city;
  if (fuelType) filter.fuelType = fuelType;
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { model: { $regex: q, $options: "i" } },
      { brand: { $regex: q, $options: "i" } },
    ];
  }
  if (minPrice || maxPrice) {
    filter.price = {
      ...(minPrice ? { $gte: Number(minPrice) } : {}),
      ...(maxPrice ? { $lte: Number(maxPrice) } : {}),
    };
  }
  if (minYear || maxYear) {
    filter.year = {
      ...(minYear ? { $gte: Number(minYear) } : {}),
      ...(maxYear ? { $lte: Number(maxYear) } : {}),
    };
  }

  const bikes = await Bike.find(filter).sort({ createdAt: -1 }).limit(60).lean();
  return NextResponse.json({ bikes });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = BikeCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const created = await Bike.create({
    ...parsed.data,
    sellerId: session.user.id,
  });

  return NextResponse.json({ bike: created }, { status: 201 });
}

