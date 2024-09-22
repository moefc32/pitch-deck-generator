<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { popup } from "@skeletonlabs/skeleton";
  import { LogIn, LayoutDashboard } from "lucide-svelte";
  import axios from "axios";

  import ProfilePicture from "./ProfilePicture.svelte";

  export let data;
  export let isPublicRoute;

  const popupFeatured = {
    event: "click",
    target: "user-picture",
    placement: "bottom",
  };
  const activePage =
    "inline-block mt-[5px] bg-primary-500 rounded-lg w-6 h-[5px]";

  let pageUrl = "";
  let hello = "";

  async function doLogout() {
    try {
      const response = await axios.delete("api/auth");
      window.location.href = "/";
    } catch (e) {
      console.error(e);
    }
  }

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");

    if (hours >= 5 && hours < 12) {
      hello = "Good morning";
    } else if (hours >= 12 && hours < 18) {
      hello = "Good afternoon";
    } else if (hours >= 18 && hours < 22) {
      hello = "Good evening";
    } else {
      hello = "Good night";
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  $: {
    pageUrl = $page.url.pathname;
  }
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<header
  class="flex flex-row justify-center items-center gap-6 px-4 py-3 bg-slate-50 shadow-xl z-[100]"
>
  <div class="flex flex-row gap-6 me-auto">
    <div class="flex flex-col justify-center items-center">
      <span
        role="button"
        class="inline-block {pageUrl === '/' && 'mt-[10px]'}"
        on:click={() => goto("/")}>Home</span
      >
      <span class={pageUrl === "/" && activePage}></span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <span
        role="button"
        class="inline-block {pageUrl.startsWith('/blog') && 'mt-[10px]'}"
        on:click={() => goto("/blog")}>Blog</span
      >
      <span class={pageUrl.startsWith("/blog") && activePage}></span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <span
        role="button"
        class="inline-block {pageUrl.startsWith('/about-us') && 'mt-[10px]'}"
        on:click={() => goto("/about-us")}>About Us</span
      >
      <span class={pageUrl.startsWith("/about-us") && activePage}></span>
    </div>
  </div>
  {#if !data.user_id}
    <a href="/login" class="btn variant-filled-primary">
      <LogIn size={16} class={"me-1"} /> Login
    </a>
  {:else}
    <div class="flex items-center gap-2">
      <p class="text-small">
        {#if isPublicRoute}
          <span
            role="button"
            class="btn variant-filled-tertiary -me-11 pe-12"
            on:click={() => goto("/dashboard")}
          >
            <LayoutDashboard size={16} class={"me-1"} /> Open Dashboard
          </span>
        {:else}
          {hello}, <strong>{data.user_name}</strong>
        {/if}
      </p>
      <button use:popup={popupFeatured}>
        <ProfilePicture email={data.user_email} size={30} />
      </button>
      <div
        class="card p-3 w-48 bg-slate-200 text-black shadow-lg"
        data-popup="user-picture"
      >
        <div class="flex flex-col items-stretch">
          <button
            class="btn btn-sm justify-start hover:bg-zinc-400"
            on:click={() => goto("/edit-profile")}>Edit Profile</button
          >
          <button
            class="btn btn-sm justify-start hover:bg-zinc-400"
            on:click={() => doLogout()}>Logout</button
          >
        </div>
      </div>
    </div>
  {/if}
</header>

<style>
  header {
    height: 75px;
  }

  [data-popup="user-picture"] {
    z-index: 100;
  }
</style>
