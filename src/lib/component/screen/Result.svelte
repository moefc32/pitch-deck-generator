<script>
    import Highlight from 'svelte-highlight';
    import json from 'svelte-highlight/languages/json';
    import github from 'svelte-highlight/styles/github-dark-dimmed';
    import { LoaderCircle } from 'lucide-svelte';
    import axios from 'axios';

    export let step;
    export let response;
    export let navigateBack;

    let jsonResponse;

    async function exportDocument(type) {
        const languages = {
            Indonesian: 'id-ID',
            English: 'en-US',
        };

        try {
            const result = await axios.post(`api/document?type=${type}`, {
                language: languages[response.language],
                data: response.generated,
            });

            const byteCharacters = atob(result.data.data.byte);
            const byteNumbers = Array.from(byteCharacters, char =>
                char.charCodeAt(0),
            );
            const byteArray = new Uint8Array(byteNumbers);

            const documentBlob = new Blob([byteArray], {
                type:
                    type === 'pptx'
                        ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });

            const documentUrl = URL.createObjectURL(documentBlob);
            const documentLink = document.createElement('a');

            documentLink.href = documentUrl;
            documentLink.download = `${result.data.data.name}.${type}`;
            documentLink.click();

            documentLink.remove();
            URL.revokeObjectURL(documentUrl);
        } catch (e) {
            console.error(e);
        }
    }

    $: {
        jsonResponse = response ? JSON.stringify(response, null, 2).trim() : {};
    }
</script>

<svelte:head>
    {@html github}
</svelte:head>

{#if step === 3}
    <div
        class="flex flex-1 flex-col justify-center items-center self-stretch gap-3 mb-16 text-primary-600"
    >
        <LoaderCircle size={100} style="animation: spin 1s linear infinite" />
        <div class="text-gray-700">Generating content, please wait...</div>
    </div>
{:else}
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
            class="btn bg-[#d0522a] text-white"
            title="Export generated content as PowerPoint file"
            on:click={() => exportDocument('pptx')}
        >
            Export .pptx
        </button>
        <button
            type="button"
            class="btn bg-[#2b579a] text-white"
            title="Export generated content as Word file"
            on:click={() => exportDocument('docx')}
        >
            Export .docx
        </button>
        <button
            type="button"
            class="btn preset-filled lg:ms-auto"
            title="Generate another pitch deck documents"
            on:click={() => navigateBack()}
        >
            Generate Another
        </button>
    </div>
{/if}
