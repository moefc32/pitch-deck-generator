<script>
  import { Avatar } from "@skeletonlabs/skeleton";

  export let data;

  const { pageTitle, content } = data;
</script>

<h2 class="section-title mt-3 md:mt-6 mb-6 md:mb-9">
  <span class="h1 md:h2">{pageTitle}</span>
  <span class="text-7xl leading-3 text-secondary-500">.</span>
</h2>
<section
  class="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-9"
>
  <Avatar src={content?.avatar} width="w-36" rounded="mx-auto rounded-full" />
  <div class="flex flex-1 flex-col gap-3">
    {#each content?.paragraphs as item, i}
      <p class="leading-7">{@html item}</p>
    {/each}
    <hr class="my-3 w-[50px]" />
    <div class="flex flex-col-reverse sm:flex-row gap-6 mb-6">
      <div class="flex flex-1 flex-col gap-3">
        <p>Organized by :</p>
        <a href={content?.organizer?.url} target="_blank">
          <img
            src={content?.organizer?.image}
            alt="IITC 2024"
            class="w-[140px]"
          />
        </a>
      </div>
      <div class="flex flex-1 flex-col gap-3">
        <p>Development stacks :</p>
        <ul class="list-disc ps-6 leading-7">
          {#each content?.stacks as item, i}
            <li>
              <a href={item.url} target="_blank" class="anchor">{item.name}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>
