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
  import Sidebar from "$lib/component/Sidebar.svelte";

  export let data;

  initializeStores();

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  const noHeaderFooterRoutes = ["/login", "/register"];
  const publicRoutes = ["/", "/blog", "/about-us"];

  let isNoHeaderFooterRoute;
  let isPublicRoute;

  $: {
    pageTitle.set($page.data.pageTitle || "");
    isNoHeaderFooterRoute = noHeaderFooterRoutes.includes($page.url.pathname);
    isPublicRoute = publicRoutes.includes($page.url.pathname);
  }
</script>

<svelte:head>
  <title>
    {$pageTitle && $pageTitle + " | "}
    {import.meta.env.VITE_APP_NAME}
  </title>
</svelte:head>

{#if $page.status >= 300 || isNoHeaderFooterRoute}
  <div class="flex flex-1 flex-col gap-3 p-5">
    <slot />
  </div>
{:else}
  <Header {data} {isPublicRoute} />
  <div class="flex flex-1 flex-row">
    {#if !isPublicRoute}
      <Sidebar />
    {/if}
    <div
      class="flex flex-1 flex-col gap-3 p-5 {!isPublicRoute &&
        'dashboard-content'}"
    >
      <slot />
    </div>
  </div>
{/if}

<Modal />
<Toast position="br" />

<style>
  .dashboard-content {
    max-height: calc(100vh - 75px);
  }
</style>
