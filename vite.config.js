import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    plugins: [
        sveltekit(),
        tailwindcss(),
    ],
    ssr: {
        noExternal: ['lucide-svelte'],
    },
    server: {
        host: process.env.VITE_IPBIND || 'localhost',
        port: parseInt(process.env.VITE_PORT, 10),
    },
});
