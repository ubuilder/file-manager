<script lang="ts">
	import { Accordion, AccordionBody, AccordionHeader, AccordionTitle, Accordions, Icon } from "yesvelte";
	import SideFile from "./SideFile.svelte";
	export let files = [];
    export let selectedFile
    export let sideBarFileTrucker
    sideBarFileTrucker.push(files)
    
    function onSelected(file){
        selectedFile.push(file)
        selectedFile = selectedFile
    }
</script>

<Accordions  p= '0'  m=0>
{#each files as file}
	{#if file.type === 'dir'}
        <Accordion  m = '0' p = '0' >
            <AccordionHeader p='0'  m = '0' size = 'sm' icon = 'folder'>  
                <AccordionTitle class  = 'sidebar-file-title'  m = 0  p = 0 icon = 'folder' on:click = {(e)=>{e.preventDefault();onSelected(file)}}>
                    <Icon color = 'yellow' name = 'folder' me = "1" />{file.name.length > 20? file.name.substr(20) + "...": file.name} 
                </AccordionTitle>
            </AccordionHeader>
            <AccordionBody p='0' m="0">
                <svelte:self bind:sideBarFileTrucker  bind:selectedFile = {selectedFile} files = {file.files} />
            </AccordionBody>
        </Accordion>
    {:else}
		<SideFile {file} />
	{/if}
{/each}
</Accordions>


<style>

    :global(.sidebar-file-title):hover{
        color: rgb(4, 0, 255)!important;
    }
</style>

