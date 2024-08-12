import { PostCreateSchema } from '@/app/validations/post';
import { prisma } from '@/prisma/db';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const postData = PostCreateSchema.parse(data);

    const post = await prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        dayOfWeek: postData.dayOfWeek,
        time: postData.time,
        pubName: postData.pubName,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}