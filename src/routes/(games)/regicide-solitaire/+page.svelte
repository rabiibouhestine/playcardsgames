<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/apps/regicideSolitaire/Game.js';
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

<GamePage title="REGICIDE SOLITAIRE">
	<div bind:this={canvas} class="grow" slot="gameSection" />
	<h2 class="text-5xl font-bold">Regicide Solitaire</h2>
	<p>Regicide solitaire is the single player mode of the card game Regicide.</p>
</GamePage>
