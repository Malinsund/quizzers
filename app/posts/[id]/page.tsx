import { prisma } from "@/prisma/db";
import { notFound } from "next/navigation";
import {
  OuterDiv,
  PostContent,
  PostDiv,
  PostPubName,
  PostTime,
  PostTitle,
} from "../../styles/page.styles";

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PostPageProps) {
  const postId = parseInt(params.id, 10);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return { title: "Inlägg ej hittat" };
  }

  return {
    title: post.title,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const postId = parseInt(params.id, 10);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  return (
    <OuterDiv>
      <PostDiv>
        <PostTitle>{post?.title}</PostTitle>
        <PostPubName>På: {post?.pubName}</PostPubName>
        <PostContent>{post?.content}</PostContent>
        <PostTime>
          Datum: {post?.dayOfWeek} - {post?.time}
        </PostTime>
        <PostContent>{post?.website}</PostContent>
      </PostDiv>
    </OuterDiv>
  );
}
