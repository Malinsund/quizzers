"use server";

import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { PostCreate, PostCreateSchema } from "../post-form/validations/postSchema";

export async function savePost(incomingData: PostCreate) {
    const postData = PostCreateSchema.parse(incomingData);

    const post = await prisma.post.create({
        data: {
            title: postData.title,
            content: postData.content,
            dayOfWeek: postData.dayOfWeek,
            time: postData.time,
            pubName: postData.pubName,


        },
    });

    revalidatePath("/");
}
