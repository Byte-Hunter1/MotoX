import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bike, Menu, MapPin, Phone } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
              <Bike className="h-5 w-5" />
            </div>
            <span className="font-bold sm:inline-block text-xl tracking-tight">Moto<span className="text-primary">X</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/bikes" className="transition-colors hover:text-foreground">Browse Bikes</Link>
            <Link href="/about" className="transition-colors hover:text-foreground">About Us</Link>
            <Link href="/contact" className="transition-colors hover:text-foreground">Contact</Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center gap-4 mr-4 text-sm text-muted-foreground">
             <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Select City</span>
             </div>
             <div className="w-[1px] h-4 bg-border"></div>
             <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                <Phone className="h-4 w-4 text-primary" />
                <span>1800-123-Bikes</span>
             </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" className="hidden sm:flex text-muted-foreground hover:text-foreground">Log in</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-md shadow-primary/20 transition-all">
              <Link href="/sell" className="px-2">Sell Your Bike</Link>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden border-border/40 bg-background/50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
