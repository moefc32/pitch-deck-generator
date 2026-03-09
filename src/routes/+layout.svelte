<script>
    import '../app.css';
    import { page } from '$app/stores';

    import Header from '$lib/component/Header.svelte';

    let { children } = $props();
</script>

<svelte:head>
    <title>
        {import.meta.env.VITE_APP_NAME}
    </title>
</svelte:head>

<Header />
<div class="flex flex-1 flex-row">
    <div class="flex flex-1 flex-col gap-3 mx-auto p-5">
        {@render children()}
    </div>
</div>
