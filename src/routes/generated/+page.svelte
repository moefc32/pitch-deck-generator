<script>
  import { goto } from "$app/navigation";
  import { getModalStore, getToastStore } from "@skeletonlabs/skeleton";
  import { Plus, FileText, Presentation, Pen, Trash2 } from "lucide-svelte";
  import datePrettier from "$lib/datePrettier";

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  const data = [
    {
      topic: "Mobile Apps",
      language: "english",
      timestamp: 1726561894000,
    },
    {
      topic: "Mobile Apps",
      language: "english",
      timestamp: 1726561894000,
    },
    {
      topic: "Mobile Apps",
      language: "english",
      timestamp: 1726561894000,
    },
    {
      topic: "Mobile Apps",
      language: "indonesian",
      timestamp: 1726561894000,
    },
    {
      topic: "Mobile Apps",
      language: "indonesian",
      timestamp: 1726561894000,
    },
    {
      topic: "Mobile Apps",
      language: "indonesian",
      timestamp: 1726561894000,
    },
    {
      topic: "Mobile Apps",
      language: "english",
      timestamp: 1726561894000,
    },
    {
      topic: "Mobile Apps",
      language: "english",
      timestamp: 1726561894000,
    },
    {
      topic: "Mobile Apps",
      language: "english",
      timestamp: 1726561894000,
    },
    {
      topic: "Mobile Apps",
      language: "indonesian",
      timestamp: 1726561894000,
    },
  ];

  async function openDownload() {
    toastStore.trigger({
      background: "variant-filled-primary",
      message: "Preparing file to download, please wait.",
    });
  }

  async function openDelete() {
    modalStore.trigger({
      type: "confirm",
      title: "Delete Pitch Deck",
      body: "Are you sure you want to delete this pitch deck data?",
      response: async (r) => {
        if (r) {
          toastStore.trigger({
            background: "variant-filled-primary",
            message: "Pitch deck data deleted successfully.",
          });
        }
      },
    });
  }
</script>

<div class="flex flex-1 gap-3">
  <button
    class="btn variant-filled-primary"
    title="Create New Pitch Deck"
    on:click={() => goto("/prompt")}
  >
    <Plus size={16} class={"me-1"} /> Create New
  </button>
</div>
<div class="table-container">
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Topic</th>
        <th>Language</th>
        <th>Date / Time</th>
        <th>Downloads</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each data as item, i}
        <tr>
          <td>{item.topic}</td>
          <td>{item.language}</td>
          <td>{datePrettier(item.timestamp)}</td>
          <td>
            <button
              class="btn btn-sm bg-[#2b579a] text-white"
              title="Download .docx"
              on:click={() => openDownload()}
            >
              <FileText size={16} class={"me-1"} /> .docx
            </button>
            <button
              class="btn btn-sm bg-[#c94a3a] text-white"
              title="Download .pptx"
              on:click={() => openDownload()}
            >
              <Presentation size={16} class={"me-1"} /> .pptx
            </button>
          </td>
          <td>
            <button
              class="btn btn-sm variant-filled-warning"
              title="Edit"
              on:click={() => goto("/prompt")}
            >
              <Pen size={16} class={"me-1"} /> Edit
            </button>
            <button
              class="btn btn-sm variant-filled-error"
              title="Delete"
              on:click={() => openDelete()}
            >
              <Trash2 size={16} class={"me-1"} /> Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  table td:nth-last-child(-n + 2) {
    white-space: nowrap;
    width: 1%;
  }
</style>
