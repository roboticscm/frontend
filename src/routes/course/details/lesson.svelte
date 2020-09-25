<script>
  import { StringUtil } from "src/lib/string";
  import Ace from "src/components/ace.svelte";

  export let lessons;

  const openScript = "[script]";
  const closeScript = "[/script]";

  const getParts = (source) => {
    const scriptPartCount = StringUtil.countSubString(source, openScript);

    if (scriptPartCount === 0) {
      return [source];
    }

    const result = [];
    let s = source;
    for (let i = 0; i < scriptPartCount; i++) {
      const startIndex = s.indexOf(openScript);
      if (startIndex === 0) {
        const endIndex = s.indexOf(closeScript);
        result.push(s.substring(startIndex, endIndex));
        s = s.substring(endIndex + 1 + closeScript.length, s.length);
        console.log("s1 ", s);
      } else if (startIndex > 0) {
        const outter = s.substring(0, startIndex);
        result.push(outter);
        const endIndex = s.indexOf(closeScript);
        result.push(s.substring(startIndex, endIndex));
        s = s.substring(endIndex + 1 + closeScript.length, s.length);
        console.log("s2 ", s);
      }
    }
    return result;
  };
</script>

<style>
</style>

{#if lessons && lessons.length > 0}
  {#each lessons as lesson}
    {#each getParts(lesson.content) as part}
      {#if part.includes('[script]')}
        <div style="width: 100%; height: 200px;">
          <Ace content={part.replace(openScript, '')} />
        </div>
      {:else}
        {@html part}
      {/if}
    {/each}
  {/each}
{:else}No lesson available{/if}
