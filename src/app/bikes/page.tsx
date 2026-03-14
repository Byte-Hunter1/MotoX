import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/format";
import { Filter, Calendar, Gauge, MapPin } from "lucide-react";

// Using Unsplash images for a premium look
const DEMO_BIKES = [
  {
    id: "1",
    brand: "Royal Enfield",
    model: "Classic 350 Stealth Black",
    year: 2022,
    kilometers: 12500,
    city: "Delhi",
    price: 185000,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
    verified: true
  },
  {
    id: "2",
    brand: "KTM",
    model: "Duke 390",
    year: 2021,
    kilometers: 8500,
    city: "Bangalore",
    price: 245000,
    image: "https://images.unsplash.com/photo-1558981001-1995369a39a8?q=80&w=800&auto=format&fit=crop",
    verified: true
  },
  {
    id: "3",
    brand: "Yamaha",
    model: "R15 V4 Racing Blue",
    year: 2023,
    kilometers: 4200,
    city: "Mumbai",
    price: 175000,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
    verified: false
  },
  {
    id: "4",
    brand: "Honda",
    model: "CB350 RS",
    year: 2021,
    kilometers: 15000,
    city: "Pune",
    price: 165000,
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop",
    verified: true
  },
  {
    id: "5",
    brand: "TVS",
    model: "Apache RR 310",
    year: 2020,
    kilometers: 22000,
    city: "Hyderabad",
    price: 195000,
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
    verified: true
  },
  {
    id: "6",
    brand: "Bajaj",
    model: "Dominar 400",
    year: 2019,
    kilometers: 28000,
    city: "Chennai",
    price: 155000,
    image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?q=80&w=800&auto=format&fit=crop",
    verified: false
  }
];

export default function BikesPage() {
  return (
    <div className="bg-background min-h-[calc(100vh-4rem)]">
      {/* Page Header */}
      <div className="bg-card border-b border-border/40 py-8">
         <div className="container mx-auto px-4 max-w-screen-2xl">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Used Bikes for Sale</h1>
            <p className="text-muted-foreground">Find the perfect pre-owned bike from our verified inventory of 1,000+ vehicles.</p>
         </div>
      </div>

      <div className="container mx-auto px-4 max-w-screen-2xl py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="sticky top-24 space-y-6">
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                     <Filter className="h-5 w-5 text-primary" /> Filters
                  </h2>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">Reset All</Button>
               </div>
               
               {/* Location Filter */}
               <div className="space-y-3">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Location</Label>
                  <Input placeholder="Search City..." className="bg-background" />
               </div>

               {/* Brand Filter */}
               <div className="space-y-3">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Brands</Label>
                  <div className="space-y-2">
                     {["Royal Enfield", "Honda", "Bajaj", "TVS", "Yamaha", "KTM"].map((brand) => (
                        <div key={brand} className="flex items-center space-x-3">
                           <Checkbox id={`brand-${brand}`} className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                           <Label htmlFor={`brand-${brand}`} className="text-sm font-medium leading-none cursor-pointer">
                              {brand}
                           </Label>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Price Range */}
               <div className="space-y-3">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Price Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                     <Input type="number" placeholder="Min (₹)" className="bg-background" />
                     <Input type="number" placeholder="Max (₹)" className="bg-background" />
                  </div>
               </div>
               
               {/* Year */}
               <div className="space-y-3">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Model Year</Label>
                  <div className="grid grid-cols-2 gap-2">
                     <Input type="number" placeholder="From" className="bg-background" />
                     <Input type="number" placeholder="To" className="bg-background" />
                  </div>
               </div>

               <Button className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                  Apply Filters
               </Button>
            </div>
          </aside>

          {/* Main Content: Bike Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
               <p className="text-sm text-muted-foreground">Showing <span className="font-bold text-foreground">1-6</span> of 240 bikes</p>
               <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline-block">Sort by:</span>
                  <select className="bg-background border border-border/50 rounded-md text-sm px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary">
                     <option>Recommended</option>
                     <option>Price: Low to High</option>
                     <option>Price: High to Low</option>
                     <option>Kilometers: Low to High</option>
                     <option>Newest Additions</option>
                  </select>
               </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {DEMO_BIKES.map((bike) => (
                <Card key={bike.id} className="group overflow-hidden rounded-2xl border-white/5 bg-card hover:border-primary/50 transition-all duration-300 shadow-lg flex flex-col">
                  <div className="relative h-52 shrink-0 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <Image 
                      src={bike.image}
                      alt={`${bike.brand} ${bike.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {bike.verified && (
                       <Badge className="absolute top-3 left-3 z-20 bg-green-500/90 text-white backdrop-blur border-none">
                         Verified Check
                       </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{bike.brand}</div>
                    <Link href={`/bikes/${bike.id}`} className="hover:text-primary transition-colors">
                       <h3 className="font-bold text-xl line-clamp-1 mb-3">{bike.model}</h3>
                    </Link>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary/70" /> {bike.year}</div>
                      <div className="flex items-center gap-1.5"><Gauge className="h-4 w-4 text-primary/70" /> {bike.kilometers.toLocaleString("en-IN")} km</div>
                      <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary/70" /> {bike.city}</div>
                      <div className="flex items-center gap-1.5 border border-border px-2 py-0.5 rounded-md text-xs w-fit">1st Owner</div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                       <div className="text-2xl font-bold text-primary">{formatINR(bike.price)}</div>
                       <Button variant="outline" className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary">
                         <Link href={`/bikes/${bike.id}`}>Details</Link>
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
               <Button variant="outline" className="rounded-full px-8 border-border bg-card hover:bg-primary hover:text-primary-foreground">
                  Load More Bikes
               </Button>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

