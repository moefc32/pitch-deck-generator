import gemini from './gemini';

export default {
    proofData: async ({ script, toDo }) => {
        try {
            const generate = await gemini({ topic, language });
            const data = {
                result: generate,
            }

            return {
                data
            };
        } catch (e) {
            console.error(e);
            throw new Error('Error when proofreading script!');
        }
    },
}
