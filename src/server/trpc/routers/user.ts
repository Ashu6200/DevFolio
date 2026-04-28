import { protectedProcedure, router, publicProcedure } from '../trpc';
import mongoose from 'mongoose';

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return {
      id: ctx.session.user.id,
      name: ctx.session.user.name,
      email: ctx.session.user.email,
      image: ctx.session.user.image,
    };
  }),

  sessionInfo: protectedProcedure.query(async ({ ctx }) => {
    const s = ctx.session.session as Record<string, unknown>;
    return {
      sessionId: ctx.session.session.id,
      ipAddress: ctx.session.session.ipAddress,
      userAgent: ctx.session.session.userAgent,
      createdAt: ctx.session.session.createdAt,
      expiresAt: ctx.session.session.expiresAt,
      fingerprintHash: (s.fingerprintHash as string) || null,
    };
  }),

  publicProfile: publicProcedure.query(async () => {
    const db = mongoose.connection.getClient().db();
    const user = await db.collection('user').findOne({});
    if (!user) return null;
    return {
      name: user.name,
      bio: user.bio,
    };
  }),
});
