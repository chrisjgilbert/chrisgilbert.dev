import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    status: z.enum(["active", "shipped", "paused", "archived"]),
    startDate: z.coerce.date(),
    links: z
      .object({
        github: z.string().url().optional(),
        url: z.string().url().optional(),
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

const projectUpdates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projectUpdates" }),
  schema: z.object({
    project: z.string(),
    date: z.coerce.date(),
    title: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects, projectUpdates };
