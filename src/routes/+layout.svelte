<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { initializeStores, Modal, Toast } from "@skeletonlabs/skeleton";

  import { pageTitle } from "$lib/component/stores/pageTitle";

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
  <slot />
{:else}
  <slot />
{/if}

<Modal />
<Toast position="br" />
