export default async function validateToken(cookies) {
    if (!cookies) return false;

    const currentToken = cookies.get('access_token');

    return currentToken;
}
