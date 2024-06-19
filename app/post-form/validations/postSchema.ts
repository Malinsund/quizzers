import { z } from 'zod';

export const PostCreateSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    content: z.string().min(10),
    dayOfWeek: z.string(),
    time: z.string(),
    pubName: z.string().min(1),
});

export type PostCreate = z.infer<typeof PostCreateSchema>;
