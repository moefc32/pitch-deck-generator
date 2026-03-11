import { redirect } from '@sveltejs/kit';
import token from '$lib/server/token';

export const handle = async ({ event, resolve }) => {
    const { cookies, url } = event;

    try {
        const lang = cookies.get('lang');
        const validLang = lang && ['en', 'id'].includes(lang);

        if (!validLang) {
            cookies.set('lang', 'en', {
                path: '/',
                httpOnly: true,
            });
        }

        event.locals.lang = validLang ? lang : 'en';

        return resolve(event);
    } catch (e) {
        if (e.status && e.status >= 300 && e.status < 400) {
            throw e;
        }

        console.error('\n--- CRITICAL HOOK ERROR ---\n');
        console.error(e);

        return await resolve(event);
    }
};
