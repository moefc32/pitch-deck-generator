import {
    VITE_GEMINI_SECRET,
    VITE_GEMINI_MODEL
} from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const slides = await request.json();
        
        const genAI = new GoogleGenerativeAI(VITE_GEMINI_SECRET);
        const model = genAI.getGenerativeModel({ model: VITE_GEMINI_MODEL });

        const enhancePrompt = `Analyze this presentation slide content and provide visual enhancement suggestions in JSON format. For each slide, return an object with:
        - backgroundColor: A hex color that best matches the slide's content and emotion
        - fontSize: Suggested title font size (24-48)
        - emphasis: Array of keywords that should be emphasized
        - layout: Suggested layout type ("centered", "left-aligned", "two-column")
        
        Only return valid JSON, no other text. Input slides: ${JSON.stringify(slides)}`;

        const generate = await model.generateContent(enhancePrompt);
        const getResult = generate.response.text();
        const cleanData = getResult.replace(/```json\n|\n```/g, '').trim();

        try {
            const enhancements = JSON.parse(cleanData);
            return json({
                generated: slides,
                enhancements: enhancements
            });
        } catch (e) {
            console.error('Error parsing enhancement result:', e);
            return json(null, { status: 500 });
        }
    } catch (error) {
        console.error('Error enhancing slides:', error);
        return json(null, { status: 500 });
    }
}