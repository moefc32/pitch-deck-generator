<script>
    import '../app.css';
    import { page } from '$app/stores';
    import { ToastProvider } from '@skeletonlabs/skeleton-svelte';
    import {
        computePosition,
        autoUpdate,
        offset,
        shift,
        flip,
        arrow,
    } from '@floating-ui/dom';

    import Header from '$lib/component/Header.svelte';

    initializeStores();

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    const leanRoutes = ['/about-us'];

    let isLeanRoutes;

    $: {
        isLeanRoutes = leanRoutes.includes($page.url.pathname);
    }
</script>

<svelte:head>
    <title>
        {import.meta.env.VITE_APP_NAME}
    </title>
</svelte:head>

{#if $page.status >= 300}
    <div class="flex flex-1 flex-col gap-3 p-5">
        <slot />
    </div>
{:else}
    <Header />
    <div class="flex flex-1 flex-row">
        <div
            class="flex flex-1 flex-col gap-3 mx-auto p-5 {isLeanRoutes &&
                'max-w-screen-md'}"
        >
            <slot />
        </div>
    </div>
{/if}

<Modal />
<ToastProvider position="br" />
