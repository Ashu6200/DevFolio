import { toNextJsHandler } from 'better-auth/next-js';
import { getAuth } from '@/utils/auth';

async function handler(request: Request) {
  const auth = await getAuth();
  const handlers = toNextJsHandler(auth);

  return request.method === 'POST' ? handlers.POST(request) : handlers.GET(request);
}

export const GET = handler;
export const POST = handler;
