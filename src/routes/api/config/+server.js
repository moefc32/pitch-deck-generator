import { VITE_APP_NAME } from '$env/static/private'
import { json, error } from '@sveltejs/kit';
import model from '$lib/model/config';

export async function POST({ request }) {
    const {
        email = '',
        password = '',
    } = await request.json() || {};

    try {
        const result = await model.editConfig();

        return json({
            application: VITE_APP_NAME,
            message: 'Configuration updated successfully.',
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}
