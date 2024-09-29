<script>
  import axios from "axios";

  import Checklist from "./Checklist.svelte";
  import TopicScreen from "./screen/Topic.svelte";
  import LanguageScreen from "./screen/Language.svelte";
  import ResultScreen from "./screen/Result.svelte";

  let step = 1;
  let formData = {
    topic: "",
    language: "",
    tone: "",
  };
  let response;

  async function navigateScreen() {
    if (step < 2) return step++;
    if (step === 4) return (step = 1);
  }

  async function navigateBack() {
    if (step === 2) return (step = 1);

    formData = {
      ...{
        topic: "",
        language: "",
        tone: "",
      },
    };
    return (step = 1);
  }

  async function handleSubmit() {
    step = 3;

    const startTime = Date.now();
    const result = await axios.post("api/prompt", formData);

    const elapsedTime = Date.now() - startTime;
    const remainingTime = 2000 - elapsedTime;

    if (remainingTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    }

    response = result.data.data;
    step = 4;
  }
</script>

<div class="flex flex-1 flex-col lg:flex-row lg:gap-3">
  <Checklist {step} />
  <div class="flex flex-1 flex-col gap-3 p-6">
    <div class="hidden lg:flex flex-col">
      <p class="text-secondary-500 font-bold">Step {step} of 3</p>
      <h2 class="section-title mt-2 mb-6">
        <span class="h2 md:h3">
          {step === 1
            ? "Enter Your Preferred Topic"
            : step === 2
              ? "Choose Language Preference"
              : "Summary of Generated Content"}
        </span>
      </h2>
    </div>
    <section class="flex flex-1 flex-col justify-center items-center leading-7">
      {#if step === 1}
        <TopicScreen {formData} {navigateScreen} />
      {:else if step === 2}
        <LanguageScreen {formData} {navigateBack} {handleSubmit} />
      {:else}
        <ResultScreen {step} {response} {navigateBack} />
      {/if}
    </section>
  </div>
</div>
