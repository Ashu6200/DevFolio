import { z } from 'zod';

const tiptapDocSchema = z.object({
  type: z.literal('doc'),
  content: z.array(z.record(z.string(), z.unknown())),
});

export const createEducationSchema = z.object({
  institution: z.string().min(1).max(200),
  degree: z.string().min(1).max(200),
  field: z.string().min(1).max(200),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: tiptapDocSchema,
  highlights: z.array(z.string().max(100)).max(20).default([]),
  order: z.number().int().min(0).default(0),
});

export const updateEducationSchema = createEducationSchema.partial().extend({
  id: z.string(),
});
