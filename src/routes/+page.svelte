<script>
  import { goto } from "$app/navigation";

  export let data;

  const { content } = data;
</script>

<section
  class="flex justify-center items-center -m-6 p-6 bg-black text-white text-center h-screen rounded-lg"
>
  <div>
    <h2 class="section-title">
      <span class="h1 md:h2">{content?.hero?.title}</span>
      <span class="text-7xl leading-3 text-secondary-500">.</span>
    </h2>
    <p class="mt-3 mb-9 text-2xl">{content?.hero?.caption}</p>
    <button
      class="btn variant-filled-secondary"
      on:click={() => goto("/generate")}
    >
      Get Started Now
    </button>
  </div>
</section>
<div
  class="flex flex-col mx-4 md:mx-8 lg:mx-12 md:flex-row gap-4 md:gap-8 xl:gap-12 my-12"
>
  {#each content?.features as item, i}
    <div
      class="card flex flex-1 flex-col gap-3 md:gap-4 xl:gap-6 p-6 bg-slate-50 shadow-lg"
    >
      <h3 class="text-center text-2xl">{item?.title}</h3>
      <p>{item?.caption}</p>
    </div>
  {/each}
</div>

<style>
  section {
    height: calc(100vh - 60px);
    background: url(hero.jpg) center center no-repeat;
    background-size: cover;
  }

  section::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }

  section > * {
    position: relative;
    z-index: 2;
    color: white;
    text-align: center;
  }
</style>
