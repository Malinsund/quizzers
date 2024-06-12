import { prisma } from './db';



async function main() {
    await prisma.post.deleteMany({});
    // ta bort från alla tabeller
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