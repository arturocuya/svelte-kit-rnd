/** @type {import('./$types').PageLoad} */
export async function load({ fetch }: any) {
    const endpoint = '/api/hitme';
    const res = await fetch(endpoint);
    const text = await res.text();
    return {
        message: text
    }
}