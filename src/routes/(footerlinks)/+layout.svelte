<script>
	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<div class="flex flex-col items-center text-center space-y-4 my-10 mx-10 lg:mx-20">
	<slot />
</div>
