import { publicProcedure, router } from '../trpc';

export const projectRouter = router({
  list: publicProcedure.query(() => {
    return [{ id: 1, title: 'Test Project' }];
  }),
});
