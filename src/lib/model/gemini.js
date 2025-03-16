import {
    VITE_GEMINI_SECRET,
    VITE_GEMINI_MODEL
} from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';

const defaultPrompt = 'Generate a pitch-deck presentation in format of JSON only with "title" and "body" properties, no other words, no warning, explaining in order of "background, problem, and proposed solution". For each slide, if bullet points are used, the "body" property must be a single string with bullet points (•) separated by newlines. Slides without bullet points should have regular paragraph text in the "body".  Include compelling data, metrics, and market insights where relevant. Generate 10 slides including title and closing slide, ensuring a cohesive narrative flow from context through solution.';

export default {
    generate: async ({ topic, language, tone }) => {
        const genAI = new GoogleGenerativeAI(VITE_GEMINI_SECRET);
        const model = genAI.getGenerativeModel({ model: VITE_GEMINI_MODEL });

        const generate = await model.generateContent(`
            ${defaultPrompt}, about "${topic}", in formal and proper ${language} with ${tone} tone.`);

        const getResult = generate.response.text();
        const cleanData = getResult.replace(/```json\n|\n```/g, '').trim();

        try {
            const result = JSON.parse(cleanData);
            return result;
        } catch (e) {
            console.error(e);
            return;
        }
    },
    proofread: async ({ script, language, tone }) => {
        // try {
        //     const generate = await gemini({ topic, language });
        //     const data = {
        //         result: generate,
        //     }

        //     return {
        //         data
        //     };
        // } catch (e) {
        //     console.error(e);
        //     return;
        // }
    },
}
