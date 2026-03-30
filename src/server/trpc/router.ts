import { blogRouter } from './routers/blog';
import { contactRouter } from './routers/contact';
import { educationRouter } from './routers/education';
import { jobRouter } from './routers/job';
import { projectRouter } from './routers/project';

import { userRouter } from './routers/user';
import { router } from './trpc';

export const appRouter = router({
  user: userRouter,
  project: projectRouter,
  blog: blogRouter,
  education: educationRouter,
  job: jobRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
