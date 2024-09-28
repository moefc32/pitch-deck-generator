<script>
  import { Avatar } from "@skeletonlabs/skeleton";

  export let data;

  const { pageTitle } = data;
</script>

<h2 class="section-title mt-3 md:mt-6 mb-6 md:mb-9">
  <span class="h1 md:h2">{pageTitle}</span>
  <span class="text-7xl leading-3 text-secondary-500">.</span>
</h2>
<section
  class="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-9"
>
  <Avatar src="mfc.jpg" width="w-36" rounded="mx-auto rounded-full" />
  <div class="flex flex-1 flex-col gap-3">
    <p class="leading-7">
      Hello! I'm <strong>Faizal Chan.</strong>, the creator of this project
      designed to generate high-quality pitch deck materials using Gemini AI.
      This platform simplifies the creation of professional presentations,
      helping users efficiently produce impactful content for their business
      pitches.
    </p>
    <p class="leading-7">
      This project is my submission for <strong>IITC 2024</strong>, where I'm
      demonstrating the power of AI to transform traditional workflows, making
      them faster and more effective. With the capabilities of Gemini AI,
      individuals and businesses can craft persuasive presentations with ease.
    </p>
    <p class="leading-7">
      Contact me : <a
        href="mailto:hai@mf-chan.com"
        target="_blank"
        class="anchor"
      >
        hai@mf-chan.com
      </a>
    </p>
    <hr class="my-3 w-[50px]" />
    <div class="flex flex-col-reverse sm:flex-row gap-6 mb-6">
      <div class="flex flex-1 flex-col gap-3">
        <p>Organized by :</p>
        <a href="https://iitc.intermediaamikom.org" target="_blank">
          <img src="iitc.png" alt="IITC 2024" class="w-[140px]" />
        </a>
      </div>
      <div class="flex flex-1 flex-col gap-3">
        <p>Development stacks :</p>
        <ul class="list-disc ps-6 leading-7">
          <li>
            <a href="https://kit.svelte.dev" target="_blank" class="anchor">
              SvelteKit
            </a>
          </li>
          <li>
            <a href="https://tailwindcss.com" target="_blank" class="anchor">
              Tailwind CSS
            </a>
          </li>
          <li>
            <a href="https://www.skeleton.dev" target="_blank" class="anchor">
              Skeleton UI
            </a>
          </li>
          <li>
            <a href="https://gemini.google.com" target="_blank" class="anchor">
              Gemini AI
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
