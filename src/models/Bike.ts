import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBike extends Document {
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  kilometers: number;
  city: string;
  fuelType: string;
  ownerType?: string;
  description?: string;
  images: string[];
  sellerId: Types.ObjectId;
  registrationState?: string;
  condition?: string;
  createdAt: Date;
}

const BikeSchema: Schema<IBike> = new Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    kilometers: { type: Number, required: true },
    city: { type: String, required: true },
    fuelType: { type: String, required: true },
    ownerType: { type: String },
    description: { type: String },
    images: [{ type: String, required: true }],
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    registrationState: { type: String },
    condition: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Bike: Model<IBike> =
  (mongoose.models.Bike as Model<IBike>) ||
  mongoose.model<IBike>("Bike", BikeSchema);

