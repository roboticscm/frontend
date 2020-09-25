<script>
  export let menu;
</script>

<nav class="nav">
  <div class="left"><a href="/">Home</a></div>
  <div class="center"><input class="search" placeholder="search..." /></div>
  <ul class="right">
    {#each menu as m}
      <li><a href={`course?name=${m.name}&id=${m.id}`}>{m.name}</a></li>
    {/each}
  </ul>
</nav>
