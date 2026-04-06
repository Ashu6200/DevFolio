import { z } from 'zod';

const tiptapDocSchema = z.object({
  type: z.literal('doc'),
  content: z.array(z.record(z.string(), z.unknown())),
});

export const createProjectSchema = z.object({
  title: z.string().min(1).max(200),
  description: tiptapDocSchema,
  techStack: z.array(z.string().max(50)).max(20).default([]),
  githubLink: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string(),
});
