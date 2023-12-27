<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/apps/regicideSolitaire/Game.js';
	import GamePage from '$lib/components/GamePage.svelte';
	import Link from '$lib/components/Link.svelte';

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
	<p>
		Regicide Solitaire is an online alternative to the single player mode of the card game <Link
			href="https://www.regicidegame.com/">Regicide</Link
		>. The game was originally designed by <Link
			href="https://boardgamegeek.com/boardgamedesigner/126153/paul-abrahams">Paul Abrahams</Link
		>, <Link href="https://boardgamegeek.com/boardgamedesigner/126151/luke-badger">Luke Badger</Link
		> and <Link href="https://boardgamegeek.com/boardgamedesigner/126152/andy-richdale"
			>Andy Richdale</Link
		>.
	</p>
	<p>
		Regicide is played with a standard deck of 54 playing cards. A custom deck was designed for this
		game by <Link href="https://www.sketchgoblin.co.nz/">SketchGoblin</Link> and can be purchased on
		<Link href="https://badgersfrommars.com/collections/all">the publisher's website</Link>.
	</p>
	<h2 class="text-5xl font-bold">Aim of the game</h2>
	<p>
		In Regicide Solitaire your goal is to defeat 12 powerful enemies. You play cards from your hand
		to attack the enemy and once enough damage is dealt, the enemy is defeated. You win when the
		last King is defeated. But beware! Each turn the enemy strikes back. You discard cards from your
		hand to satisfy the damage and if you can’t discard enough, you lose!
	</p>
	<h2 class="text-5xl font-bold">Setup</h2>
	<p />
	<h3 class="text-2xl font-bold">xxxxx</h3>
</GamePage>
