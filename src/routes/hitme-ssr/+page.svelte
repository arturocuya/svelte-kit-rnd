<script lang="ts">
    import { trpc } from '../../lib/trpc/client';
    import type { PageData } from './$types';
    export let data: PageData;

    let users = data.users;

    let userName: string | undefined;
    let userEmail: string | undefined;
    let loading = false;

    const addUser = async() => {
        if (userName && userEmail) {
            loading = true;
            console.log('adding user')
            users = await trpc().addUser.query({ name: userName, email: userEmail });
            userName = '';
            userEmail = '';
            loading = false;
        }
    }
</script>

<a href="/">Back</a>
<h1>R&D for SvelteKit</h1>
<p>The following text is the result of an SSR load:</p>

<p>{data.message}</p>

<p>Now, let's add a user:</p>
<input type="text" bind:value={userName} placeholder="Name" />
<input type="text" bind:value={userEmail} placeholder="Email" />
<button on:click|preventDefault={addUser}>Add user</button>
{#if loading}
    <p>Loading...</p>
{/if}
<ul>
    {#each users as user}
        <li>{user.name} ({user.email})</li>
    {/each}
</ul>

