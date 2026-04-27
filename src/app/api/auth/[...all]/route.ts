import { getAuth } from '@/utils/auth';
import { toNextJsHandler } from 'better-auth/next-js';

async function handler(request: Request) {
  const auth = await getAuth();
  const handlers = toNextJsHandler(auth);

  return request.method === 'POST' ? handlers.POST(request) : handlers.GET(request);
}

export const GET = handler;
export const POST = handler;
