import { prisma } from "@/prisma/db";
import Link from "next/link";
import {
  Button,
  ButtonDiv,
  DropdownButton,
  DropdownContainer,
  DropdownOption,
  DropdownSelect,
  HomeTitle,
  OuterDiv,
  PostContent,
  PostDiv,
  PostPubName,
  PostTime,
  PostTitle,
  StyledWeekdayLink,
  WeekDayContainer,
} from "./styles/page.styles";

async function fetchPosts(dayOfWeek: string | null) {
  const posts = await prisma.post.findMany({
    where: dayOfWeek ? { dayOfWeek } : {},
  });
  return posts;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { veckodag?: string };
}) {
  const dayOfWeek = searchParams.veckodag || null;
  const posts = await fetchPosts(dayOfWeek);

  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return "";
    return dateTimeString.replace("T", " ");
  };

  return (
    <main>
      <div>
        <HomeTitle>Hitta ditt Quiz idag!</HomeTitle>
      </div>
      <WeekDayContainer>
        {[
          "Måndag",
          "Tisdag",
          "Onsdag",
          "Torsdag",
          "Fredag",
          "Lördag",
          "Söndag",
        ].map((day) => (
          <Link
            key={day}
            href={`/?veckodag=${day}`}
            style={{ textDecoration: "none" }}
          >
            <StyledWeekdayLink>{day}</StyledWeekdayLink>
          </Link>
        ))}
      </WeekDayContainer>

      <DropdownContainer>
        <form method="get" action="/">
          <DropdownSelect name="veckodag" defaultValue={dayOfWeek || ""}>
            <DropdownOption value="">Välj en dag</DropdownOption>
            <DropdownOption value="Måndag">Måndag</DropdownOption>
            <DropdownOption value="Tisdag">Tisdag</DropdownOption>
            <DropdownOption value="Onsdag">Onsdag</DropdownOption>
            <DropdownOption value="Torsdag">Torsdag</DropdownOption>
            <DropdownOption value="Fredag">Fredag</DropdownOption>
            <DropdownOption value="Lördag">Lördag</DropdownOption>
            <DropdownOption value="Söndag">Söndag</DropdownOption>
          </DropdownSelect>
          <DropdownButton type="submit">Filtrera</DropdownButton>
        </form>
      </DropdownContainer>

      <OuterDiv>
        {posts.map((post) => (
          <PostDiv key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostPubName>På: {post.pubName}</PostPubName>
            <PostContent>{post.content}</PostContent>
            <PostTime>
              Datum: {post.dayOfWeek} - {formatDateTime(post.time)}
            </PostTime>
          </PostDiv>
        ))}
      </OuterDiv>

      <ButtonDiv>
        <Link href="/post-form">
          <Button>Lägg till nytt quiz</Button>
        </Link>
      </ButtonDiv>
    </main>
  );
}
