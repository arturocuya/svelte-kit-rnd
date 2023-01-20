<script>
    import { onMount } from 'svelte';
    
    let text = 'Loading...';
    const endpoint = '/api/hitme';
    
    onMount(async () => {
        const res = await fetch(endpoint);
        text = await res.text();
        console.log('on mount finished')
    });
</script>

<a href="/">Back</a>
<h1>R&D for SvelteKit</h1>
<p>The following text is the result of hitting the API endpoint:</p>
<pre>{endpoint}</pre>

<p>{text}</p>

