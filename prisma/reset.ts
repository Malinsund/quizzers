import { prisma } from './db';



async function main() {
    // NEVER ALLOW THIS OUTSIDE THE TEST ENVIROMENT!!!
    if (process.env.NODE_ENV !== "test") return;


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