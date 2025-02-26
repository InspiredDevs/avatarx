import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Call AI API (e.g., DALL·E) to generate an avatar
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: 'A futuristic AI-generated avatar, digital art', n: 1, size: '256x256' })
        });

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            throw new Error('No image returned from AI API');
        }

        res.status(200).json({ image: data.data[0].url });
    } catch (error) {
        console.error('Error generating avatar:', error);
        res.status(500).json({ error: 'Failed to generate avatar' });
    }
}
