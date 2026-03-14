import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { connectDB } from "@/lib/db";
import { Bike } from "@/models/Bike";
import { formatINR } from "@/lib/format";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const idList = (ids ? ids.split(",") : []).filter(Boolean).slice(0, 3);

  await connectDB();
  const bikes = idList.length
    ? await Bike.find({ _id: { $in: idList } }).lean()
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Bike comparison
            </h1>
            <p className="text-sm text-muted-foreground">
              Compare up to 3 bikes by specs and pricing.
            </p>
          </div>
          <Link href="/bikes">
            <Button variant="outline">Pick bikes</Button>
          </Link>
        </div>

        {bikes.length === 0 ? (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>No bikes selected</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Open any bike and use the compare link pattern:
              <span className="ml-2 rounded bg-slate-100 px-2 py-1 font-mono text-xs">
                /compare?ids=ID1,ID2,ID3
              </span>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {bikes.map((b) => (
              <Card key={String(b._id)}>
                <CardHeader>
                  <CardTitle className="text-base">
                    {b.brand} {b.model}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{b.city}</Badge>
                    <Badge variant="secondary">{b.fuelType}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Row label="Price" value={formatINR(b.price)} />
                  <Row label="Year" value={String(b.year)} />
                  <Row label="KM" value={b.kilometers.toLocaleString("en-IN")} />
                  <Row label="Owner" value={b.ownerType ?? "-"} />
                  <Link href={`/bikes/${String(b._id)}`}>
                    <Button className="mt-2 w-full bg-slate-900 text-white hover:bg-slate-800">
                      View details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-white px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}

