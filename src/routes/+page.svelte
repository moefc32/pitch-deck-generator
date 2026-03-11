<script>
    import ky from 'ky';

    import Checklist from '$lib/component/Checklist.svelte';
    import TopicScreen from '$lib/component/screen/Topic.svelte';
    import LanguageScreen from '$lib/component/screen/Language.svelte';
    import ResultScreen from '$lib/component/screen/Result.svelte';
    import DownloadScreen from '$lib/component/screen/Download.svelte';

    const stepLabel = [
        'Enter Your Preferred Topic',
        'Choose Language Preference',
        'Generating Pitch Deck Content',
        'Summary of Generated Content',
        'Your Generated Pitch Deck Files',
    ];

    let step = 1;
    let idea = {
        topic: '',
        language: '',
        tone: '',
    };
    let response;

    async function navigateScreen() {
        if (step === 1) return step++;
        if (step === 2) return handleSubmit();
        if (step === 4) return step++;

        idea = {
            ...{
                topic: '',
                language: '',
                tone: '',
            },
        };

        return (step = 1);
    }

    async function navigateBack() {
        if (step === 2) return (step = 1);
        if (step === 4) return (step = 2);
        if (step === 5) return (step = 4);
    }

    async function handleSubmit() {
        step = 3;

        try {
            const startTime = Date.now();
            const result = await ky
                .post('/api/prompt', {
                    json: idea,
                    timeout: 60 * 1000,
                })
                .json();

            const elapsedTime = Date.now() - startTime;
            const remainingTime = 2000 - elapsedTime;

            if (remainingTime > 0) {
                await new Promise(resolve =>
                    setTimeout(resolve, remainingTime),
                );
            }

            response = result.data;
            step = 4;
        } catch (e) {
            console.error(e);
            step = 2;
        }
    }
</script>

<div class="flex flex-1 flex-col lg:flex-row lg:gap-3">
    <Checklist {step} />
    <div class="flex flex-1 flex-col gap-3 p-6">
        <div class="hidden lg:flex flex-col">
            <p class="text-primary font-bold">
                Step {step} of {stepLabel.length}
            </p>
            <h2 class="section-title mt-2 mb-4 text-xl md:text-2xl">
                {stepLabel[step - 1]}
            </h2>
        </div>
        <section
            class="flex flex-1 flex-col justify-center items-center leading-7"
        >
            {#if step === 1}
                <TopicScreen {idea} {navigateScreen} />
            {:else if step === 2}
                <LanguageScreen {idea} {navigateBack} {handleSubmit} />
            {:else if step === 3}
                <div
                    class="flex flex-1 flex-col justify-center items-center self-stretch gap-3 mb-16 text-primary-600"
                >
                    <span
                        class="loading loading-spinner text-primary w-[100px]"
                    >
                    </span>
                    <div class="text-gray-700">
                        Generating content, please wait...
                    </div>
                </div>
            {:else if step === 4}
                <ResultScreen {response} {navigateBack} {navigateScreen} />
            {:else if step === 5}
                <DownloadScreen {response} {navigateBack} {navigateScreen} />
            {/if}
        </section>
    </div>
</div>
