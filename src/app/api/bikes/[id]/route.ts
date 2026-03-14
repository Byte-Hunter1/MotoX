import { NextResponse } from "next/server";
import { z } from "zod";
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
  const bike = {
     _id: id,
     brand: "Demo Brand",
     model: "Demo Model",
     year: 2022,
     price: 100000,
     sellerId: "mock-seller-id",
  };
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

  const bike = {
    _id: id,
    brand: "Demo Brand",
    model: "Demo Model",
    year: 2022,
    price: 100000,
    sellerId: session.user.id,
    ...parsed.data
  };
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

  return NextResponse.json({ ok: true });
}

