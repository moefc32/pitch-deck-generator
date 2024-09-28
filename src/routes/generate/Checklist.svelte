<script>
  import {
    Check,
    Lightbulb,
    Languages,
    LoaderCircle,
    FileJson,
    ClipboardCheck,
  } from "lucide-svelte";

  export let step;
</script>

<div
  class="lg:card p-6 lg:w-[360px] lg:bg-gradient-to-b from-secondary-100 to-primary-50"
>
  <div class="flex lg:flex-col gap-6">
    <div class="flex flex-1 flex-col lg:flex-row gap-3">
      <div
        class="flex justify-center items-center rounded-full w-[45px] h-[45px] border-2 {step >
        1
          ? 'bg-primary-600 text-white'
          : 'bg-white'}"
      >
        {#if step === 1}
          <Lightbulb size={24} />
        {:else}
          <Check size={24} />
        {/if}
      </div>
      <div class="flex-1">
        <h3 class="h5 font-bold {step !== 1 && 'text-gray-600'}">Input Idea</h3>
        <p
          class="hidden lg:block text-small {step !== 1
            ? 'text-gray-500'
            : 'text-gray-700'}"
        >
          Enter the main idea to generate key points for your pitch deck
        </p>
      </div>
    </div>
    <div class="flex flex-1 flex-col lg:flex-row gap-3">
      <div
        class="flex justify-center items-center rounded-full w-[45px] h-[45px] border-2 {step >
        2
          ? 'bg-primary-600 text-white'
          : 'bg-white'}"
      >
        {#if step <= 2}
          <Languages size={24} />
        {:else}
          <Check size={24} />
        {/if}
      </div>
      <div class="flex-1">
        <h3 class="h5 font-bold {step !== 2 && 'text-gray-600'}">
          Select Language
        </h3>
        <p
          class="hidden lg:block text-small {step !== 2
            ? 'text-gray-500'
            : 'text-gray-700'}"
        >
          Choose the preferred language for your pitch deck content
        </p>
      </div>
    </div>
    <div class="flex flex-1 flex-col lg:flex-row gap-3">
      <div
        class="flex justify-center items-center rounded-full w-[45px] h-[45px] border-2 {step >
        3
          ? 'bg-primary-600 text-white'
          : 'bg-white'}"
      >
        {#if step < 3}
          <FileJson size={24} />
        {:else if step === 3}
          <LoaderCircle size={28} style="animation: spin 1s linear infinite" />
        {:else}
          <Check size={24} />
        {/if}
      </div>
      <div class="flex-1">
        <h3 class="h5 font-bold {step !== 3 && 'text-gray-600'}">
          Generating Data
        </h3>
        <p
          class="hidden lg:block text-small {step !== 3
            ? 'text-gray-500'
            : 'text-gray-700'}"
        >
          Generating the pitch deck contents using generative AI
        </p>
      </div>
    </div>
    <div class="flex flex-1 flex-col lg:flex-row gap-3">
      <div
        class="flex justify-center items-center rounded-full w-[45px] h-[45px] border-2 {step ===
        4
          ? 'bg-primary-600 text-white'
          : 'bg-white'}"
      >
        <ClipboardCheck size={24} />
      </div>
      <div class="flex-1">
        <h3 class="h5 font-bold {step !== 4 && 'text-gray-600'}">
          Result Summary
        </h3>
        <p
          class="hidden lg:block text-small {step !== 4
            ? 'text-gray-500'
            : 'text-gray-700'}"
        >
          Review the generated key points for your pitch deck
        </p>
      </div>
    </div>
  </div>
</div>
