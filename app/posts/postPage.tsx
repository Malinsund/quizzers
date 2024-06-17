"use client"
import { prisma } from '@/prisma/db';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { z } from 'zod';


const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  pubName: z.string(),
  dayOfWeek: z.string(),
  time: z.string(),
});

type Post = z.infer<typeof PostSchema>;

const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: red;
  margin-top: 20px;
`;

const PostDiv = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await prisma.post.findMany({
          select: {
            id: true,
            title: true,
            content: true,
            pubName: true,
            dayOfWeek: true,
            time: true,
          },
        });

        
        const validPosts = fetchedPosts.map(post => PostSchema.parse(post));
        setPosts(validPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Link href="/posts?day=Monday">Måndag</Link>
        <Link href="/posts?day=Tuesday">Tisdag</Link>
        <Link href="/posts?day=Wednesday">Onsdag</Link>
        <Link href="/posts?day=Thursday">Torsdag</Link>
        <Link href="/posts?day=Friday">Fredag</Link>
        <Link href="/posts?day=Saturday">Lördag</Link>
        <Link href="/posts?day=Sunday">Söndag</Link>
      </div>

      <OuterDiv>
        {posts.map((post) => (
          <PostDiv key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Pub: {post.pubName}</p>
            <p>Dag: {post.dayOfWeek}</p>
            <p>Tid: {post.time}</p>
            
          </PostDiv>
        ))}
      </OuterDiv>

      
      <Link href="/FormPage">
        <Button>Lägg till quiz</Button>
      </Link>
    </main>
  );
}