import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ShieldCheck, Wrench, Users, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | MotoX',
  description: 'Learn about MotoX, India\'s most trusted pre-owned bike marketplace.',
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-primary/20 blur-[120px] rounded-full point-events-none -z-10"></div>
        
        <div className="container mx-auto max-w-screen-xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Redefining <span className="text-primary">Two-Wheeler</span> <br className="hidden md:block"/> Ownership in India.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            MotoX is on a mission to eliminate the friction from buying and selling pre-owned motorcycles. We bring transparency, quality, and trust to a market built on uncertainty.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
               <Link href="/bikes" className="flex items-center justify-center w-full h-full">Explore Bikes</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-background/50 backdrop-blur-sm">
               <Link href="/contact" className="flex items-center justify-center w-full h-full">Contact Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-12 border-y border-border/40 bg-card/30">
        <div className="container mx-auto max-w-screen-xl px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50 text-center">
              <div className="px-4">
                 <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">5,000+</p>
                 <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Happy Riders</p>
              </div>
              <div className="px-4">
                 <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">160</p>
                 <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Point Checks</p>
              </div>
              <div className="px-4">
                 <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">10+</p>
                 <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Cities Active</p>
              </div>
              <div className="px-4">
                 <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">4.9<span className="text-primary text-2xl">★</span></p>
                 <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Average Rating</p>
              </div>
           </div>
        </div>
      </section>

      {/* Our Story / Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-border/50 bg-card shadow-2xl">
                   <Image 
                     src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop" 
                     alt="MotoX Workshop" 
                     fill 
                     className="object-cover"
                   />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-card border border-border/50 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                         <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Certified</p>
                         <p className="font-bold text-xl">Top Quality</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="order-1 lg:order-2 space-y-6">
                <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-widest font-bold px-3 py-1">Our Story</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">Born from a passion <br className="hidden md:block"/> for the open road.</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                   MotoX started in a small garage in Bangalore by three enthusiasts tired of the shady practices in the used-bike market. Hidden damages, messy paperwork, and unfair pricing plagued the industry.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg pb-4">
                   We decided to build a platform that treats a pre-owned bike with the same respect as a new one. By implementing strict quality checks, offering comprehensive warranties, and handling the RTO maze for our users, we&apos;ve revolutionized how India buys and sells motorcycles.
                </p>
                
                <ul className="space-y-4">
                   <li className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl border border-border/50">
                      <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                      <span className="font-medium text-foreground">Zero hidden fees or middleman commissions.</span>
                   </li>
                   <li className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl border border-border/50">
                      <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                      <span className="font-medium text-foreground">End-to-end digital paperwork integration.</span>
                   </li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Why We Are Different (Cards) */}
      <section className="py-16 md:py-24 bg-card/20 border-t border-border/40 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 right-0 w-1/3 h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto max-w-screen-xl px-4">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The MotoX Standard</h2>
              <p className="text-muted-foreground text-lg">We don&apos;t just sell bikes; we sell peace of mind. Here&apos;s how we differentiate from the rest.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                 icon={<Wrench />}
                 title="Ruthless Curation"
                 desc="Every bike admitted to our marketplace must pass a rigorous 160-point inspection covering engine health, chassis integrity, and electrical systems."
              />
              <FeatureCard 
                 icon={<ShieldCheck />}
                 title="Ironclad Protection"
                 desc="Buy with confidence thanks to our standard 6-month comprehensive warranty and a zero-questions-asked 7-day money-back guarantee."
              />
              <FeatureCard 
                 icon={<Users />}
                 title="Community First"
                 desc="Join thousands of MotoX riders. Access exclusive events, maintenance discounts, and a network of trusted service centers across India."
              />
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
         <div className="container mx-auto max-w-screen-xl px-4">
            <Card className="bg-primary border-none shadow-2xl shadow-primary/30 relative overflow-hidden">
               {/* Pattern */}
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
               <CardContent className="p-8 md:p-16 text-center relative z-10 flex flex-col items-center">
                  <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">Ready to find your match?</h2>
                  <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl">Browse our curated selection of high-quality verified motorcycles and hit the road this weekend.</p>
                  <Button size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-full h-14 px-8 text-lg group">
                     Explore the Garage <MoveRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
               </CardContent>
            </Card>
         </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
   return (
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm group hover:border-primary/50 transition-colors duration-300">
         <CardContent className="p-8">
            <div className="w-14 h-14 rounded-2xl bg-secondary/50 text-foreground flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
               <div className="w-7 h-7 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                 {icon}
               </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
               {desc}
            </p>
         </CardContent>
      </Card>
   )
}

function Badge({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: "outline" }) {
  const baseStyled = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const styles = variant === "outline" ? "text-foreground" : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
  return (
    <div className={`${baseStyled} ${styles} ${className || ""}`}>
      {children}
    </div>
  )
}
