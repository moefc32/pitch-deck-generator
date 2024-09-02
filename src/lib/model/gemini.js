import {
    VITE_GEMINI_SECRET,
    VITE_GEMINI_MODEL
} from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import configs from './config';

export default async function gemini({ topic, language }) {
    const genAI = new GoogleGenerativeAI(VITE_GEMINI_SECRET);
    const model = genAI.getGenerativeModel({ model: VITE_GEMINI_MODEL });

    const config = await configs.getConfig();
    const defaultPrompt = config.default_prompt;
    const generate = await model.generateContent(`
        ${defaultPrompt}, about "${topic}", in formal and proper ${language}`);

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
