export async function load({ fetch }) {
    const pageTitle = 'Main Settings';

    try {
        const response = await fetch('api/config');
        const { data } = await response.json();

        return {
            pageTitle,
            content: data,
        };
    } catch (e) {
        console.error(e);

        return {
            pageTitle,
        };
    }
}
