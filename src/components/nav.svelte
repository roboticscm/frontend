<script>
  export let menu;
</script>

<nav class="nav">
  <div class="nav__left"><a href="/">Home</a></div>
  <div class="nav__center">
    <input class="nav__center__search" placeholder="search..." />
  </div>
  <ul class="nav__right">
    {#each menu as m}
      <li><a href={`course?name=${m.name}&id=${m.id}`}>{m.name}</a></li>
    {/each}
  </ul>
  <div class="nav__logout"><a href="/auth/logout">Logout</a></div>
</nav>
