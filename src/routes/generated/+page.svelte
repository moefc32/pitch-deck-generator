<script>
  import { FileText, Presentation, Pen, Trash2 } from "lucide-svelte";
  import datePrettier from "$lib/datePrettier";

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
</script>

<div class="card flex flex-1 gap-3 p-3 bg-gray-200"></div>
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
              class="btn btn-sm bg-blue-600 text-white"
              title="Download .docx"
            >
              <FileText size={16} class={"me-1"} /> .docx
            </button>
            <button
              class="btn btn-sm bg-orange-700 text-white"
              title="Download .pptx"
            >
              <Presentation size={16} class={"me-1"} /> .pptx
            </button>
          </td>
          <td>
            <button class="btn btn-sm variant-filled-warning" title="Edit">
              <Pen size={16} class={"me-1"} /> Edit
            </button>
            <button class="btn btn-sm variant-filled-error" title="Delete">
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
