import { redirect } from '@sveltejs/kit';
import validateToken from '$lib/validateToken';

export const handle = async ({ event, resolve }) => {
    const currentPath = event.url.pathname;
    const cookies = event.cookies;

    const unprotectedRoutes = [
        '/',
        '/blog',
        '/about-us',
    ];
    const conditionalRoutes = [
        '/login',
        '/register',
    ];
    const isTokenValid = await validateToken(cookies);

    if (!isTokenValid) {
        cookies.delete('access_token', { path: '/' });
    }

    if (currentPath.startsWith('/api') || unprotectedRoutes.includes(currentPath)) {
        return await resolve(event);
    }

    if (!conditionalRoutes.includes(currentPath) && !isTokenValid) {
        throw redirect(303, '/login');
    }

    if (conditionalRoutes.includes(currentPath) && isTokenValid) {
        throw redirect(303, '/dashboard');
    }

    const response = await resolve(event);
    return response;
}
