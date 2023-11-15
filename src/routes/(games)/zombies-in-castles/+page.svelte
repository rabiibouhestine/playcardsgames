<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import ArrowDownIcon from '$lib/components/ArrowDownIcon.svelte';
	import { Game } from '$lib/games/zombiesincastles/Game.js';

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
	<div bind:this={canvas} id="pixi" class="h-full shadow-[inset_0_0_200px_60px_rgba(0,0,0,0.3)]" />
	<div class="w-full grid justify-items-center absolute bottom-0">
		<h1 class="text-md font-bold">ABOUT THE GAME</h1>
		<ArrowDownIcon />
	</div>
</div>
<div class="bg-base-100">
	<article class="max-w-screen-md mx-auto py-10">
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
	</article>
</div>
