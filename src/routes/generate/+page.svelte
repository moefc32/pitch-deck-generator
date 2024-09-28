<script>
  import TopicScreen from "./screen/Topic.svelte";
  import LanguageScreen from "./screen/Language.svelte";
  import ResultScreen from "./screen/Result.svelte";

  let step = 1;
  let loading = false;

  async function navigateScreen() {
    if (step < 2) {
      return step++;
    }

    loading = true;
    // generate content
    step++;
  }

  async function exportDocument(file) {}
</script>

<div class="flex flex-1 flex-col lg:flex-row lg:gap-3">
  <div
    class="lg:card p-6 lg:w-[360px] lg:bg-gradient-to-b from-secondary-100 to-primary-50"
  >
    <div class="flex lg:flex-col gap-6">
      <div class="flex flex-1 flex-col lg:flex-row gap-3">
        <div class="rounded-full bg-white w-[50px] h-[50px] border-2"></div>
        <div class="flex-1">
          <h3 class="h5 font-bold">Input Topic</h3>
          <p class="hidden lg:block mt-2 text-gray-700 leading-7">
            Enter the main topic to generate key points for your pitch deck
          </p>
        </div>
      </div>
      <div class="flex flex-1 flex-col lg:flex-row gap-3">
        <div class="rounded-full bg-white w-[50px] h-[50px] border-2"></div>
        <div class="flex-1">
          <h3 class="h5 font-bold">Select Language</h3>
          <p class="hidden lg:block mt-2 text-gray-700 leading-7">
            Choose the preferred language for your pitch deck content
          </p>
        </div>
      </div>
      <div class="flex flex-1 flex-col lg:flex-row gap-3">
        <div class="rounded-full bg-white w-[50px] h-[50px] border-2"></div>
        <div class="flex-1">
          <h3 class="h5 font-bold">Result Summary</h3>
          <p class="hidden lg:block mt-2 text-gray-700 leading-7">
            Review the generated key points for your pitch deck
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-1 flex-col gap-3 p-6">
    <div class="flex flex-col">
      <p class="text-secondary-500 font-bold">Step {step} of 3</p>
      <h2 class="section-title mt-2 mb-6">
        <span class="h1 md:h2">
          {step === 1
            ? "Enter Your Preferred Topic"
            : step === 2
              ? "Choose Language Preference"
              : "Summary of Generated Content"}
        </span>
      </h2>
    </div>
    <section class="flex-1 leading-7">
      {#if step === 1}
        <TopicScreen />
      {:else if step === 2}
        <LanguageScreen />
      {:else}
        <ResultScreen />
      {/if}
    </section>
    <div class="flex flex-col lg:flex-row gap-2 lg:gap-3">
      {#if step < 3}
        <button
          type="button"
          class="btn variant-filled-secondary"
          title="Proceed to the next step"
          on:click={() => navigateScreen()}
        >
          Next Step
        </button>
      {:else}
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
          on:click={() => (step = 1)}
        >
          Generate Another
        </button>
      {/if}
    </div>
  </div>
</div>
