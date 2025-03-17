<script>
    import axios from 'axios';

    import Checklist from '$lib/component/Checklist.svelte';
    import TopicScreen from '$lib/component/screen/Topic.svelte';
    import LanguageScreen from '$lib/component/screen/Language.svelte';
    import ResultScreen from '$lib/component/screen/Result.svelte';
    import PdfScreen from '$lib/component/screen/Pdf.svelte';

    let step = 1;
    let formData = {
        topic: '',
        language: '',
        tone: '',
    };
    let response;

    async function navigateScreen() {
        if (step === 1) return step++;
        if (step === 2) return handleSubmit();
        if (step === 4) return step++;
        if (step === 5) return (step = 1);
    }

    async function navigateBack() {
        if (step === 2) return (step = 1);
        if (step === 5) return (step = 4);

        formData = {
            ...{
                topic: '',
                language: '',
                tone: '',
            },
        };
        return (step = 1);
    }

    async function handleSubmit() {
        step = 3;

        const startTime = Date.now();
        const result = await axios.post('api/prompt', formData);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = 2000 - elapsedTime;

        if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        response = result.data.data;
        step = 4;
    }
</script>

<div class="flex flex-1 flex-col lg:flex-row lg:gap-3">
    <Checklist {step} />
    <div class="flex flex-1 flex-col gap-3 p-6">
        <div class="hidden lg:flex flex-col">
            <p class="text-secondary-500 font-bold">Step {step} of 5</p>
            <h2 class="section-title mt-2 mb-6">
                <span class="h2 md:h3">
                    {step === 1
                        ? 'Enter your Business Information'
                        : step === 2
                          ? 'Choose Language Preference'
                          : step === 3
                            ? 'Generating Data'
                            : step === 4
                              ? 'Summary of Generated Content'
                              : 'Generate PDF Pitch Deck'}
                </span>
            </h2>
        </div>
        <section
            class="flex flex-1 flex-col justify-center items-center leading-7"
        >
            {#if step === 1}
                <TopicScreen {formData} {navigateScreen} />
            {:else if step === 2}
                <LanguageScreen {formData} {navigateBack} {handleSubmit} />
            {:else if step === 3}
                <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            {:else if step === 4}
                <ResultScreen {step} {response} {navigateScreen} />
            {:else if step === 5}
                <PdfScreen {response} {navigateBack} />
            {/if}
        </section>
    </div>
</div>
