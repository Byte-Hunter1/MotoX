import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatINR } from "@/lib/format";
import { MapPin, Calendar, Gauge, CheckCircle2, ShieldCheck, Share2, Heart, MessageCircle, Phone, ArrowLeft, Fuel, Activity, FileText, User } from "lucide-react";

export default async function BikeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Demo Data - Premium Bike
  const bike = {
    id,
    brand: "Royal Enfield",
    model: "Classic 350 Stealth Black",
    year: 2022,
    kilometers: 12500,
    city: "Delhi",
    price: 185000,
    fuelType: "Petrol",
    ownerType: "First owner",
    registrationState: "DL-10",
    insurance: "Valid till Sep 2024",
    engine: "349 cc",
    power: "20.2 bhp",
    abs: "Dual Channel",
    sellerName: "MotoX Certified Refurbisher",
    phone: "1800123456",
    images: [
       "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1558980394-4c7c92701de8?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1558980664-ce6960be307d?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop",
    ]
  };

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in the ${bike.brand} ${bike.model} (${bike.year}) listed on MotoX for ${formatINR(bike.price)}. Is it available?`
  );
  const waLink = `https://wa.me/91${bike.phone}?text=${whatsappText}`;
  const telLink = `tel:${bike.phone}`;

  return (
    <div className="bg-background min-h-[calc(100vh-4rem)] pb-24">
      {/* Breadcrumb & Navigation */}
      <div className="border-b border-border/40 bg-card">
         <div className="container mx-auto px-4 max-w-screen-xl py-4 flex items-center justify-between">
            <Link href="/bikes" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
               <ArrowLeft className="h-4 w-4 mr-2" /> Back to listings
            </Link>
            <div className="flex items-center gap-4">
               <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Share2 className="h-4 w-4 mr-2" /> Share
               </Button>
               <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10">
                  <Heart className="h-4 w-4 mr-2" /> Save
               </Button>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 max-w-screen-xl mt-8">
        
        {/* Title Section (Mobile mainly) */}
        <div className="mb-6 lg:mb-8">
           <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/20"><CheckCircle2 className="w-3 h-3 mr-1"/> MotoX Verified</Badge>
              <Badge variant="outline" className="border-border">Free RC Transfer</Badge>
           </div>
           <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
              {bike.brand} <span className="text-primary">{bike.model}</span>
           </h1>
           <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
              <span className="flex items-center"><Calendar className="h-4 w-4 mr-1"/> {bike.year} Model</span>
              <span className="w-1 h-1 rounded-full bg-border"></span>
              <span className="flex items-center"><Gauge className="h-4 w-4 mr-1"/> {bike.kilometers.toLocaleString("en-IN")} km</span>
              <span className="w-1 h-1 rounded-full bg-border"></span>
              <span className="flex items-center"><MapPin className="h-4 w-4 mr-1"/> {bike.city}</span>
           </div>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 xl:gap-12">
          
          {/* Main Content: Gallery & Specs */}
          <div className="space-y-8 lg:space-y-12">
             
             {/* Image Gallery */}
             <div className="space-y-4">
                <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl bg-card border border-border/50">
                   <Image 
                      src={bike.images[0]} 
                      alt={bike.model}
                      fill
                      className="object-cover"
                      priority
                   />
                </div>
                <div className="grid grid-cols-4 gap-4">
                   {bike.images.slice(1).map((img, idx) => (
                     <div key={idx} className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-card border border-border/30 cursor-pointer hover:border-primary/50 transition-colors">
                        <Image src={img} alt={`Gallery ${idx+1}`} fill className="object-cover" />
                     </div>
                   ))}
                   <div className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-card border border-border/30 cursor-pointer flex items-center justify-center flex-col group hover:border-primary/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                         <span className="font-bold">+12</span>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">More Photos</span>
                   </div>
                </div>
             </div>

             {/* Key Specifications Grid */}
             <div>
                <h2 className="text-2xl font-bold mb-6">Key Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <SpecCard icon={<User />} label="Ownership" value={bike.ownerType} />
                   <SpecCard icon={<Fuel />} label="Fuel Type" value={bike.fuelType} />
                   <SpecCard icon={<Activity />} label="Engine" value={bike.engine} />
                   <SpecCard icon={<FileText />} label="Insurance" value={bike.insurance} />
                </div>
             </div>

             {/* Description / Inspector Report */}
             <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                   <ShieldCheck className="w-8 h-8 text-primary" />
                   <h2 className="text-xl sm:text-2xl font-bold">160-Point Inspector Report</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                   This {bike.brand} {bike.model} has been thoroughly inspected by our certified mechanics. The engine is running perfectly with no odd noises. The gearbox shifts smoothly, and suspension is in top condition. Minor scratch on the right side exhaust shield, but overall paint quality is immaculate. Tyres have approx 70% life remaining.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                   <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                      <span className="font-medium text-sm">Engine & Transmission</span>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-none">Passed (100%)</Badge>
                   </div>
                   <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                      <span className="font-medium text-sm">Electricals & Battery</span>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-none">Passed (100%)</Badge>
                   </div>
                   <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                      <span className="font-medium text-sm">Brakes & Suspension</span>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-none">Passed (100%)</Badge>
                   </div>
                   <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                      <span className="font-medium text-sm">Documentation</span>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-none">Clear</Badge>
                   </div>
                </div>
             </div>

          </div>

          {/* Sidebar: Pricing, Contact & EMI */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
             
             {/* Pricing Card */}
             <Card className="border-border/50 shadow-2xl overflow-hidden rounded-3xl bg-card">
                <div className="bg-primary/10 px-6 py-3 border-b border-primary/10 flex items-center justify-between">
                   <span className="text-sm font-bold text-primary flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-1.5" /> MotoX Certified
                   </span>
                   <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest">Great Deal</span>
                </div>
                <CardContent className="p-6 sm:p-8">
                   <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Asking Price</p>
                   <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                      {formatINR(bike.price)}
                   </div>
                   <p className="text-sm text-muted-foreground mb-8">Ex-showroom approx: {formatINR(245000)} (Save 24%)</p>
                   
                   <div className="space-y-3 mb-8">
                      <Button className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20">
                         <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full">
                            <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Seller
                         </a>
                      </Button>
                      <Button variant="outline" className="w-full h-14 text-lg rounded-xl border-border bg-background hover:bg-secondary">
                         <a href={telLink} className="flex items-center justify-center w-full">
                           <Phone className="mr-2 h-5 w-5" /> {bike.phone}
                         </a>
                      </Button>
                   </div>

                   <hr className="border-border/50 mb-6" />

                   <div className="space-y-4">
                      <h3 className="font-bold">Includes:</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                         <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2"/> 6 Months Comprehensive Warranty</li>
                         <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2"/> Free RTO Registration Transfer</li>
                         <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2"/> 3 Free Servicing within 1 Year</li>
                         <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2"/> 7-Day Money Back Guarantee</li>
                      </ul>
                   </div>
                </CardContent>
             </Card>

             {/* EMI Calculator Widget */}
             <Card className="border-border/50 rounded-3xl bg-card">
                <CardContent className="p-6 sm:p-8 space-y-6">
                   <h3 className="text-xl font-bold flex items-center">
                      Estimated EMI
                   </h3>
                   <div className="p-4 rounded-xl bg-background border border-border">
                      <div className="text-sm text-muted-foreground mb-1">Starting from</div>
                      <div className="text-3xl font-bold text-primary mb-1">₹ 4,320<span className="text-sm text-muted-foreground font-normal"> /month</span></div>
                      <p className="text-xs text-muted-foreground">For 48 months @ 10% interest</p>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Down Payment</span>
                            <span className="font-semibold">{formatINR(37000)} (20%)</span>
                         </div>
                         <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary/50 w-1/5 rounded-full"></div>
                         </div>
                      </div>
                   </div>

                   <Button variant="outline" className="w-full border-border bg-background">Calculate Exact EMI</Button>
                </CardContent>
             </Card>

          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCard({ icon, label, value }: { icon: React.ReactNode, label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 group hover:border-primary/30 transition-colors">
      <div className="text-primary/70 mb-3 group-hover:text-primary transition-colors [&>svg]:w-6 [&>svg]:h-6">
         {icon}
      </div>
      <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">{label}</p>
      <p className="text-sm sm:text-base font-bold text-foreground">{value}</p>
    </div>
  );
}


