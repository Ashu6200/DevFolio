import { auth } from '@/utils/auth';
import { Context } from './context';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { headers } from 'next/headers';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Check if two IPs share the same /16 subnet (first two octets)
function isSameSubnet(ip1: string, ip2: string): boolean {
  const parts1 = ip1.split('.');
  const parts2 = ip2.split('.');
  if (parts1.length < 2 || parts2.length < 2) return true;
  return parts1[0] === parts2[0] && parts1[1] === parts2[1];
}

export const protectedProcedure = t.procedure.use(async (opts) => {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  // Fingerprint validation
  const requestFingerprint = reqHeaders.get('x-fingerprint-hash');
  const sessionFingerprint = (session.session as Record<string, unknown>)
    .fingerprintHash as string | undefined;

  if (
    sessionFingerprint &&
    requestFingerprint &&
    sessionFingerprint !== requestFingerprint
  ) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Device fingerprint mismatch. Please sign in again.',
    });
  }

  // IP validation — major subnet change triggers re-auth
  const currentIp = reqHeaders
    .get('x-forwarded-for')
    ?.split(',')[0]
    ?.trim();
  const sessionIp = session.session.ipAddress;

  if (currentIp && sessionIp && !isSameSubnet(currentIp, sessionIp)) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'IP address change detected. Please sign in again.',
    });
  }

  return opts.next({
    ctx: {
      session,
      userId: session.user.id,
    },
  });
});
