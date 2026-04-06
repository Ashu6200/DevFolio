import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '../trpc';
import {
  createWorkSchema,
  updateWorkSchema,
} from '@/server/schemas/work.schema';
import { WorkExperience } from '@/server/models';
import { connectToDatabase } from '@/server/db/mongoose';

export const workRouter = router({
  list: publicProcedure.query(async () => {
    await connectToDatabase();
    return WorkExperience.find({}).sort({ order: 1, startDate: -1 }).lean();
  }),

  byId: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    await connectToDatabase();
    return WorkExperience.findById(input.id).lean();
  }),

  create: protectedProcedure
    .input(createWorkSchema)
    .mutation(async ({ input, ctx }) => {
      await connectToDatabase();
      return WorkExperience.create({ ...input, userId: ctx.userId });
    }),

  update: protectedProcedure
    .input(updateWorkSchema)
    .mutation(async ({ input, ctx }) => {
      await connectToDatabase();
      const { id, ...data } = input;
      const doc = await WorkExperience.findOneAndUpdate(
        { _id: id, userId: ctx.userId },
        data,
        { new: true }
      );
      if (!doc) throw new Error('Work experience entry not found');
      return doc;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await connectToDatabase();
      await WorkExperience.findOneAndDelete({
        _id: input.id,
        userId: ctx.userId,
      });
      return { success: true };
    }),
});
