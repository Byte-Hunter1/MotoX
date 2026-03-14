import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export const metadata = {
  title: 'Contact Us | MotoX',
  description: 'Get in touch with MotoX for buying, selling, or test-riding pre-owned bikes.',
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-[calc(100vh-4rem)] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[150px] rounded-full point-events-none z-0"></div>
      
      <div className="container mx-auto max-w-screen-xl px-4 py-16 md:py-24 relative z-10">
         
         <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Let&apos;s Talk <span className="text-primary">Bikes.</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Whether you&apos;re looking for your dream ride, selling your old trusted companion, or just want to say hi—our team is ready to help you gear up.
            </p>
         </div>

         <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
            
            {/* Contact Details side */}
            <div className="space-y-8">
               
               <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                     <ContactItem 
                        icon={<MapPin />}
                        title="Headquarters"
                        detail="123 Rev Road, Indiranagar, Bangalore, Karnataka 560038"
                     />
                     <ContactItem 
                        icon={<Phone />}
                        title="Sales & Support"
                        detail="+91 1800 123 4567"
                        sub="Mon-Sat, 9AM to 8PM"
                     />
                     <ContactItem 
                        icon={<Mail />}
                        title="Email Us"
                        detail="hello@motoxbikes.in"
                        sub="We reply within 24 hours"
                     />
                  </div>
               </div>

               <hr className="border-border/40" />

               <div>
                  <h3 className="text-xl font-bold mb-4">Visit Our Hubs</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl border border-border/50 bg-card/30 hover:border-primary/50 transition-colors">
                        <MapPin className="w-5 h-5 text-primary mb-2" />
                        <p className="font-semibold text-foreground">Koramangala</p>
                        <p className="text-sm text-muted-foreground">Bangalore South</p>
                     </div>
                     <div className="p-4 rounded-xl border border-border/50 bg-card/30 hover:border-primary/50 transition-colors">
                        <MapPin className="w-5 h-5 text-primary mb-2" />
                        <p className="font-semibold text-foreground">HSR Layout</p>
                        <p className="text-sm text-muted-foreground">Bangalore East</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Form Side */}
            <Card className="border-border/50 shadow-2xl bg-card rounded-3xl overflow-hidden backdrop-blur-sm">
               <CardContent className="p-6 sm:p-10">
                  <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
                  
                  <form className="space-y-6">
                     <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label>First Name</Label>
                           <Input placeholder="John" className="bg-background/50 h-12" />
                        </div>
                        <div className="space-y-2">
                           <Label>Last Name</Label>
                           <Input placeholder="Doe" className="bg-background/50 h-12" />
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input type="email" placeholder="john@example.com" className="bg-background/50 h-12" />
                     </div>

                     <div className="space-y-2">
                        <Label>Phone Number (Optional)</Label>
                        <Input type="tel" placeholder="+91" className="bg-background/50 h-12" />
                     </div>

                     <div className="space-y-2">
                        <Label>How can we help you?</Label>
                        <Textarea 
                           placeholder="I'm interested in buying a Royal Enfield Classic 350..." 
                           className="bg-background/50 min-h-[150px] resize-y" 
                        />
                     </div>

                     <Button className="w-full h-14 text-lg rounded-xl font-bold group">
                        <Send className="w-5 h-5 mr-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        Send Message
                     </Button>
                  </form>
               </CardContent>
            </Card>

         </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, title, detail, sub }: { icon: React.ReactNode, title: string, detail: string, sub?: string }) {
   return (
      <div className="flex gap-4 items-start">
         <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
            {icon}
         </div>
         <div>
            <p className="font-semibold text-foreground mb-1">{title}</p>
            <p className="text-muted-foreground leading-relaxed">{detail}</p>
            {sub && <p className="text-sm text-muted-foreground/70 mt-1">{sub}</p>}
         </div>
      </div>
   )
}
