<script>
  import { onMount } from "svelte";

  export let content;
  export let language = "javascript";
  export let height = undefined;

  let editorRef;

  $: if (content) {
    import("src/lib/vendor/ace/build/src-noconflict/ace").then((res) => {
      const ace = res.default;
      const editor = ace.edit(editorRef);

      editor.setValue(content, 1);
      // const lines = editor.session.doc.getAllLines();
      // if (!height) {
      //   height = lines.length < 10 ? "100px" : "200px";
      // }

      import(`src/lib/vendor/ace/build/src-noconflict/mode-${language}`).then(
        (r) => {
          const Mode = ace.require(`ace/mode/${language}`).Mode;
          editor.session.setMode(new Mode());
        }
      );
    });
  }

  onMount(() => {
    editorRef.style.height = height;
  });
</script>

<style>
  .ace-editor {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={editorRef} class="ace-editor" />
