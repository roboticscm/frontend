<script>
  import Ace from "src/components/ace.svelte";
  import { getParts, getLanguage } from "src/lib/code";
  import { Code } from "src/lib/constants";

  export let lessons;

  const getHeight = (source) => {
    const numLines = source.split("\n").length;

    return numLines > 10 ? "200px" : "100px";
  };
</script>

<style>
</style>

{#if lessons && lessons.length > 0}
  {#each lessons as lesson}
    {#each getParts(lesson.content) as part}
      {#if part.includes(Code.openTag)}
        <Ace
          content={part.replace(Code.openTag, '')}
          height={getHeight(part.replace(Code.openTag, ''))}
          language={getLanguage(part.replace(Code.openTag, ''))} />
      {:else}
        {@html part}
      {/if}
    {/each}
  {/each}
{:else}No lesson available{/if}
