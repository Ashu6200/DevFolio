import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '../trpc';
import {
  createEducationSchema,
  updateEducationSchema,
} from '@/server/schemas/education.schema';
import { Education } from '@/server/models';
import { connectToDatabase } from '@/server/db/mongoose';

export const educationRouter = router({
  list: publicProcedure.query(async () => {
    await connectToDatabase();
    return Education.find({}).sort({ order: 1, startDate: -1 }).lean();
  }),

  byId: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    await connectToDatabase();
    return Education.findById(input.id).lean();
  }),

  create: protectedProcedure
    .input(createEducationSchema)
    .mutation(async ({ input, ctx }) => {
      await connectToDatabase();
      return Education.create({ ...input, userId: ctx.userId });
    }),

  update: protectedProcedure
    .input(updateEducationSchema)
    .mutation(async ({ input, ctx }) => {
      await connectToDatabase();
      const { id, ...data } = input;
      const doc = await Education.findOneAndUpdate(
        { _id: id, userId: ctx.userId },
        data,
        { new: true }
      );
      if (!doc) throw new Error('Education entry not found');
      return doc;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await connectToDatabase();
      await Education.findOneAndDelete({ _id: input.id, userId: ctx.userId });
      return { success: true };
    }),
});
