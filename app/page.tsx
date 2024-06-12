import { prisma } from "@/prisma/db";

export default async function Home() {
  const posts = await prisma.post.findMany({});
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>fuck you Ezikiel</div>
      {posts.map((post) =>
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>)}
    </main>
  );
}
