<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { initializeStores, Modal, Toast } from "@skeletonlabs/skeleton";

  import { pageTitle } from "$lib/component/stores/pageTitle";
  import Header from "$lib/component/Header.svelte";
  import Sidebar from "$lib/component/Sidebar.svelte";

  initializeStores();

  const noHeaderFooterRoutes = ["/login", "/register"];

  let isNoHeaderFooterRoute;

  $: {
    pageTitle.set($page.data.pageTitle || "");
    isNoHeaderFooterRoute = noHeaderFooterRoutes.includes($page.url.pathname);
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
  {#if $page.url.pathname === "/"}
    <Header />
  {/if}
  <div class="flex flex-1 flex-row">
    {#if $page.url.pathname !== "/"}
      <Sidebar />
    {/if}
    <div class="flex flex-1 flex-col gap-3 p-5">
      <slot />
    </div>
  </div>
{/if}

<Modal />
<Toast position="br" />
