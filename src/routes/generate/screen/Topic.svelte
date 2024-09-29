<script>
  import { X } from "lucide-svelte";

  export let formData;
  export let navigateScreen;

  const limit = 100;

  let enableNavigateScreen = false;

  async function handleKeydown(event) {
    if (event.key === "Enter") return navigateScreen();
  }

  async function handleInput() {
    if (formData.topic.length > limit) {
      formData.topic = formData.topic.slice(0, limit);
    }
  }

  $: {
    enableNavigateScreen = formData.topic.length ? true : false;
  }
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex flex-1 flex-col justify-center items-center self-stretch">
  <label class="label mb-16 md:mb-20 lg:mb-24 w-full max-w-[600px]">
    <div class="h1 leading-none font-extrabold mb-3 hidden lg:block">
      What do you<br />want to create?
    </div>
    <div class="h3 font-extrabold mb-3 lg:hidden">
      What do you want to create?
    </div>
    <div class="text-gray-500">
      Enter the keywords for the topic you want to present
    </div>
    <div class="flex items-center pt-2">
      <input
        type="text"
        class="input ps-5 pe-12 py-3 rounded-lg"
        bind:value={formData.topic}
        on:keydown={handleKeydown}
        on:input={handleInput}
      />
      {#if formData.topic.length}
        <div
          role="button"
          class="-ms-9 z-[10]"
          title="Clear all text"
          on:click={() => (formData.topic = "")}
        >
          <X size={24} />
        </div>
      {/if}
    </div>
    <div class="text-right text-small">
      <span class={formData.topic.length >= 80 && "text-red-500"}>
        {formData.topic.length}
      </span>/{limit}
    </div>
  </label>
</div>

<div class="flex flex-col self-stretch lg:flex-row gap-2 lg:gap-3 mt-6">
  <button
    type="button"
    class="btn variant-filled-secondary"
    title="Proceed to the next step"
    disabled={!enableNavigateScreen}
    on:click={() => navigateScreen()}
  >
    Next Step
  </button>
</div>
