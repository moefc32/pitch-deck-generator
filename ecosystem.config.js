module.exports = {
    apps: [
        {
            name: 'Pitch Deck',
            script: 'build/index.js',
            env: {
                PORT: process.env.VITE_PORT,
            },
        },
    ],
};
