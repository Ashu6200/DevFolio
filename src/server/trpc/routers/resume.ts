import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../trpc';
import { Resume } from '@/server/models';

export const resumeRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await Resume.find({ userId: ctx.userId }).sort({ createdAt: -1 }).lean();
  }),
  
  create: protectedProcedure
    .input(z.object({ name: z.string(), url: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const count = await Resume.countDocuments({ userId: ctx.userId });
      // Make active by default if it's the first one
      const isActive = count === 0;
      return await Resume.create({
        ...input,
        userId: ctx.userId,
        isActive
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await Resume.findOneAndDelete({ _id: input.id, userId: ctx.userId });
    }),

  setActive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Deactivate all others
      await Resume.updateMany({ userId: ctx.userId }, { isActive: false });
      // Activate the selected one
      return await Resume.findOneAndUpdate(
        { _id: input.id, userId: ctx.userId },
        { isActive: true },
        { new: true }
      );
    }),

  getActive: publicProcedure.query(async () => {
    // Return the currently active resume. Since this is a single-user portfolio conceptually, we just fetch the active one.
    // In a multi-user environment, we'd filter by userId if we had one in public context.
    return await Resume.findOne({ isActive: true }).lean();
  }),
});
