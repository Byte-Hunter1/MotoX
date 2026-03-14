import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  var _mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const globalWithMongoose = global as typeof global & {
  _mongooseConn?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

let cached = globalWithMongoose._mongooseConn;

if (!cached) {
  cached = globalWithMongoose._mongooseConn = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  const c = globalWithMongoose._mongooseConn!;
  if (c.conn) {
    return c.conn;
  }

  if (!c.promise) {
    c.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  c.conn = await c.promise;
  return c.conn;
}

