<script>
  import "../app.css";
  import { initializeStores, Modal, Toast } from "@skeletonlabs/skeleton";

  initializeStores();
</script>

<svelte:head>
  <title>{import.meta.env.VITE_APP_NAME}</title>
</svelte:head>

<slot />
<Modal />
<Toast />
