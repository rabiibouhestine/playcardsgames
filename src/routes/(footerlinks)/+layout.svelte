<script>
	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<div class="flex flex-col text-center space-y-4 my-10 max-w-screen-md mx-auto px-4">
	<slot />
</div>
