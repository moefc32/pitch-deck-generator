require('dotenv').config();
const packageJson = require('./package.json');

module.exports = {
    apps: [
        {
            name: packageJson.name,
            script: 'build/index.js',
            env: {
                HOST: process.env.IPBIND || '127.0.0.1',
                PORT: parseInt(process.env.PORT, 10) || 4000,
            },
        },
    ]
};
