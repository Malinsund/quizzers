import { prisma } from './db';

async function main() {
    await prisma.post.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            title: "First Post",
            content: "This is the first post content.",
            dayOfWeek: "Monday",
            pubName: "Example Pub",
            time: "19:00",
            published: false
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });