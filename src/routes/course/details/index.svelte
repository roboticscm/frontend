<script context="module">
  export async function preload(page) {
    const id = page.query.cid;

    const res = await this.fetch(`course/details/index_api?id=${id}`);
    const json = await res.json();

    if (res.status === 200) {
      return { tableContents: json, page };
    } else {
      this.error(res.status, "error message");
    }
  }
</script>

<script>
  import Lesson from "./lesson.svelte";
  import TwoColView from "src/components/two_col_view.svelte";

  export let tableContents;

  let lessons;

  const viewLesson = async (tableContentId) => {
    const res = await fetch(`/get-lessons?id=${tableContentId}`);
    lessons = await res.json();
  };
</script>

<style>
</style>

<TwoColView id="courseDetails">
  <div slot="viewLeft">
    {#each tableContents as tableContent}
      <div on:click={() => viewLesson(tableContent.id)}>
        {tableContent.name}
      </div>
    {/each}
  </div>
  <div>
    <Lesson {lessons} />
  </div>
</TwoColView>
