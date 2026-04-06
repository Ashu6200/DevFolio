import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '../trpc';
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/server/schemas/project.schema';
import { Project } from '@/server/models';
import { connectToDatabase } from '@/server/db/mongoose';

export const projectRouter = router({
  list: publicProcedure.query(async () => {
    await connectToDatabase();
    return Project.find({}).sort({ featured: -1, order: 1, createdAt: -1 }).lean();
  }),

  byId: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    await connectToDatabase();
    return Project.findById(input.id).lean();
  }),

  featured: publicProcedure.query(async () => {
    await connectToDatabase();
    return Project.find({ featured: true }).sort({ order: 1 }).lean();
  }),

  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ input, ctx }) => {
      await connectToDatabase();
      return Project.create({ ...input, userId: ctx.userId });
    }),

  update: protectedProcedure
    .input(updateProjectSchema)
    .mutation(async ({ input, ctx }) => {
      await connectToDatabase();
      const { id, ...data } = input;
      const doc = await Project.findOneAndUpdate(
        { _id: id, userId: ctx.userId },
        data,
        { new: true }
      );
      if (!doc) throw new Error('Project not found');
      return doc;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await connectToDatabase();
      await Project.findOneAndDelete({ _id: input.id, userId: ctx.userId });
      return { success: true };
    }),
});
