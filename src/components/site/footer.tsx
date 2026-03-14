import Link from "next/link";
import { Bike, Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-card text-card-foreground">
      <div className="container max-w-screen-2xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                <Bike className="h-6 w-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight">Moto<span className="text-primary">X</span></span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs pt-2">
              India&apos;s most trusted platform to buy and sell premium used bikes. Verified listings, affordable prices, and hassle-free transfers.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/bikes" className="hover:text-primary transition-colors inline-block">Browse Bikes</Link></li>
              <li><Link href="/sell" className="hover:text-primary transition-colors inline-block">Sell Your Bike</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors inline-block">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors inline-block">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Top Brands</h3>
            <ul className="space-y-3 text-sm text-muted-foreground grid grid-cols-2 gap-x-4">
              <li><Link href="/bikes?brand=Royal+Enfield" className="hover:text-primary transition-colors">Royal Enfield</Link></li>
              <li><Link href="/bikes?brand=Bajaj" className="hover:text-primary transition-colors">Bajaj</Link></li>
              <li><Link href="/bikes?brand=TVS" className="hover:text-primary transition-colors">TVS</Link></li>
              <li><Link href="/bikes?brand=Hero" className="hover:text-primary transition-colors">Hero</Link></li>
              <li><Link href="/bikes?brand=Honda" className="hover:text-primary transition-colors">Honda</Link></li>
              <li><Link href="/bikes?brand=Yamaha" className="hover:text-primary transition-colors">Yamaha</Link></li>
              <li><Link href="/bikes?brand=KTM" className="hover:text-primary transition-colors">KTM</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Contact Info</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                 <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                 <span>123 Auto Market Hub, Sector 14,<br/>New Delhi, 110001, India</span>
              </li>
              <li className="flex items-center gap-3">
                 <Phone className="h-5 w-5 text-primary shrink-0" />
                 <span>1800-123-Bikes (Toll Free)</span>
              </li>
              <li className="flex items-center gap-3">
                 <Mail className="h-5 w-5 text-primary shrink-0" />
                 <span>hello@motoxresell.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      <div className="border-t border-border/40 py-6">
        <div className="container max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MotoX Resell. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
