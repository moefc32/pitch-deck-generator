<script>
    import '../app.css';
    import { page } from '$app/stores';
    import { ToastProvider } from '@skeletonlabs/skeleton-svelte';

    import Header from '$lib/component/Header.svelte';
    import { initializeStores, storePopup } from '$lib/stores';

    let { children } = $props();
</script>

<svelte:head>
    <title>
        {import.meta.env.VITE_APP_NAME}
    </title>
</svelte:head>

{#if $page.status >= 300}
    <div class="flex flex-1 flex-col gap-3 p-5">
        {@render children()}
    </div>
{:else}
    <Header />
    <div class="flex flex-1 flex-row">
        <div class="flex flex-1 flex-col gap-3 mx-auto p-5">
            <ToastProvider>
                {@render children()}
            </ToastProvider>
        </div>
    </div>
{/if}
