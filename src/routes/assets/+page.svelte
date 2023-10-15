<script lang="ts">
  import PanelFiles from '$lib/components/PanelFiles.svelte';
  import Files from '$lib/components/Files.svelte';
  import tabler from 'yesvelte/css/tabler.min.css?url';
  import { Pane, Splitpanes } from 'svelte-splitpanes';
  import { Accordion, AccordionBody, AccordionHeader, AccordionTitle, Accordions } from 'yesvelte';
  import { onMount } from 'svelte';
  export let data;
  let splitPaneConfig = [];
  let selectedFile = [{name :"Assets", files : data.files}];
  let sideBarFileTrucker = []
  $: console.log('selectedFile Change', selectedFile);
  $: console.log('fileTrucker', sideBarFileTrucker);
  onMount(() => {
    splitPaneConfig = JSON.parse(localStorage.getItem('fileManagerConfig') ?? '[]');
  });
  function onResized(event) {
    localStorage.setItem('fileManagerConfig', JSON.stringify(event.detail));
  }
  
</script>

<svelte:head>
  <link rel="stylesheet" href={tabler} />
  <link rel = 'stylesheet' href = "https://unpkg.com/filepond@^4/dist/filepond.css" />
  <link rel = 'stylesheet' href = "https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css" />
  <link rel = 'stylesheet' href = "https://unpkg.com/filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css" />
</svelte:head>

<Splitpanes style="height: 10000px" on:resized={onResized}>
  <Pane minSize={10} maxSize={50} size={20} {...splitPaneConfig[0]}>
    <Accordions>
      <Accordion>
        <AccordionHeader>
          <AccordionTitle on:click = {()=>selectedFile =[{name:"Assets", files: data.files}]}>Assets</AccordionTitle>
        </AccordionHeader>
        <AccordionBody>
          <Files bind:sideBarFileTrucker  bind:selectedFile bind:files={data.files} />
        </AccordionBody>
      </Accordion>
    </Accordions>
  </Pane>
  <Pane {...splitPaneConfig[1]} class="panel-pan">
    <PanelFiles bind:selectedFile />
  </Pane>
</Splitpanes>

<style >
  :global(.panel-pan) {
    height: 100px;
    overflow: auto;
    padding: 20px;
    overflow-y: scroll;
  }
</style>
