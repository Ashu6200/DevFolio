import z from 'zod';
import { publicProcedure, router } from '../trpc';

export const blogRouter = router({
  list: publicProcedure.query(() => {
    return [{ id: 1, title: 'Test' }];
  }),

  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return { id: input, title: `Blog ${input}` };
  }),
});
