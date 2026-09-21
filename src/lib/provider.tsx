'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import superjson from 'superjson';
import { trpc } from '@/utils/trpc';

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const fingerprintRef = useRef<string | null>(null);

  useEffect(() => {
    import('@/lib/fingerprint').then(async ({ getFingerprintHash }) => {
      fingerprintRef.current = await getFingerprintHash();
    });
  }, []);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
          headers() {
            const headers: Record<string, string> = {};
            if (fingerprintRef.current) {
              headers['x-fingerprint-hash'] = fingerprintRef.current;
            }
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default GlobalProvider;
