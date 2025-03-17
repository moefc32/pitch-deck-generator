import {
    VITE_APP_NAME,
    VITE_GEMINI_SECRET,
    VITE_GEMINI_MODEL
} from '$env/static/private';
import { json, error } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';

const defaultPrompt = 'Generate a pitch-deck presentation in format of JSON only with "title" and "body" properties, no other words, no warning, explaining in order of "background, problem, and proposed solution". For each slide, if bullet points are used, the "body" property must be a single string with bullet points (•) separated by newlines. Slides without bullet points should have regular paragraph text in the "body".  Include compelling data, metrics, and market insights where relevant. Generate 10 slides including title and closing slide, ensuring a cohesive narrative flow from context through solution.';

export async function POST({ request }) {
    const {
        topic = '',
        language = '',
        tone = '',
    } = await request.json() || {};

    try {
        const genAI = new GoogleGenerativeAI(VITE_GEMINI_SECRET);
        const model = genAI.getGenerativeModel({ model: VITE_GEMINI_MODEL });

        const generate = await model.generateContent(`
            ${defaultPrompt}, about "${topic}", in formal and proper ${language} with ${tone} tone.`);

        const getResult = generate.response.text();
        const cleanData = getResult.replace(/```json\n|\n```/g, '').trim();

        try {
            const result = JSON.parse(cleanData);
            return json({
                application: VITE_APP_NAME,
                message: 'Generate AI response success.',
                data: {
                    topic,
                    language,
                    tone,
                    generated: result,
                },
            });
        } catch (e) {
            console.error('Error parsing JSON:', e);
            throw error(500, 'Invalid response format');
        }
    } catch (e) {
        console.error('Error generating content:', e);
        throw error(500, e.message);
    }
}
