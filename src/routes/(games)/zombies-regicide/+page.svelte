<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/zombiesincastles/Game.js';
	import GamePage from '$lib/components/GamePage.svelte';

	let game;
	let canvas;

	onMount(() => {
		game = new Game(canvas);

		return () => {
			game.end();
		};
	});
</script>

<GamePage title="Zombies Regicide">
	<div bind:this={canvas} class="grow" slot="gameSection" />
	<h1 class="text-5xl font-bold">Zombies Regicide</h1>
	<p>yada yada yada</p>
</GamePage>
