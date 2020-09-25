<script>
  import { onMount } from "svelte";
  import { StringUtil } from "src/lib/string";

  export let content;
  const id = StringUtil.genUUID();

  onMount(() => {
    import("src/lib/vendor/ace/build/src-noconflict/ace").then((res) => {
      const ace = res.default;
      const editor = ace.edit(id);

      import("src/lib/vendor/ace/build/src-noconflict/mode-javascript").then(
        (r) => {
          const JavaScriptMode = ace.require("ace/mode/javascript").Mode;
          editor.session.setMode(new JavaScriptMode());
        }
      );
    });
  });
</script>

<style>
  .ace-editor {
    width: 100%;
    height: 100%;
  }
</style>

<div {id} class="ace-editor">{content}</div>
