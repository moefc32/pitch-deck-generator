import { VITE_APP_NAME } from '$env/static/private'
import { json, error } from '@sveltejs/kit';
import model from '$lib/model/gemini';

export async function POST({ request }) {
    const {
        topic = '',
        language = '',
        tone = '',
    } = await request.json() || {};

    try {
        const response = await model.generate({ topic, language, tone });

        return json({
            application: VITE_APP_NAME,
            message: 'Generate AI response success.',
            data: {
                topic,
                language,
                tone,
                generated: response,
            },
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}
