<script>
    import Highlight from 'svelte-highlight';
    import json from 'svelte-highlight/languages/json';
    import github from 'svelte-highlight/styles/github-dark-dimmed';

    export let response;
    export let navigateBack;
    export let navigateScreen;

    let jsonResponse;

    async function exportJson() {
        const blob = new Blob([jsonResponse], { type: 'application/json' });
        const documentUrl = URL.createObjectURL(blob);
        const documentLink = document.createElement('a');

        documentLink.href = documentUrl;
        documentLink.download = 'pitch-deck.json';
        documentLink.click();

        documentLink.remove();
        URL.revokeObjectURL(documentUrl);
    }

    $: {
        console.log('Response in Result.svelte:', response);
        jsonResponse = response ? JSON.stringify(response, null, 2).trim() : {};
    }
</script>

<svelte:head>
    {@html github}
</svelte:head>

<div class="flex flex-1 flex-col self-stretch w-full">
    <div class="mb-3">Data generated successfully.</div>
    <Highlight
        language={json}
        class="p-0 text-sm leading-tight break-words whitespace-pre-wrap max-h-[calc(100dvh-380px)] rounded-lg overflow-y-auto"
        code={jsonResponse}
    ></Highlight>
</div>

<div class="flex flex-col self-stretch lg:flex-row gap-2 lg:gap-3 mt-6">
    <button
        type="button"
        class="btn preset-filled-secondary-500"
        title="Proceed to the next step"
        on:click={() => navigateScreen()}
    >
        Next Step
    </button>
    <button
        type="button"
        class="btn bg-[#3e6eaf] text-white"
        title="Export generated data as JSON file"
        on:click={() => exportJson()}
    >
        Export .json
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
