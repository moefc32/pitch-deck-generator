<div align="center">
<img src="./static/favicon.svg" width="80"/>

# Pitch Deck Generator

**A pitch deck documents generator powered by Gemini AI**

<a href="https://opensource.org/license/mit"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" height="24" /></a>
<a href="https://pnpm.io/"><img src="https://img.shields.io/badge/Package-PNPM-orange?style=flat-square" height="24" /></a>
<img src="https://img.shields.io/badge/Module-ECMAScript-yellow?style=flat-square" height="24" />
</div>

![Preview](https://github.com/user-attachments/assets/d5de906c-48e6-4cc2-b0bb-fc63b0304a3b)

## Features
- Create pitch deck materials in PowerPoint, Word, and PDF
- Responsive design for use on both desktop and mobile devices
- Step by step guided pitch deck creation

## Stack Used
- Monolithic [SvelteKit](https://svelte.dev/)
- [Tailwind](https://tailwindcss.com/) with [daisyUI](https://daisyui.com/)
- [Google Gemini](https://gemini.google.com/)

## Local Preview
1. Clone this repository to your local computer
2. Copy the default environment file and ensure all variables are correctly filled
   ```sh
   cp .env.example .env
   ```
3. Install all required dependencies
   ```sh
   pnpm i
   ```
4. Run the application in development mode
   ```sh
   pnpm run dev
   ```

## Deployment
1. Clone this repository to the development server
2. Copy the default environment file and ensure all variables are correctly filled
   ```sh
   cp .env.example .env
   ```
3. Install all required dependencies
   ```sh
   pnpm i
   ```
4. Optimize the application for production
   ```sh
   pnpm run build
   ```
5. Serve the application using PM2
   ```sh
   pm2 start ecosystem.config.cjs
   ```
