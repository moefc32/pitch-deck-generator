<script>
    import { X } from 'lucide-svelte';

    export let formData;
    export let navigateScreen;

    let enableNavigateScreen = false;

    $: {
        enableNavigateScreen = formData.topic.length ? true : false;
    }
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex flex-1 flex-col justify-center items-center self-stretch">
    <label class="label mb-32 w-full max-w-[1200px]">
        <div class="flex items-center pt-2">
            <textarea
                class="input ps-5 pe-12 py-3 rounded-lg min-h-[400px]"
                bind:value={formData.topic}
            ></textarea>
            {#if formData.topic.length}
                <div
                    role="button"
                    class="-ms-9 z-10"
                    title="Clear all text"
                    on:click={() => (formData.topic = '')}
                >
                    <X size={24} />
                </div>
            {/if}
        </div>
    </label>
</div>

<div class="flex flex-col self-stretch lg:flex-row gap-2 lg:gap-3 mt-6">
    <button
        type="button"
        class="btn preset-filled-secondary-500"
        title="Proceed to the next step"
        disabled={!enableNavigateScreen}
        on:click={() => navigateScreen()}
    >
        Next Step
    </button>
</div>
