import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;

        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: `A high-quality cartoon avatar, ${prompt}, clean and detailed, digital art style`,
            n: 1,
            size: '1024x1024',
        });

        const imageUrl = response.data[0].url;
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error generating avatar:', error);
        res.status(500).json({ error: 'Failed to generate avatar' });
    }
}
