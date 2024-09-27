<script>
  import "../app.css";
  import { page } from "$app/stores";
  import {
    initializeStores,
    Modal,
    Toast,
    storePopup,
  } from "@skeletonlabs/skeleton";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";

  import { pageTitle } from "$lib/component/stores/pageTitle";
  import Header from "$lib/component/Header.svelte";

  export let data;

  initializeStores();

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  const publicRoutes = ["/", "/about-us"];

  let isPublicRoute;

  $: {
    pageTitle.set($page.data.pageTitle || "");
    isPublicRoute = publicRoutes.includes($page.url.pathname);
  }
</script>

<svelte:head>
  <title>
    {$pageTitle && $pageTitle + " | "}
    {import.meta.env.VITE_APP_NAME}
  </title>
</svelte:head>

{#if $page.status >= 300}
  <div class="flex flex-1 flex-col gap-3 p-5">
    <slot />
  </div>
{:else}
  <Header {data} />
  <div class="flex flex-1 flex-row">
    <div
      class="flex flex-1 flex-col gap-3 mx-auto p-5 {$page.url.pathname ===
        '/prompt' && 'prompt-page'} {$page.url.pathname === '/about-us' &&
        'max-w-screen-md'}"
    >
      <slot />
    </div>
  </div>
{/if}

<Modal />
<Toast position="br" />

<style>
  .prompt-page {
    max-height: calc(100vh - 75px);
  }
</style>
