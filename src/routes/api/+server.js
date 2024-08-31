import { VITE_APP_NAME } from '$env/static/private'
import { json, error } from '@sveltejs/kit';

export async function GET() {
    try {
        return json({
            application: VITE_APP_NAME,
            message: 'Application is healthy.',
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}
