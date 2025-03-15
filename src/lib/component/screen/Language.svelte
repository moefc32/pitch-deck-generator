<script>
    export let formData;
    export let navigateBack;
    export let handleSubmit;

    const languages = ['Indonesian', 'English'];
    const tones = ['Professional', 'Formal', 'Casual'];

    let enableNavigateScreen = false;

    $: {
        enableNavigateScreen =
            formData.language && formData.tone ? true : false;
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<div
    class="flex flex-1 flex-col justify-center items-stretch gap-6 self-stretch"
>
    <div class="languages flex justify-center items-stretch gap-3">
        {#each languages as item, i}
            <div
                role="button"
                class="hover:card flex flex-1 flex-col justify-center items-center gap-3 px-6 py-12 transition duration-250 {formData.language ===
                    item && 'card bg-gray-200'}"
                on:click={() => (formData.language = item)}
            >
                <img
                    src={`language/${item}.svg`}
                    alt={item + ' flag'}
                    class="block w-[80%] max-w-[200px] aspect-4/3 shadow-lg"
                />
                <span class="text-lg">{item}</span>
            </div>
        {/each}
    </div>
    <hr class="my-3 w-[50px]" />
    <div class="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4">
        Language tone :
        {#each tones as item, i}
            <label role="button" class="flex items-center space-x-2">
                <input
                    type="radio"
                    class="radio"
                    value={item}
                    bind:group={formData.tone}
                />
                <p>{item}</p>
            </label>
        {/each}
    </div>
</div>

<div class="flex flex-col self-stretch lg:flex-row gap-2 lg:gap-3 mt-6">
    <button
        type="button"
        class="btn preset-filled-secondary-500"
        title="Proceed to the next step"
        disabled={!enableNavigateScreen}
        on:click={() => handleSubmit()}
    >
        Next Step
    </button>
    <button
        type="button"
        class="btn preset-filled lg:ms-auto"
        title="Back to previous step"
        on:click={() => navigateBack()}
    >
        Back
    </button>
</div>
