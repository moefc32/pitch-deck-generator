export async function load() {
    const pageTitle = 'About Us';

    return {
        pageTitle,
        content: {
            avatar: 'mfc.jpg',
            paragraphs: [
                `Hello! I'm <strong>Faizal Chan.</strong>, the creator of this project
                    designed to generate high-quality pitch deck materials using Gemini AI.
                    This platform simplifies the creation of professional presentations,
                    helping users efficiently produce impactful content for their business
                    pitches.`,
                `This project is my submission for <strong>IITC 2024</strong>, where I'm
                    demonstrating the power of AI to transform traditional workflows, making
                    them faster and more effective. With the capabilities of Gemini AI,
                    individuals and businesses can craft persuasive presentations with ease.`,
                `Contact me : <a
                    href="mailto:hai@mf-chan.com"
                    target="_blank"
                    class="anchor"
                >
                    hai@mf-chan.com
                </a>`
            ],
            organizer: {
                name: 'IITC 2024',
                image: 'iitc.png',
                url: 'https://iitc.intermediaamikom.org',
            },
            stacks: [
                {
                    name: 'SvelteKit',
                    url: 'https://kit.svelte.dev',
                },
                {
                    name: 'Tailwind CSS',
                    url: 'https://tailwindcss.com',
                },
                {
                    name: 'Skeleton UI',
                    url: 'https://www.skeleton.dev',
                },
                {
                    name: 'Gemini AI',
                    url: 'https://gemini.google.com',
                },
            ],
        },
    };
}
