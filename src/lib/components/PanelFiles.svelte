<script lang="ts">
  import { Icon, Button, Modal, FormInput, ButtonGroup, ModalFooter, ModalBody } from 'yesvelte';
  import FilePond from './FilePond.svelte';
  import type { SvelteComponent } from 'svelte';

  export let selectedFile: any;
  let modalCreate: SvelteComponent;
  let removeModal: SvelteComponent;
  let showModal = false;
  let showModalRemove = false;
  let newFolderName = 'New Folder';

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

  async function onCreateFolder() {
    console.log('somethinf', selectedFile[selectedFile.length - 1].path, newFolderName);
    let path = `${selectedFile[selectedFile.length - 1].path ?? ''}/${newFolderName}`;
    await fetch('/assets/create-dir', {
      method: 'POST',
      body: JSON.stringify({ path })
    }).then((res) => res);
    modalCreate.close();
  }
  async function onRemoveFolder() {
    const path = selectedFile[selectedFile.length - 1].path;
    await fetch('/assets/remove-dir', {
      method: 'POST',
      body: JSON.stringify({ path })
    });
  }
  $: console.log('showmodal', newFolderName);
</script>

<div class="actions">
  <Button disabled={selectedFile.length == 1} on:click={goBack}>
    <Icon name="arrow-left" />back
  </Button>
  <ButtonGroup>
    <Button on:click={() => (showModalRemove = true)}>
      <Icon name="folder" />Remove folder
    </Button>
    <Button on:click={() => (showModal = true)}>
      <Icon name="folder" />New Follder
    </Button>
  </ButtonGroup>
  <Modal bind:this={modalCreate} bind:show={showModal}>
    <ModalBody>
      <FormInput bind:value={newFolderName} label="Folder Name" />
    </ModalBody>
    <ModalFooter>
      <ButtonGroup>
        <Button on:click={() => modalCreate.close()}>Cancel</Button>
        <Button on:click={onCreateFolder}>Create</Button>
      </ButtonGroup>
    </ModalFooter>
  </Modal>
  <Modal bind:this={removeModal} bind:show={showModalRemove}>
    <ModalBody>
      Are you sure to reomve {selectedFile[selectedFile.length - 1].name} folder?
    </ModalBody>
    <ModalFooter>
      <ButtonGroup>
        <Button on:click={() => removeModal.close()}>Cancel</Button>
        <Button on:click={onRemoveFolder}>Remove</Button>
      </ButtonGroup>
    </ModalFooter>
  </Modal>
</div>

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
      <div style="min-width: 200px ; ">
        <FilePond filePath={file.path} />
      </div>
    {/if}
  {/each}
</div>
<FilePond filePath="" />

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
  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
