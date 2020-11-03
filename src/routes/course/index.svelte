<script context="module">
  export async function preload(page) {
    const id = page.query.id;
    const res = await this.fetch(`course/index_api?id=${id}`);

    const json = await res.json();

    if (res.status === 200) {
      return { courses: json, page: page.query.name };
    } else {
      this.error(res.status, "error message");
    }
  }
</script>

<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";

  import List from "./components/list";

  export let courses;
  export let page;

  const { session } = stores();

  onMount(() => {
    if (!$session.authenticated) {
      const target = window.location.pathname + window.location.search;
      window.location.href = `/auth/login?page=${target}`;
    }
  });
</script>

<style>
  .no-course {
    text-align: center;
  }

  .course-container {
    margin: 0 auto;
  }
</style>

<svelte:head>
  <title>{page}</title>
</svelte:head>
{#if courses && courses.length > 0}
  <div class="course-container">
    <List {courses} />
  </div>
{:else}
  <div class="no-course">No course available</div>
{/if}
