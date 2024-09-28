<script>
  export let formData;
  export let navigateBack;
  export let handleSubmit;

  let enableNavigateScreen = false;

  $: {
    enableNavigateScreen = formData.language && formData.tone ? true : false;
  }
</script>

<div class="flex flex-1 flex-col justify-center items-center self-stretch">
  <div>Select language...</div>
</div>

<div class="flex flex-col self-stretch lg:flex-row gap-2 lg:gap-3">
  <button
    type="button"
    class="btn variant-filled-secondary"
    title="Proceed to the next step"
    disabled={!enableNavigateScreen}
    on:click={() => handleSubmit()}
  >
    Next Step
  </button>
  <button
    type="button"
    class="btn variant-filled lg:ms-auto"
    title="Back to previous step"
    on:click={() => navigateBack()}
  >
    Back
  </button>
</div>
