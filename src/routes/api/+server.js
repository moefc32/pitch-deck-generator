import { VITE_APP_NAME } from '$env/static/private'
import { json, error } from '@sveltejs/kit';

import model from '$lib/model/gemini';

export async function GET() {
    try {
        const gemini = await model('elearning for highschoolers');

        return json({
            application: VITE_APP_NAME,
            message: 'Application is healthy.',
            data: gemini,
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}
