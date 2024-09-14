import jwt from 'jsonwebtoken';

export async function load({ cookies }) {
    const access_token = cookies.get('access_token');

    try {
        const decodedToken = jwt.decode(access_token);

        const user_id = decodedToken.id;
        const user_name = cookies.get('user_name');
        const user_email = cookies.get('user_email');

        return {
            user_id,
            user_name,
            user_email,
        };
    } catch (e) {
        return {
            user_id: '',
            user_name: '',
            user_email: '',
        };
    }
}
