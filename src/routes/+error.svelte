<script>
    import { page } from '$app/stores';

    const dictionary = Object.freeze({
        en: {
            403: {
                headline: "You're not on the list",
                message:
                    "You don't have permission to access this page. If you think this is a mistake, try logging in with a different account.",
                icon: '/states/unauthorized.svg',
            },
            404: {
                headline: "We can't find that",
                message:
                    'The link might be broken, or the page may have been moved. Try heading back to the homepage to find what you need.',
                icon: '/states/not-found.svg',
            },
            client: {
                headline: 'Something went wrong',
                message:
                    "We couldn't process that action. Please try refreshing the page or returning to the previous screen to try again.",
                icon: '/states/client-error.svg',
            },
            server: {
                headline: 'Our server is struggling',
                message:
                    'Our system is currently unresponsive. Please wait a moment before trying again, or return to the homepage.',
                icon: '/states/server-error.svg',
            },
            label: {
                error: 'Page Issue',
                code: 'Code',
                back: 'Go Back',
                refresh: 'Refresh Page',
                home: 'Go to Home',
            },
        },
        id: {
            403: {
                headline: 'Akses tidak diizinkan',
                message:
                    'Anda tidak memiliki akses untuk membuka halaman ini. Jika ini kesalahan, silakan coba masuk dengan akun lain.',
                icon: '/states/unauthorized.svg',
            },
            404: {
                headline: 'Halaman tidak ditemukan',
                message:
                    'Tautan mungkin rusak atau sudah dipindahkan. Silakan kembali ke beranda untuk mencari yang Anda butuhkan.',
                icon: '/states/not-found.svg',
            },
            client: {
                headline: 'Terjadi suatu kendala',
                message:
                    'Kami tidak dapat memproses permintaan ini. Silakan muat ulang halaman atau kembali ke layar sebelumnya.',
                icon: '/states/client-error.svg',
            },
            server: {
                headline: 'Server sedang bermasalah',
                message:
                    'Sistem kami sedang tidak responsif saat ini. Mohon tunggu sejenak sebelum mencoba lagi atau kembali ke beranda.',
                icon: '/states/server-error.svg',
            },
            label: {
                error: 'Kendala Halaman',
                code: 'Kode',
                back: 'Kembali',
                refresh: 'Muat Ulang',
                home: 'Halaman Utama',
            },
        },
    });

    $: status = $page.status;
    $: type =
        status === 404
            ? '404'
            : status === 403
              ? '403'
              : status >= 500
                ? 'server'
                : 'client';
    $: contents = dictionary[$page.data.lang || 'en'][type];
    $: label = dictionary[$page.data.lang || 'en'].label;
</script>

<svelte:head>
    <title>
        {label.error} | {import.meta.env.VITE_APP_NAME}
    </title>
</svelte:head>

<div class="flex flex-1 flex-col justify-center items-center gap-6 w-full p-12">
    <div
        role="img"
        class="bg-black dark:bg-base-content [mask-size:contain] [mask-repeat:no-repeat] w-50 aspect-29/8"
        style:mask-image="url('{contents.icon}')"
    ></div>
    <div class="flex flex-col gap-6 text-center max-w-2xl">
        <h1 class="text-4xl font-bold">{contents.headline}</h1>
        <p>{contents.message}</p>
        <span class="text-gray-500">{label.code}: {status}</span>
    </div>
    <div class="flex gap-3 mb-12">
        {#if ['403', '404', 'client'].includes(type)}
            <button
                on:click={() => window.history.back()}
                class="btn btn-primary">{label.back}</button
            >
        {:else if type === 'server'}
            <button
                on:click={() => window.location.reload()}
                class="btn btn-primary">{label.refresh}</button
            >
        {/if}
        <a href="/" class="btn btn-outline btn-primary">{label.home}</a>
    </div>
</div>
