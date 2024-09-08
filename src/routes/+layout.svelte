<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { initializeStores, Modal, Toast } from "@skeletonlabs/skeleton";

  import { pageTitle } from "$lib/component/stores/pageTitle";
  import Header from "$lib/component/Header.svelte";
  import Sidebar from "$lib/component/Sidebar.svelte";

  initializeStores();

  const noHeaderFooterRoutes = ["/login", "/register"];
  const publicRoutes = ["/", "/about-us"];

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
  {#if isPublicRoute}
    <Header />
  {/if}
  <div class="flex flex-1 flex-row {isPublicRoute && 'mt-20'}">
    {#if !isPublicRoute}
      <Sidebar />
    {/if}
    <div class="flex flex-1 flex-col gap-3 p-5">
      <slot />
    </div>
  </div>
{/if}

<Modal />
<Toast position="br" />
