import { z } from 'zod';

const PostSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string().nullable(),
    dayOfWeek: z.string().nullable(),
    time: z.string().nullable(),
    pubName: z.string().nullable(),
});

export default PostSchema;