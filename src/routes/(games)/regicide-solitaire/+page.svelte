<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/regicideSolitaire/Game.js';
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

<GamePage title="Regicide Solitaire">
	<div bind:this={canvas} class="grow" slot="gameSection" />
	<h1 class="text-5xl font-bold">Regicide Solitaire</h1>
	<p>yada yada yada</p>
</GamePage>
