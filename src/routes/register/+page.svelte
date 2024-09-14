<script>
  import { goto } from "$app/navigation";
  import { Pencil } from "lucide-svelte";
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="card flex flex-1 p-3 rounded-3xl shadow-lg bg-white border-2 border-gray-200"
>
  <div
    class="flex flex-1 flex-col justify-center items-center p-3 lg:p-6 xl:p-12"
  >
    <h1 class="h1 mb-3">Register</h1>
    <div class="flex flex-col gap-3 w-full">
      <label class="label">
        <span>Email</span>
        <input type="email" class="input" />
      </label>
      <label class="label">
        <span>Password</span>
        <input type="password" class="input" />
      </label>
      <button type="button" class="btn variant-filled-primary mt-3">
        <Pencil size={16} class={"me-1"} /> Register
      </button>
      <div class="text-center">
        Already have an account?
        <span role="button" class="anchor" on:click={() => goto("/login")}>
          Login
        </span> instead.
      </div>
    </div>
  </div>
  <div
    class="image hidden lg:flex justify-center items-center rounded rounded-tr-2xl rounded-br-2xl bg-primary-500 w-3/5"
  ></div>
</div>
