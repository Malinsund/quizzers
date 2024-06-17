import { prisma } from '@/prisma/db';
import Link from 'next/link';
import { z } from 'zod';
import { Button, OuterDiv, PostDiv, StyledWeekdayLink, WeekDayContainer } from './page.styles';


const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  pubName: z.string(),
  dayOfWeek: z.string(),
  time: z.string(),
});

type Post = z.infer<typeof PostSchema>;

export default async function HomePage({ searchParams }: any) {
  console.log(searchParams.veckodag)
  const posts = await prisma.post.findMany({ where: { dayOfWeek: searchParams.veckodag } });

  return (
    <div>
      <h1>Hitta ditt Quiz idag!</h1>

      <main>
        <WeekDayContainer>
          <Link href="/?veckodag=Måndag">
            <StyledWeekdayLink>Måndag</StyledWeekdayLink>
          </Link>
          <Link href="/?veckodag=Tisdag">
            <StyledWeekdayLink>Tisdag</StyledWeekdayLink>
          </Link>
          <Link href="/?veckodag=Onsdag">
            <StyledWeekdayLink>Onsdag</StyledWeekdayLink>
          </Link>
          <Link href="/?veckodag=Torsdag">
            <StyledWeekdayLink>Torsdag</StyledWeekdayLink>
          </Link>
          <Link href="/?veckodag=Fredag">
            <StyledWeekdayLink>Fredag</StyledWeekdayLink>
          </Link>
          <Link href="/?veckodag=Lördag">
            <StyledWeekdayLink>Lördag</StyledWeekdayLink>
          </Link>
          <Link href="/?veckodag=Söndag">
            <StyledWeekdayLink>Söndag</StyledWeekdayLink>
          </Link>
        </WeekDayContainer>

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

        
        <Link href="/post-form">
          <Button>Lägg till quiz</Button>
        </Link>
      </main>
    </div>
  );
}