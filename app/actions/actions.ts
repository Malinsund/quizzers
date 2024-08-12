/* import { revalidatePath } from "next/cache";
import { prisma } from "../../prisma/db";
import { PostCreate, PostCreateSchema } from "../validations/post";

export async function savePost(incomingData: PostCreate) {
  try {
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

    revalidatePath("/"); // Detta borde vara korrekt, men kontrollera om det fungerar
  } catch (error) {
    console.error("Error saving post:", error);
  }
} */