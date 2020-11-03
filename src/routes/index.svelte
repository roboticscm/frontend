<script>
  import RichEditor from "src/components/rich_editor";
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";

  const { session } = stores();
  let email = null;
  let password = "user123";

  onMount(() => {
    if (!$session.authenticated) {
      window.location.href = "/auth/login?page=/";
    }
  });

  async function login() {
    await fetch("http://localhost:2000/session", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    // window.location.href = "/";
  }

  let value = "abc",
    editorRef;

  const onClick = async () => {
    // const start = new Date();
    // const res = await fetch(`/lesson`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     content: value,
    //     tableContentId: "2404629142956934159",
    //   }),
    // });
    // const json = await res.json();
    // const end = new Date();
    // console.log(end.getTime() - start.getTime(), json);

    logout();
  };
</script>

<RichEditor bind:this={editorRef} bind:value />
