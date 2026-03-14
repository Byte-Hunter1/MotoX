import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IWishlist extends Document {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  createdAt: Date;
}

const WishlistSchema: Schema<IWishlist> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: "Bike", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

WishlistSchema.index({ userId: 1, bikeId: 1 }, { unique: true });

export const Wishlist: Model<IWishlist> =
  (mongoose.models.Wishlist as Model<IWishlist>) ||
  mongoose.model<IWishlist>("Wishlist", WishlistSchema);

