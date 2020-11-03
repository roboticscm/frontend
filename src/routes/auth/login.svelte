<script>
    import { stores } from "@sapper/app";

    const { session } = stores();

    let email = null;
    let password = "user123";
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
        const target = window.location.search.replace("?page=", "");
        window.location.href = target;
    }
</script>

<form>
    <p>Login</p>
    <select bind:value={email}>
        <option value={null}>-- Select User Type --</option>
        <option value="user@example.com">Regular</option>
        <option value="owner@example.org">Owner</option>
        <option value="admin@example.net">Admin</option>
    </select>
    <input type="password" bind:value={password} />
    <button type="button" on:click={login}>Log in</button>
</form>
