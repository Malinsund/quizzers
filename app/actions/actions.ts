"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../prisma/db";
import { PostCreate, PostCreateSchema } from "../validations/post";

export async function savePost(incomingData: PostCreate) {
    const postData = PostCreateSchema.parse(incomingData);

    const post = await prisma.post.create({
        data: {
            id: postData.id,
            title: postData.title,
            content: postData.content,
            dayOfWeek: postData.dayOfWeek,
            time: postData.time,
            pubName: postData.pubName,


        },
    });

    revalidatePath("/");
}
