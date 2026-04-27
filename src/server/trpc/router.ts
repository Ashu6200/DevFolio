import { contactRouter } from './routers/contact';
import { educationRouter } from './routers/education';
import { workRouter } from './routers/job';
import { projectRouter } from './routers/project';
import { resumeRouter } from './routers/resume';
import { userRouter } from './routers/user';
import { router } from './trpc';

export const appRouter = router({
  user: userRouter,
  project: projectRouter,
  education: educationRouter,
  work: workRouter,
  contact: contactRouter,
  resume: resumeRouter,
});

export type AppRouter = typeof appRouter;
