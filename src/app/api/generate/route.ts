import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not defined in environment variables");
}

const openai = new OpenAI({ apiKey });

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // Log the prompt (for debugging)
        console.log("Received prompt:", prompt);

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `A high-quality cartoon avatar, ${prompt}, clean and detailed, digital art style`,
            n: 1,
            size: "1024x1024",
        });

        // Log the full response for debugging (be careful with sensitive info)
        console.log("OpenAI API response:", response);

        // The response may have a nested structure: response.data.data[0].url
        if (!response.data || !response.data.data || response.data.data.length === 0) {
            throw new Error("Invalid response format from OpenAI API");
        }

        const imageUrl = response.data.data[0].url;
        return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (error: any) {
        console.error("Error generating avatar:", error);
        return NextResponse.json(
            { error: "Failed to generate avatar", details: error.message },
            { status: 500 }
        );
    }
}
