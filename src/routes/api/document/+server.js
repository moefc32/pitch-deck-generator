import { VITE_APP_NAME } from '$env/static/private'
import { json, error } from '@sveltejs/kit';
import model from '$lib/model/generate';

export async function GET({ url }) {
    const id = url.searchParams.get('id');
    const type = url.searchParams.get('type');

    if (!id) {
        return json({
            application: VITE_APP_NAME,
            message: 'No file provided!',
        }, {
            status: 400,
        });
    }

    if (!type) {
        return json({
            application: VITE_APP_NAME,
            message: 'No file type selected!',
        }, {
            status: 400,
        });
    }

    const types = ['pptx', 'docx'];
    if (types.includes(type)) {
        return json({
            application: VITE_APP_NAME,
            message: 'Invalid file type selected!',
        }, {
            status: 400,
        });
    }

    try {
        const response = await model.getData(id);

        console.log({
            title:
                response.topic.length > 23
                    ? response.topic.slice(0, 23) + " -"
                    : response.topic,
            content: response.result,
        });

        return json({
            application: VITE_APP_NAME,
            message: `Document processing success.`,
            data: response,
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}
