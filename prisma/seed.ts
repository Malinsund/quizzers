import { prisma } from './db';

async function main() {
    await prisma.post.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            title: "Disney Quiz",
            content: "Världens klurigaste DisneyQuiz",
            dayOfWeek: "Måndag",
            pubName: "Le pub",
            time: "2023-06-24T18:30",
            published: true
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