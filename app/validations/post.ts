import { z } from 'zod';

export const PostCreateSchema = z.object({
    title: z.string().min(1, {message: "Du måste fylla i en titel"}),
    pubName: z.string().min(1, {message: "Du måste fylla i ett pubnamn"}),
    content: z.string().min(10, {message: "Du måste fylla i en beskrivning"}),
    dayOfWeek: z.string(),
    time: z.string(),
    website: z.string().url("Länken till hemsidan är inte giltig").optional(),
});

export type PostCreate = z.infer<typeof PostCreateSchema>;
