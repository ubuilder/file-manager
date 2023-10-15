<script lang="ts">
  import { createEventDispatcher, type SvelteComponent } from "svelte";
  import { Button, ButtonGroup, FormInput, Modal, ModalBody, ModalFooter } from "yesvelte";
  const dispatch = createEventDispatcher()

    export let modal: SvelteComponent
    export let show: boolean = false
    export let folderName  = "New Folder"
</script>

<Modal bind:this={modal} bind:show>
    <ModalBody>
      <FormInput bind:value={folderName} label="Folder Name" />
    </ModalBody>
    <ModalFooter>
      <ButtonGroup>
        <Button on:click={() => modal.close()}>Cancel</Button>
        <Button on:click={()=>dispatch("create")}>Create</Button>
      </ButtonGroup>
    </ModalFooter>
  </Modal>