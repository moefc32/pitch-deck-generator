<script>
  export let formData;

  const limit = 100;

  async function handleInput() {
    if (formData.topic.length > limit) {
      formData.topic = formData.topic.slice(0, limit);
    }
  }
</script>

<label class="label mb-16 md:mb-20 lg:mb-24 w-full max-w-[600px]">
  <div class="h1 leading-none font-extrabold mb-3 hidden lg:block">
    What do you<br />want to create?
  </div>
  <div class="h3 font-extrabold mb-3 lg:hidden">
    What do you want to create?
  </div>
  <div class="text-gray-500">
    Enter the keywords for the topic you want to present
  </div>
  <input
    type="text"
    class="input px-5 py-3 rounded-lg"
    bind:value={formData.topic}
    on:input={handleInput}
  />
  <div class="text-right text-small">{formData.topic.length}/{limit}</div>
</label>
