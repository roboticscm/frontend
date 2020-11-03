<script>
    import { onMount } from "svelte";
    import { goto, stores } from "@sapper/app";

    const { session } = stores();

    onMount(() => {
        logout();
    });

    async function logout() {
        await fetch("http://localhost:2000/session", {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        session.set({ authenticated: false, profile: null });
        goto("/auth/login");
    }
</script>
