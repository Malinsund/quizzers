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

export default async function HomePage({ searchParams }: any) {
  console.log(searchParams.veckodag);
  const posts = await prisma.post.findMany({
    where: { dayOfWeek: searchParams.veckodag },
  });

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
        <Link href="/?veckodag=Måndag" style={{ textDecoration: "none" }}>
          <StyledWeekdayLink>Måndag</StyledWeekdayLink>
        </Link>
        <Link href="/?veckodag=Tisdag" style={{ textDecoration: "none" }}>
          <StyledWeekdayLink>Tisdag</StyledWeekdayLink>
        </Link>
        <Link href="/?veckodag=Onsdag" style={{ textDecoration: "none" }}>
          <StyledWeekdayLink>Onsdag</StyledWeekdayLink>
        </Link>
        <Link href="/?veckodag=Torsdag" style={{ textDecoration: "none" }}>
          <StyledWeekdayLink>Torsdag</StyledWeekdayLink>
        </Link>
        <Link href="/?veckodag=Fredag" style={{ textDecoration: "none" }}>
          <StyledWeekdayLink>Fredag</StyledWeekdayLink>
        </Link>
        <Link href="/?veckodag=Lördag" style={{ textDecoration: "none" }}>
          <StyledWeekdayLink>Lördag</StyledWeekdayLink>
        </Link>
        <Link href="/?veckodag=Söndag" style={{ textDecoration: "none" }}>
          <StyledWeekdayLink>Söndag</StyledWeekdayLink>
        </Link>
      </WeekDayContainer>

      <DropdownContainer>
        <form method="get" action="/">
          <DropdownSelect name="veckodag">
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
