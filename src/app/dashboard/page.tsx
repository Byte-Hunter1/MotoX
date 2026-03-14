import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { connectDB } from "@/lib/db";
import { Bike } from "@/models/Bike";
import { Wishlist } from "@/models/Wishlist";
import { formatINR } from "@/lib/format";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/auth/login");

  await connectDB();
  const [bikes, wishlist] = await Promise.all([
    Bike.find({ sellerId: session.user.id }).sort({ createdAt: -1 }).lean(),
    Wishlist.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage your listings and wishlist.
            </p>
          </div>
          <Link href="/sell">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Post new listing
            </Button>
          </Link>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your listings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {bikes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No listings yet. Post your first bike.
                </p>
              ) : (
                bikes.map((b) => (
                  <div
                    key={String(b._id)}
                    className="flex items-center justify-between rounded-lg border bg-white p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {b.brand} {b.model}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {b.year} • {b.city} • {formatINR(b.price)}
                      </p>
                    </div>
                    <Link href={`/bikes/${String(b._id)}`}>
                      <Button variant="outline">View</Button>
                    </Link>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {wishlist.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Your wishlist is empty.
                </p>
              ) : (
                wishlist.map((w) => (
                  <div
                    key={String(w._id)}
                    className="flex items-center justify-between rounded-lg border bg-white p-3"
                  >
                    <p className="text-sm text-muted-foreground">
                      Saved bike ID: {String(w.bikeId)}
                    </p>
                    <Link href={`/bikes/${String(w.bikeId)}`}>
                      <Button variant="outline">Open</Button>
                    </Link>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

