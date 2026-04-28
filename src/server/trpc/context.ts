import { headers } from 'next/headers';
import { connectToDatabase } from '@/server/db/mongoose';

export async function createContext() {
  await connectToDatabase();
  return {
    headers: await headers(),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
