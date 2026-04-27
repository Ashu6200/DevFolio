import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const workFormSchema = z.object({
  company: z.string().min(1, 'Required').max(200),
  role: z.string().min(1, 'Required').max(200),
  techStack: z.string(),
  startDate: z.string().min(1, 'Required'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.record(z.string(), z.unknown()),
  attachments: z.array(z.string()),
  order: z.number().int().min(0),
});
export type WorkFormValues = z.infer<typeof workFormSchema>;

export const educationFormSchema = z.object({
  institution: z.string().min(1, 'Required').max(200),
  degree: z.string().min(1, 'Required').max(200),
  field: z.string().min(1, 'Required').max(200),
  startDate: z.string().min(1, 'Required'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.record(z.string(), z.unknown()),
  highlights: z.string(),
  order: z.number().int().min(0),
});
export type EducationFormValues = z.infer<typeof educationFormSchema>;

export const projectFormSchema = z.object({
  title: z.string().min(1, 'Required').max(200),
  description: z.record(z.string(), z.unknown()),
  techStack: z.string(),
  githubLink: z.string().optional(),
  liveUrl: z.string().optional(),
  coverImage: z.string().optional(),
  featured: z.boolean(),
  order: z.number().int().min(0),
});
export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(1, 'Required').max(200),
  message: z.string().min(1, 'Required').max(5000),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;
