<script>
	import Header from '$lib/components/header.svelte';
    import '../global.css'
</script>

<main>
    <Header />
    <slot />
</main>

<style>
    main{
        height: 100%;
    }
</style>