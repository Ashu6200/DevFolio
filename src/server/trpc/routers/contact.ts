import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { sendContactEmail } from '@/server/resend';
import { publicProcedure, router } from '../trpc';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
  consent: z.boolean().refine((val) => val === true, {
    message: 'DPDP Act consent is mandatory for processing personal data',
  }),
});

export const contactRouter = router({
  submit: publicProcedure.input(contactSchema).mutation(async ({ input }) => {
    try {
      const result = await sendContactEmail(input);
      return {
        message: 'Your message has been sent successfully!',
        ...result,
      };
    } catch (err: unknown) {
      console.error('Failed to dispatch contact email:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: errorMessage,
      });
    }
  }),
});
