import { VITE_APP_NAME, VITE_JWT_SECRET, VITE_JWT_EXPIRATION } from '$env/static/private'
import { json, error } from '@sveltejs/kit';
import model from '$lib/model/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST({ request, cookies }) {
    try {
        const {
            email = '',
            password = '',
        } = await request.json() || {};

        if (email && password) {
            const result = await model.getLogin(email);

            if (result) {
                const passwordMatch = await bcrypt.compare(password, result.password);

                if (passwordMatch) {
                    delete result.password;
                    const expiration = parseInt(VITE_JWT_EXPIRATION) * 60 * 60;

                    const accessToken = jwt.sign({ id: result._id },
                        VITE_JWT_SECRET, { expiresIn: expiration });

                    cookies.set('access_token', accessToken, {
                        path: '/',
                        httpOnly: true,
                        maxAge: expiration,
                    });

                    return json({
                        application: VITE_APP_NAME,
                        message: 'Login success.',
                    });
                }
            }
        }
        error(400, 'Login failed, please try again!');
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}

export async function PATCH({ request }) {
    try {
        const {
            email = '',
            password = '',
        } = await request.json() || {};

        const data = {};
        if (email) data.email = email;
        if (password) data.password = await bcrypt.hash(password, 10);

        const result = await model.editUser(data);

        return json({
            application: VITE_APP_NAME,
            data: result,
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}

export async function DELETE({ cookies }) {
    try {
        cookies.delete('access_token', { path: '/', });

        return json({
            application: VITE_APP_NAME,
            message: 'Logout success.',
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}
