<script>
  import FilePond, { registerPlugin, supported } from 'svelte-filepond';

  // Import the Image EXIF Orientation and Image Preview plugins
  // Note: These need to be installed separately
  // `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
  import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
  import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
  // Register the plugins
  registerPlugin(
    FilePondPluginImageEdit,
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageTransform
  );

  // a reference to the component, used to call FilePond methods
  let pond;

  // pond.getFiles() will return the active files

  // the name to use for the internal file input
  export let name = 'file';
  export let filePath;
  export let files = filePath
    ? [
        {
          source: filePath,
          options: {
            type: 'local'
          }
        }
      ]
    : undefined;
  let server = {
    process: '/assets',
    revert:'/assets',
    restore: '/assets',
    load: '/',
    fetch: '/'
  };
  let imageTransformVariants = {
    thumb_medium_: (transforms) => {
      transforms.resize = {
        size: {
          width: 384,
          height: 384
        }
      };
      return transforms;
    },
    thumb_small_: (transforms) => {
      transforms.resize = {
        size: {
          width: 128,
          height: 128
        }
      };
      return transforms;
    }
  };

  // handle filepond events
  function handleInit() {
    console.log('FilePond has initialised');
  }

  function handleAddFile(err, fileItem) {
    console.log('A file has been added', fileItem);
  }
  function  removeFiles  (event){
    console.log('files are gona to remvoe')
  }
  function  removeFile  (event){
    console.log('files are gona to remvoe')
  }
</script>

<div class="app">
  <FilePond
    bind:this={pond}
    {name}
    {files}
    {server}
    oninit={handleInit}
    {removeFiles} 
    {removeFile} 
    onaddfile={handleAddFile}
    labelIdle="Click or Drop here"
    imagePreviewMaxHeight="100"
    credits={false}
    allow-remove = {true}
    imageEditAllowEdit= {true},
    {imageTransformVariants}
  />
</div>
