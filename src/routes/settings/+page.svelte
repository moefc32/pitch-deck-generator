<script>
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { Check } from "lucide-svelte";

  const toastStore = getToastStore();

  export let data;

  const { content } = data;

  async function submit() {
    toastStore.trigger({
      background: "variant-filled-primary",
      message: "Settings saved successfully.",
    });
  }
</script>

<div class="card flex flex-1 flex-col gap-3 p-3 bg-gray-200">
  <label class="label mb-3 max-w-screen-sm">
    <span>Gemini AI Secret Key</span>
    <input
      type="text"
      class="input"
      title="Read only"
      readonly
      value={import.meta.env.VITE_GEMINI_SECRET}
    />
  </label>
  <label class="label mb-3 max-w-screen-sm">
    <span>Base AI Prompt</span>
    <textarea class="textarea resize-none" rows="8" bind:value={content.base_prompt} />
  </label>
  <button
    type="button"
    class="btn variant-filled-primary self-start"
    on:click={() => submit()}
  >
    <Check size={16} class={"me-1"} /> Save Changes
  </button>
</div>
