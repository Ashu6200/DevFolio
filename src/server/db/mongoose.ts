import dns from 'node:dns';
import dnsPromises from 'node:dns/promises';
import type mongoose from 'mongoose';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  if (dnsPromises && typeof dnsPromises.setServers === 'function') {
    dnsPromises.setServers(['8.8.8.8', '1.1.1.1']);
  }
} catch {
  // Ignore in environments where setting DNS servers is not allowed
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached!.conn) {
    return cached!.conn;
  }

  const MONGODB_URI = process.env.DATABASE_URL;
  if (!MONGODB_URI) {
    throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
  }

  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    if (dnsPromises && typeof dnsPromises.setServers === 'function') {
      dnsPromises.setServers(['8.8.8.8', '1.1.1.1']);
    }
  } catch {
    // Ignore in environments where setting DNS servers is not allowed
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}
