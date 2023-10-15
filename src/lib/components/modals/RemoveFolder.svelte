<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button, ButtonGroup, Modal, ModalBody, ModalFooter } from "yesvelte";
  createEventDispatcher
  const dispatch  = createEventDispatcher()

    export let show: boolean = flase
    export let modal: SvelteComponent
    export let selectedFile

</script>

<Modal bind:this={modal} bind:show>
    <ModalBody>
      Are you sure to reomve {selectedFile[selectedFile.length - 1].name} folder?
    </ModalBody>
    <ModalFooter>
      <ButtonGroup>
        <Button on:click={() => modal.close()}>Cancel</Button>
        <Button on:click={()=>dispatch('remove')}>Remove</Button>
      </ButtonGroup>
    </ModalFooter>
  </Modal>