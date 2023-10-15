<script lang="ts">
  import { Icon, Button } from 'yesvelte';
  import FilePond from './FilePond.svelte';
  let filePondInstance = FilePond;

  export let selectedFile: any;
  function onSelect(file) {
    selectedFile = [...selectedFile, file];
  }
  function goBack() {
    if (selectedFile.length == 1) return;
    selectedFile.pop();
    selectedFile = selectedFile;
  }
  function moveTo(index) {
    selectedFile.splice(index + 1, selectedFile.length - index);
    selectedFile = selectedFile;
  }
</script>

<Button disabled={selectedFile.length == 1} on:click={goBack}>
  <Icon name="arrow-left" />back
</Button>
<div>
  {#each selectedFile as file, index}
    <Icon name="chevron-right" />
    <button class="breadcrumb-link" on:click={() => moveTo(index)}>
      {file.name}
    </button>
  {/each}
</div>
<div class="assets-panel-wrapper">
  {#each selectedFile[selectedFile.length - 1].files as file, index}
    {#if file.type === 'dir'}
      <button class="folder-btn" on:dblclick={() => onSelect(file)}>
        <div class="folder">
          <Icon name="folder" fontSize="1" size="4x" color="yellow" />
          <div class="title">{file.name}</div>
        </div>
      </button>
    {:else}
    <div style = 'min-width: 200px ; '>
        <FilePond filePath =  {file.path} />
      </div>
    {/if}
  {/each}
</div>
<FilePond filePath = '' />

<style>
  .folder {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid gray; */
    border-radius: 5px;
  }
  .assets-panel-wrapper {
    padding: 10px;
    gap: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .folder-btn {
    @apply y-buttons;
    background-color: white;
    /* border: 1px solid gray; */
    padding: 5px;
    border-radius: 0.3rem;
    border: none;
    box-shadow: 0px 0px 10px gray;
  }
  .breadcrumb-link {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
  }
  .breadcrumb-link:hover {
    color: #2800ef;
  }
</style>
