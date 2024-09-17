<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { LayoutDashboard, MessageCircle, List, Bolt } from "lucide-svelte";

  const inactive =
    "flex justify-center items-center w-[48px] h-[38px] rounded-lg";
  const active = `${inactive} bg-primary-800`;
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<aside
  class="flex flex-col items-center gap-2 px-3 py-6 bg-primary-500 text-white shadow-xl"
>
  <span
    role="button"
    class={$page.data.pageTitle === "Dashboard" ? active : inactive}
    title="Dashboard"
    on:click={() => goto("/dashboard")}
  >
    <LayoutDashboard />
  </span>
  <span
    role="button"
    class={$page.data.pageTitle === "Prompt" ? active : inactive}
    title="Prompt"
    on:click={() => goto("/prompt")}
  >
    <MessageCircle />
  </span>
  <span
    role="button"
    class={$page.data.pageTitle === "Generated Pitch Deck" ? active : inactive}
    title="Generated Pitch Deck"
    on:click={() => goto("/generated")}
  >
    <List />
  </span>
  <span
    role="button"
    class="mt-auto {$page.data.pageTitle === 'Settings' ? active : inactive}"
    title="Settings"
    on:click={() => goto("/settings")}
  >
    <Bolt />
  </span>
</aside>

<style>
  aside {
    width: 65px;
  }
</style>
