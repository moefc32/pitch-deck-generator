<script>
  import { goto } from "$app/navigation";
  import { BriefcaseBusiness, X } from "lucide-svelte";

  import { sidebarOpened } from "$lib/component/stores/sidebarOpened";
  import navigation from "./navigation";

  async function toggleSidebar() {
    const status = $sidebarOpened;
    sidebarOpened.set(!status);
  }

  async function navigate(url) {
    toggleSidebar();
    goto(url);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<aside
  class="flex flex-col md:hidden p-2 text-center bg-gray-900 fixed top-0 bottom-0 lg:left-0 w-[300px] overflow-y-auto shadow-2xl z-[1000] {$sidebarOpened ||
    'hidden'}"
>
  <div class="text-gray-100 text-xl">
    <div class="flex items-center gap-2 mt-1 p-3 text-base font-bold">
      <BriefcaseBusiness size={18} />
      {import.meta.env.VITE_APP_NAME}
      <button class="ms-auto" on:click={() => toggleSidebar()}>
        <X size={18} />
      </button>
    </div>
  </div>
  <div class="my-3 bg-gray-600 h-[1px]"></div>
  {#each navigation as item, i}
    <div
      role="button"
      class="mt-1 px-6 py-3 hover:bg-primary-500 text-white text-start hover:text-black rounded-md duration-300"
      on:click={() => navigate(item.url)}
    >
      {item.name}
    </div>
  {/each}
</aside>
