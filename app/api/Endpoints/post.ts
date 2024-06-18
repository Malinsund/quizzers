import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, content, dayOfWeek, time, pubName } = req.body;

        try {
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    dayOfWeek,
                    time,
                    pubName,
                },
            });

            res.status(201).json(newPost);
        } catch (error) {
            console.error('Database insertion error:', error);
            res.status(500).json({ error: 'Failed to add quiz' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}