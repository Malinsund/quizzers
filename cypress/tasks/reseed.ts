import { prisma } from "@/prisma/db";

export async function reseed() {
    // NEVER ALLOW THIS OUTSIDE THE TEST ENVIROMENT!!!
    if (process.env.NODE_ENV !== "test") return;

    // =============== RESET =============== //

    await prisma.post.deleteMany({});
    // ta bort från alla tabeller


    // ============= SEED =============
    await prisma.post.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            pubName: "The Pub",
            title: "Världens bästa quiz",
            content: "Ett fantastiskt allmänquiz",
            dayOfWeek: "Måndag",
            time: "2023-06-24T18:30",
        }
    });

    return null;

}