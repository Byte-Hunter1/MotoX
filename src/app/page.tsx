import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Gauge, Calendar, ShieldCheck, ChevronRight, CheckCircle2, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-36 lg:pb-48">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/4"></div>
           <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-screen-2xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Copy */}
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-6 py-1.5 px-4 bg-background/50 backdrop-blur border-primary/30 text-primary uppercase tracking-wider text-xs font-semibold">
                 #1 Verified Bikes Marketplace
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Buy Trusted <br className="hidden lg:block"/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Pre-Owned Bikes</span> <br/>
                at the Best Price.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Skip the hassle. Explore 10,000+ certified used bikes with warranties, affordable EMIs, and free RC transfer. Your dream ride is waiting.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 text-md px-8 h-14">
                  <Link href="/bikes" className="w-full h-full flex items-center justify-center">Explore Bikes</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-md px-8 h-14 bg-background/50 backdrop-blur">
                  <Link href="/sell" className="w-full h-full flex items-center justify-center">Sell Your Bike</Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm font-medium">
                 <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>160-Point Check</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>6 Months Warranty</span>
                 </div>
                 <div className="hidden sm:flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Easy Returns</span>
                 </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:ml-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2rem] transform rotate-3 scale-105 z-0"></div>
              <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-card">
                 <Image 
                   src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2940&auto=format&fit=crop" 
                   alt="Premium Sports Bike" 
                   width={800} 
                   height={600}
                   className="object-cover w-full h-[400px] lg:h-[500px]"
                   priority
                 />
                 <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex justify-between items-center text-white">
                    <div>
                       <p className="font-semibold text-lg">Royal Enfield Classic 350</p>
                       <p className="text-white/70 text-sm">2022 • 12,500 km • Delhi</p>
                    </div>
                    <div className="font-bold text-xl text-primary">₹ 1,85,000</div>
                 </div>
              </div>
            </div>

          </div>
        </div>

        {/* Global Search Bar (Positioned over the transition) */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 px-4">
           <div className="container mx-auto max-w-5xl">
              <Card className="rounded-full shadow-2xl border-white/10 bg-card/95 backdrop-blur-xl p-2 sm:p-3 overflow-visible">
                 <div className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-border">
                    <div className="flex-1 w-full flex items-center px-4 py-3 sm:py-0">
                       <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mr-3" />
                       <Input type="text" placeholder="Location..." className="border-0 shadow-none focus-visible:ring-0 bg-transparent px-0 placeholder:text-muted-foreground/70" />
                    </div>
                    <div className="flex-1 w-full flex items-center px-4 py-3 sm:py-0">
                       <Search className="h-5 w-5 text-muted-foreground shrink-0 mr-3" />
                       <Input type="text" placeholder="Search brands, models..." className="border-0 shadow-none focus-visible:ring-0 bg-transparent px-0 placeholder:text-muted-foreground/70" />
                    </div>
                    <div className="w-full sm:w-auto px-2 pt-2 sm:pt-0 pb-1 sm:pb-0">
                       <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 shadow-primary/20 shadow-lg">
                          Search Bikes
                       </Button>
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Popular Brands We Deal In</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 opacity-70">
             {["Royal Enfield", "Bajaj", "TVS", "Yamaha", "KTM", "Honda"].map((brand) => (
                <div key={brand} className="text-xl md:text-2xl font-bold font-mono tracking-tighter mix-blend-luminosity hover:mix-blend-normal transition-all cursor-pointer hover:text-primary">
                  {brand.toUpperCase()}
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Featured Bikes */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-screen-2xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Newly Added Rides</h2>
              <p className="text-muted-foreground max-w-2xl text-lg">Fresh inventory of thoroughly inspected bikes ready for a new home.</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex items-center text-primary hover:text-primary/80 hover:bg-primary/10">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group overflow-hidden rounded-2xl border-white/5 bg-card hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/5">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <Image 
                    src={`https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop&sig=${i}`}
                    alt="Bike" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <Badge className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur border-none hover:bg-black/90">
                    Verified
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">KTM Duke 390</h3>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-4">₹ 2,45,000</div>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> 2021</div>
                    <div className="flex items-center gap-1.5"><Gauge className="h-4 w-4" /> 8,500 km</div>
                    <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Bangalore</div>
                    <div className="flex items-center gap-1.5">1st Owner</div>
                  </div>
                  
                  <Button className="w-full rounded-xl bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" className="w-full">
              View All Bikes
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container mx-auto px-4 max-w-screen-xl">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The MotoX Advantage</h2>
              <p className="text-muted-foreground text-lg">We bring transparency, quality, and affordability to the pre-owned two-wheeler market.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                 { title: "160-Point Certification", desc: "Every bike undergoes a rigorous mechanical and document check before listing.", icon: <ShieldCheck className="h-8 w-8" /> },
                 { title: "6 Months Warranty", desc: "Ride with peace of mind. We cover major engine and gearbox components.", icon: <Star className="h-8 w-8" /> },
                 { title: "Easy RC Transfer", desc: "We handle all the pesky RTO paperwork so you don't have to lift a finger.", icon: <CheckCircle2 className="h-8 w-8" /> },
              ].map((val, i) => (
                 <div key={i} className="p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/30 transition-colors group">
                    <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                       {val.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Steps to Buy */}
      <section className="py-24 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 hidden md:block z-0"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-screen-xl">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg">Four simple steps to bring home your next ride.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                 { num: "01", title: "Browse", desc: "Explore our verified inventory of 1000+ bikes." },
                 { num: "02", title: "Test Ride", desc: "Schedule a free home test ride at your convenience." },
                 { num: "03", title: "Purchase", desc: "Pay securely or opt for our instant EMI approvals." },
                 { num: "04", title: "Ride Home", desc: "Keys in hand, RC transfer initiated. Enjoy!" }
              ].map((step, i) => (
                 <div key={i} className="relative text-center group">
                    <div className="w-16 h-16 mx-auto bg-card border-2 border-primary/20 text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all shadow-[0_0_30px_rgba(var(--primary),0.1)]">
                       {step.num}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed px-4">{step.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 max-w-screen-xl">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Loved by Riders</h2>
              <p className="text-muted-foreground text-lg">Don&apos;t just take our word for it.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
              {[
                 { name: "Rahul Sharma", bike: "Bought Duke 390", review: "The transparency is unmatched. Found exactly what was promised online and the RTO transfer was completely handled by them." },
                 { name: "Priya V", bike: "Bought Activa 6G", review: "Got a great deal on an almost new Activa. Home test ride made it super convenient for me. Highly recommended for fuss-free buying!" },
                 { name: "Amit K.", bike: "Bought Classic 350", review: "Loved the 6-month warranty on a used bike! Gave me the confidence to pick up a bullet without stressing about engine issues." }
              ].map((t, i) => (
                 <Card key={i} className="p-6 bg-background rounded-2xl border-border/40">
                    <div className="flex text-orange-400 mb-4">
                       {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">&quot;{t.review}&quot;</p>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {t.name.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-sm tracking-tight">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.bike}</p>
                       </div>
                    </div>
                 </Card>
              ))}
           </div>
        </div>
      </section>

    </div>
  );
}
