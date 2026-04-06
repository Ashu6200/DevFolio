import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export const contactRouter = router({
  submit: publicProcedure.input(contactSchema).mutation(async ({ input }) => {
    // TODO: integrate email service (e.g. Resend, Nodemailer)
    console.log('Contact form submission:', input);
    return { success: true };
  }),
});
