import {
    VITE_GEMINI_SECRET,
    VITE_GEMINI_MODEL
} from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function gemini(topic) {
    const genAI = new GoogleGenerativeAI(VITE_GEMINI_SECRET);
    const model = genAI.getGenerativeModel({ model: VITE_GEMINI_MODEL });

    const generate = await model.generateContent(`
        generate a pitch-deck presentation in format of JSON only with
        "title" and "body" properties, no other words, no warning, explaining
        in order of "background, problem, and proposed solution", "body"
        property can be up to 3 sentences, no "body" property value for title
        and closing slide, containing 10 slides including title and closing
        slide, about "${topic}"`);

    const getResult = generate.response.text();
    const cleanData = getResult.replace(/```json\n|\n```/g, '').trim();

    try {
        const result = JSON.parse(cleanData);
        return result;
    } catch (e) {
        console.error(e);
        return;
    }
}
