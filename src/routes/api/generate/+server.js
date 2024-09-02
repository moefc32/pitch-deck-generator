import { VITE_APP_NAME } from '$env/static/private'
import { json, error } from '@sveltejs/kit';
import model from '$lib/model/generate';

export async function GET({ url }) {
    const id = url.searchParams.get('id');

    try {
        const response = id ? await model.getData(id) : await model.getAllData();

        return json({
            application: VITE_APP_NAME,
            message: `Get ${id ? 'AI response' : 'all AI responses'} success.`,
            data: response,
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}

export async function POST({ request }) {
    const {
        topic = '',
        language = '',
    } = await request.json() || {};

    try {
        const response = await model.createData({ topic, language });

        return json({
            application: VITE_APP_NAME,
            message: 'Generate AI response success.',
            data: response,
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}
