<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/zombiesincastles/Game.js';
	import Header from '$lib/components/Header.svelte';

	let game;
	let canvas;

	onMount(() => {
		game = new Game(canvas);

		return () => {
			game.end();
		};
	});
</script>

<div class="flex flex-col h-screen relative bg-emerald-600">
	<Header title="Zombies in Castles" />
	<div class="flex flex-col h-full">
		<div bind:this={canvas} class="grow" />
	</div>
</div>
<div class="bg-base-100">
	<article class="max-w-screen-md mx-auto py-10">
		<h1 class="text-5xl font-bold">Zombies in Castles</h1>
		<p>yada yada yada</p>
	</article>
</div>
