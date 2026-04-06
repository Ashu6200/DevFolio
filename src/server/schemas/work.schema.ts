import { z } from 'zod';

export const createWorkSchema = z.object({
  company: z.string().min(1).max(200),
  role: z.string().min(1).max(200),
  techStack: z.array(z.string().max(50)).max(20).default([]),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().max(2000).default(''),
  order: z.number().int().min(0).default(0),
});

export const updateWorkSchema = createWorkSchema.partial().extend({
  id: z.string(),
});
