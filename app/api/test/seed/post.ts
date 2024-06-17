import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../prisma/db';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { pubName, title, day, time } = req.body;

        try {
            const post = await prisma.post.create({
                data: {
                    pubName,
                    title,
                    dayOfWeek: day,
                    time,
                    published: false
                },
            });

            res.status(201).json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create post', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(); // Metod ej tillåten
    }
}