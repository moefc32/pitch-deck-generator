<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Menu, BriefcaseBusiness } from "lucide-svelte";

  import { sidebarOpened } from "$lib/component/stores/sidebarOpened";
  import Sidebar from "$lib/component/Sidebar.svelte";
  import navigation from "./navigation";

  const activePage =
    "inline-block mt-[5px] bg-primary-600 rounded-lg w-5 h-[5px]";

  let pageUrl = "";

  $: {
    pageUrl = $page.url.pathname;
  }
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<header
  class="flex flex-row items-center gap-6 pe-4 py-3 bg-slate-50 shadow-xl z-[100]"
>
  <div class="flex flex-1 flex-row justify-center items-center gap-3 mx-4">
    <button
      class="md:hidden pe-3 border-e-[1px] border-gray-300"
      on:click={() => sidebarOpened.set(true)}
    >
      <Menu size={32} />
    </button>
    <h1
      role="button"
      class="flex items-center gap-2 me-auto font-bold"
      on:click={() => goto("/")}
    >
      <BriefcaseBusiness size={24} />
      {import.meta.env.VITE_APP_NAME}
    </h1>
    <div class="hidden md:flex flex-row justify-center gap-6">
      {#each navigation as item, i}
        <div class="flex flex-col justify-center items-center">
          <span
            role="button"
            class="inline-block {pageUrl === item.url && 'mt-[10px]'}"
            on:click={() => goto(item.url)}>{item.name}</span
          >
          <span class={pageUrl === item.url && activePage}></span>
        </div>
      {/each}
    </div>
  </div>
</header>
<Sidebar />

<style>
  header {
    height: 65px;
  }

  h1 {
    font-size: 1.25rem;
  }
</style>
