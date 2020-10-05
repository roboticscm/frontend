<script>
  import RichEditor from "src/components/rich_editor";

  let value = "abc",
    editorRef;

  const onClick = async () => {
    const start = new Date();
    const res = await fetch(`/lesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: value,
        tableContentId: "2404629142956934159",
      }),
    });
    const json = await res.json();
    const end = new Date();
    console.log(end.getTime() - start.getTime(), json);
  };
</script>

<style>
</style>

<RichEditor bind:this={editorRef} bind:value />
<button on:click={onClick}>Click</button>
