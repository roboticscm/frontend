<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch("index_api");

    const json = await res.json();
    if (res.status === 200) {
      return { menu: json };
    } else {
      this.error(res.status, "error message");
    }
  }
</script>

<script>
  import Nav from "../components/nav.svelte";

  export let menu;
</script>

<Nav {menu} />

<main class="main-view">
  <slot />
</main>
