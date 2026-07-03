const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const projectSchema = z.object({
  title: z.string().min(2).max(160),
  description: z.string().min(2).max(1000),
  content: z.string().optional().nullable(),
  techStack: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().or(z.literal('')).nullable(),
  liveUrl: z.string().url().optional().or(z.literal('')).nullable(),
  coverImage: z.string().optional().nullable(),
  images: z.array(z.string()).default([]),
  featured: z.boolean().optional().default(false),
});

const projectUpdateSchema = projectSchema.partial();

const blogSchema = z.object({
  title: z.string().min(2).max(200),
  content: z.string().min(1),
  coverImage: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().optional().default(false),
});

const blogUpdateSchema = blogSchema.partial();

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(5).max(5000),
});

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

module.exports = {
  loginSchema,
  projectSchema,
  projectUpdateSchema,
  blogSchema,
  blogUpdateSchema,
  contactSchema,
  paginationSchema,
};
