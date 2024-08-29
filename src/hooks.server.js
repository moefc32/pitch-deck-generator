import { redirect } from '@sveltejs/kit';
import validateToken from '$lib/validateToken';

export const handle = async ({ event, resolve }) => {
    const currentPath = event.url.pathname;
    const cookies = event.cookies;

    const conditionalRoutes = [
        'login',
    ];
    const isTokenValid = await validateToken(cookies);

    if (currentPath.startsWith('middleware')) {
        return resolve(event);
    }

    if (!conditionalRoutes.includes(currentPath) && !isTokenValid) {
        throw redirect(303, 'login');
    }

    if (conditionalRoutes.includes(currentPath) && isTokenValid) {
        throw redirect(303, '/');
    }

    const response = await resolve(event);
    return response;
}
