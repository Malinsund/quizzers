import { prisma } from './db';

async function main() {

    const posts = [
        {
            id: 1,
            title: 'Disney Quiz',
            content: 'Världens klurigaste DisneyQuiz hos oss på Lé pub, kom och testa dina kunskaper och vinn fina priser i baren!',
            dayOfWeek: 'Måndag',
            pubName: 'Lé pub',
            time: '2023-06-24T18:30',
            website: 'https://example.com',
            published: true,
        },
        {
            id: 2,
            title: 'Harry Potter',
            content: 'Äntligen är vårat Harry Potter quiz tillbaka, nu svårare än någonsin! Quizmaster Bengan tar oss igenom 30 frågor där ni kan vinna 500 kr i baren!',
            dayOfWeek: 'Onsdag',
            pubName: 'Sejdeln',
            time: '2023-06-26T19:00',
            website: 'https://example.com',
            published: true,
        },
        {
            id: 3,
            title: 'Allmän-quiz',
            content: 'Våran populära duo kör ett allmänquiz med allt möjligt från musik tll film, gnugga geiknölarna och var med på göteborgs kanske roligaste quiz',
            dayOfWeek: 'Onsdag',
            pubName: 'Jerntorgets Brygghus',
            time: '2023-06-26T19:30',
            website: 'https://example.com',
            published: true,
        },

    ];


    for (const post of posts) {
        await prisma.post.upsert({
            where: { id: post.id },
            update: {},
            create: post,
        });
    }
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