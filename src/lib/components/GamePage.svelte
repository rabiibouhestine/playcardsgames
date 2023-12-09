<script>
	import Header from '$lib/components/Header.svelte';
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

	export let title;
</script>

<Header {title} />
<!-- <div in:fly={{ delay: 140, duration: 600, x: 0, y: -300, opacity: 1, easing: bounceOut }}> -->
<div>
	<div class="flex flex-col h-[calc(100vh-4rem)] relative bg-emerald-600">
		<div class="flex flex-col h-full">
			<slot name="gameSection" />
		</div>
	</div>
	<div class="bg-base-100">
		<article class="max-w-screen-md mx-auto py-10 flex flex-col gap-y-3">
			<slot />
		</article>
	</div>
</div>
