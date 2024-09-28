<script>
  import { LoaderCircle } from "lucide-svelte";

  export let step;
  export let response;
  export let navigateBack;

  async function exportDocument(file) {}
</script>

{#if step === 3}
  <div
    class="flex flex-1 flex-col justify-center items-center self-stretch gap-3 mb-16 text-primary-600"
  >
    <LoaderCircle size={100} style="animation: spin 1s linear infinite" />
    <div class="text-gray-700">Loading, please wait...</div>
  </div>
{:else}
  <div class="flex flex-1 flex-col self-stretch">
    <div class="response card p-3 overflow-y-auto">
      {JSON.stringify(response)}
    </div>
  </div>

  <div class="flex flex-col self-stretch lg:flex-row gap-2 lg:gap-3">
    <button
      type="button"
      class="btn bg-[#d0522a] text-white"
      title="Export generated content as PowerPoint file"
      on:click={() => exportDocument("pptx")}
    >
      Export .pptx
    </button>
    <button
      type="button"
      class="btn bg-[#2b579a] text-white"
      title="Export generated content as Word file"
      on:click={() => exportDocument("docx")}
    >
      Export .docx
    </button>
    <button
      type="button"
      class="btn variant-filled lg:ms-auto"
      title="Generate another pitch deck documents"
      on:click={() => navigateBack()}
    >
      Generate Another
    </button>
  </div>
{/if}

<style>
  .response {
    max-height: calc(100vh - 320px);
  }
</style>
