import { z } from 'zod';

export const PostCreateSchema = z.object({
    title: z.string().min(1),
    pubName: z.string().min(1),
    content: z.string().min(10),
    dayOfWeek: z.string(),
    time: z.string(),
});

export type PostCreate = z.infer<typeof PostCreateSchema>;
