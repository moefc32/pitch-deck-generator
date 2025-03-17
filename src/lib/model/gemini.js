export default {
    generate: async ({ topic, language, tone }) => {
        try {
            const response = await fetch('/api/prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, language, tone }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data.generated;
        } catch (e) {
            console.error('Error generating content:', e);
            return null;
        }
    },
    enhance: async (slides) => {
        try {
            const response = await fetch('/api/enhance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(slides),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (e) {
            console.error('Error enhancing slides:', e);
            return null;
        }
    },
    proofread: async ({ script, language, tone }) => {
        // try {
        //     const generate = await gemini({ topic, language });
        //     const data = {
        //         result: generate,
        //     }

        //     return {
        //         data
        //     };
        // } catch (e) {
        //     console.error(e);
        //     return;
        // }
    },
}
