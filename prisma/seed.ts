import { prisma } from './db';



async function main() {
    await prisma.post.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            title: "tjena",
            content: "första posten"
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })