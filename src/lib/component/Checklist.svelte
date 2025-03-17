<script>
    import {
        Check,
        Lightbulb,
        Languages,
        LoaderCircle,
        FileJson,
        ClipboardCheck,
        FileDown,
    } from 'lucide-svelte';

    export let step;
</script>

<div
    class="lg:card p-6 lg:w-[360px] h-[100px] lg:h-auto lg:bg-linear-to-b from-secondary-100 to-primary-50"
>
    <div class="flex lg:flex-col gap-6 text-black">
        <div class="checkpoint flex flex-1 flex-col lg:flex-row gap-3 relative">
            <div
                class="flex justify-center items-center mx-auto rounded-full w-[70px] md:w-[45px] h-[70px] md:h-[45px] shadow {step >
                1
                    ? 'bg-primary-600 text-white'
                    : step === 1
                      ? 'bg-white'
                      : 'bg-gray-100 text-gray-400'}"
            >
                {#if step === 1}
                    <Lightbulb size={24} />
                {:else}
                    <Check size={24} />
                {/if}
            </div>
            <div class="flex-1">
                <h3
                    class="h5 font-bold text-center lg:text-start {step !== 1 &&
                        'text-gray-500'}"
                >
                    <span class="hidden md:block text-xs lg:text-lg">
                        Input Idea
                    </span>
                </h3>
                <p
                    class="hidden lg:block text-sm {step !== 1
                        ? 'text-gray-500'
                        : 'text-gray-700'}"
                >
                    Enter the main idea to generate key points for your pitch
                    deck
                </p>
            </div>
        </div>
        <div class="checkpoint flex flex-1 flex-col lg:flex-row gap-3 relative">
            <div
                class="flex justify-center items-center mx-auto rounded-full w-[70px] md:w-[45px] h-[70px] md:h-[45px] shadow {step >
                2
                    ? 'bg-primary-600 text-white'
                    : step === 2
                      ? 'bg-white'
                      : 'bg-gray-100 text-gray-400'}"
            >
                {#if step <= 2}
                    <Languages size={24} />
                {:else}
                    <Check size={24} />
                {/if}
            </div>
            <div class="flex-1">
                <h3
                    class="h5 font-bold text-center lg:text-start {step !== 2 &&
                        'text-gray-500'}"
                >
                    <span class="hidden lg:block text-xs lg:text-lg">
                        Select Language
                    </span>
                    <span class="hidden md:block lg:hidden text-xs lg:text-lg">
                        Language
                    </span>
                </h3>
                <p
                    class="hidden lg:block text-sm {step !== 2
                        ? 'text-gray-500'
                        : 'text-gray-700'}"
                >
                    Choose the preferred language for your pitch deck content
                </p>
            </div>
        </div>
        <div class="checkpoint flex flex-1 flex-col lg:flex-row gap-3 relative">
            <div
                class="flex justify-center items-center mx-auto rounded-full w-[70px] md:w-[45px] h-[70px] md:h-[45px] shadow {step >
                3
                    ? 'bg-primary-600 text-white'
                    : step === 3
                      ? 'bg-white'
                      : 'bg-gray-100 text-gray-400'}"
            >
                {#if step < 3}
                    <FileJson size={24} />
                {:else if step === 3}
                    <LoaderCircle
                        size={28}
                        style="animation: spin 1s linear infinite"
                    />
                {:else}
                    <Check size={24} />
                {/if}
            </div>
            <div class="flex-1">
                <h3
                    class="h5 font-bold text-center lg:text-start {step !== 3 &&
                        'text-gray-500'}"
                >
                    <span class="hidden lg:block text-xs lg:text-lg">
                        Generating Content
                    </span>
                    <span class="hidden md:block lg:hidden text-xs lg:text-lg">
                        Generating
                    </span>
                </h3>
                <p
                    class="hidden lg:block text-sm {step !== 3
                        ? 'text-gray-500'
                        : 'text-gray-700'}"
                >
                    Generating the pitch deck contents using generative AI
                </p>
            </div>
        </div>
        <div class="checkpoint flex flex-1 flex-col lg:flex-row gap-3 relative">
            <div
                class="flex justify-center items-center mx-auto rounded-full w-[70px] md:w-[45px] h-[70px] md:h-[45px] shadow {step >
                4
                    ? 'bg-primary-600 text-white'
                    : step === 4 || step === 5
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-400'}"
            >
                {#if step === 4}
                    <ClipboardCheck size={24} />
                {:else if step > 4}
                    <Check size={24} />
                {:else}
                    <ClipboardCheck size={24} />
                {/if}
            </div>
            <div class="flex-1">
                <h3
                    class="h5 font-bold text-center lg:text-start {step !== 4 &&
                        'text-gray-500'}"
                >
                    <span class="hidden lg:block text-xs lg:text-lg">
                        Result Summary
                    </span>
                    <span class="hidden md:block lg:hidden text-xs lg:text-lg">
                        Summary
                    </span>
                </h3>
                <p
                    class="hidden lg:block text-sm {step !== 4
                        ? 'text-gray-500'
                        : 'text-gray-700'}"
                >
                    Review the generated key points for your pitch deck
                </p>
            </div>
        </div>
        <div class="checkpoint flex flex-1 flex-col lg:flex-row gap-3 relative">
            <div
                class="flex justify-center items-center mx-auto rounded-full w-[70px] md:w-[45px] h-[70px] md:h-[45px] shadow {step ===
                5
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-400'}"
            >
                <FileDown size={24} />
            </div>
            <div class="flex-1">
                <h3
                    class="h5 font-bold text-center lg:text-start {step !== 5 &&
                        'text-gray-500'}"
                >
                    <span class="hidden lg:block text-xs lg:text-lg">
                        Download Files
                    </span>
                    <span class="hidden md:block lg:hidden text-xs lg:text-lg">
                        Download
                    </span>
                </h3>
                <p
                    class="hidden lg:block text-sm {step !== 5
                        ? 'text-gray-500'
                        : 'text-gray-700'}"
                >
                    Download pitch deck in your preferred format
                </p>
            </div>
        </div>
    </div>
    <div class="lg:hidden -mt-12 md:-mt-14 mx-auto w-[calc(100vw*.7)]">
        <hr class="h-[4px] md:h-[2px] bg-gray-300 border-0!" />
    </div>
</div>
