<script>
    import { X } from 'lucide-svelte';

    export let idea;
    export let navigateScreen;

    $: enableNavigateScreen = idea.topic.length ? true : false;
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex flex-1 flex-col justify-center items-center self-stretch">
    <textarea
        class="flex-1 input my-6 ps-5 pe-12 py-3 rounded-lg w-full"
        placeholder="Explain your pitch deck topic or ideas in detail..."
        bind:value={idea.topic}
    ></textarea>
</div>

<div class="flex flex-col self-stretch lg:flex-row gap-2 lg:gap-3 mt-6">
    <button
        type="button"
        class="btn btn-primary"
        title="Proceed to the next step"
        disabled={!enableNavigateScreen}
        on:click={() => navigateScreen()}
    >
        Next Step
    </button>
</div>
