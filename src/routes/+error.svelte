<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>
    {$page.error.message} | {import.meta.env.VITE_APP_NAME}
  </title>
</svelte:head>

<div>
  <span>{$page.status}</span>
  <span class="divider" />
  <span class="text-uppercase">{$page.error.message}</span>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 50px;
  }

  .divider {
    display: inline-block;
    width: 1px;
    height: 27px;
    margin: 0 16px;
    background: #cbd5e0;
  }

  .text-uppercase {
    text-transform: uppercase;
  }
</style>
