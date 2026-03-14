"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { INDIAN_BIKE_BRANDS, INDIAN_CITIES, FUEL_TYPES } from "@/lib/constants";
import { UploadCloud, X, CheckCircle2, ShieldAlert } from "lucide-react";

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function SellPage() {
  const router = useRouter();
  const { data, status } = useSession();

  const [sellerName, setSellerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number>(2021);
  const [kilometers, setKilometers] = useState<number>(10000);
  const [price, setPrice] = useState<number>(60000);
  const [city, setCity] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("Petrol");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  const canSubmit = useMemo(() => {
    return (
      !!sellerName &&
      !!phone &&
      !!email &&
      !!brand &&
      !!model &&
      !!city &&
      year >= 1990 &&
      price > 0 &&
      files.length > 0
    );
  }, [sellerName, phone, email, brand, model, city, year, price, files.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  async function uploadImages() {
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const f of files) {
        const dataUrl = await fileToDataUrl(f);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ dataUrl }),
        });
        if (!res.ok) throw new Error("Upload failed");
        const json = (await res.json()) as { url: string };
        urls.push(json.url);
      }
      return urls;
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data?.user?.id) {
      toast.error("Please login first.");
      router.push("/auth/login");
      return;
    }
    if (!canSubmit) {
      toast.error("Please fill all required fields and upload photos.");
      return;
    }

    const images = await uploadImages().catch((err) => {
      toast.error(err?.message ?? "Image upload failed");
      return null;
    });
    if (!images) return;

    const title = `${brand} ${model}`;
    const res = await fetch("/api/bikes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        brand,
        model,
        year,
        kilometers,
        price,
        city,
        fuelType,
        description,
        images,
      }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      toast.error(json?.error ?? "Failed to create listing");
      return;
    }

    toast.success("Listing posted!");
    router.push("/dashboard");
  }

  return (
    <div className="bg-background min-h-[calc(100vh-4rem)] relative overflow-hidden">
      
      {/* Background abstract shape */}
      <div className="absolute top-[-10%] right-[-5%] w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full point-events-none z-0"></div>

      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20 relative z-10">
        
        <div className="text-center mb-10">
           <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Sell Your Bike</h1>
           <p className="text-muted-foreground text-lg max-w-xl mx-auto">
             Get the best price for your ride. Post your listing securely and reach verified buyers across Indian cities.
           </p>
        </div>

        <Card className="border-border/50 shadow-2xl bg-card rounded-3xl overflow-hidden backdrop-blur-sm">
          <CardContent className="p-6 sm:p-10">
            <form onSubmit={onSubmit} className="space-y-10">
              
              {/* Personal Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                   <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">1</div>
                   <h2 className="text-xl font-semibold">Contact Details</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <Label>Full Name</Label>
                     <Input
                       placeholder="e.g. Rahul Sharma"
                       value={sellerName}
                       onChange={(e) => setSellerName(e.target.value)}
                       required
                       className="bg-background/50 h-12"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label>Phone Number</Label>
                     <Input
                       placeholder="+91"
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                       required
                       className="bg-background/50 h-12"
                     />
                   </div>
                   <div className="space-y-2 sm:col-span-2">
                     <Label>Email Address</Label>
                     <Input
                       placeholder="you@example.com"
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                       className="bg-background/50 h-12"
                     />
                   </div>
                </div>
              </div>

              {/* Bike Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                   <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">2</div>
                   <h2 className="text-xl font-semibold">Bike Information</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <Label>Brand</Label>
                     <Select value={brand} onValueChange={(val) => setBrand(val || "")}>
                        <SelectTrigger className="bg-background/50 h-12">
                        <SelectValue placeholder="Select Brand" />
                        </SelectTrigger>
                        <SelectContent>
                        {INDIAN_BIKE_BRANDS.map((b) => (
                           <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2">
                     <Label>Model</Label>
                     <Input
                        placeholder="e.g. Classic 350"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                        className="bg-background/50 h-12"
                     />
                  </div>
                  <div className="space-y-2">
                     <Label>Registration Year</Label>
                     <Input
                        placeholder="e.g. 2021"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        required
                        className="bg-background/50 h-12"
                     />
                  </div>
                  <div className="space-y-2">
                     <Label>Kilometers Driven</Label>
                     <Input
                        placeholder="e.g. 15000"
                        type="number"
                        value={kilometers}
                        onChange={(e) => setKilometers(Number(e.target.value))}
                        required
                        className="bg-background/50 h-12"
                     />
                  </div>
                  <div className="space-y-2">
                     <Label>Location / City</Label>
                     <Select value={city} onValueChange={(val) => setCity(val || "")}>
                        <SelectTrigger className="bg-background/50 h-12">
                        <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                        {INDIAN_CITIES.map((c) => (
                           <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2">
                     <Label>Fuel Type</Label>
                     <Select value={fuelType} onValueChange={(val) => setFuelType(val || "")}>
                     <SelectTrigger className="bg-background/50 h-12">
                        <SelectValue placeholder="Select Fuel Type" />
                     </SelectTrigger>
                     <SelectContent>
                        {FUEL_TYPES.map((f) => (
                           <SelectItem key={f} value={f}>{f}</SelectItem>
                        ))}
                     </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                     <Label>Expected Price (₹)</Label>
                     <Input
                        placeholder="e.g. 150000"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        className="bg-background/50 h-12 text-lg font-bold text-primary"
                     />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                     <Label>Description & Condition</Label>
                     <Textarea
                        placeholder="Mention any scratches, recent services, or mods..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-background/50 min-h-[120px]"
                     />
                  </div>
                </div>
              </div>

              {/* Photos Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                   <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">3</div>
                   <h2 className="text-xl font-semibold">Upload Photos</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-background/30 flex flex-col items-center justify-center cursor-pointer relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="font-semibold text-lg mb-1">Click or drag images here</p>
                    <p className="text-sm text-muted-foreground">Upload 3-6 clear photos of your bike.</p>
                  </div>

                  {previews.length > 0 && (
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {previews.map((src, i) => (
                           <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-background relative">
                              <Image src={src} fill alt="Preview" className="object-cover" />
                              <button 
                                type="button" 
                                onClick={() => removeFile(i)}
                                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                 <X className="h-4 w-4" />
                              </button>
                           </div>
                        ))}
                     </div>
                  )}
                </div>
              </div>

              {/* Trust markers */}
              <div className="bg-secondary/30 rounded-2xl p-4 flex items-start sm:items-center gap-3 border border-secondary">
                 <ShieldAlert className="h-6 w-6 text-primary shrink-0" />
                 <p className="text-sm text-muted-foreground">
                    By submitting this form, you affirm that the details provided are accurate. False claims may lead to permanent ban from MotoX.
                 </p>
              </div>

              <Button
                disabled={!canSubmit || uploading || status !== "authenticated"}
                className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 font-bold tracking-wide"
              >
                {uploading ? (
                   "Processing Upload..."
                ) : (
                   <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Post Listing Securely</span>
                )}
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

