<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/apps/cardCapture/Game.js';
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

<GamePage title="CARD CAPTURE">
	<div bind:this={canvas} class="grow" slot="gameSection" />
	<h1 class="text-5xl font-bold">Card Capture</h1>
	<p>
		Card Capture is a solitaire deck builder using a standard deck of 54 playing cards designed by <Link
			href="https://boardgamegeek.com/user/LucasGentry">Lucas Gentry</Link
		>. The goal of the game is to capture all enemy combatants (Aces and Face Cards), using the
		enemy’s own weapons and tools (non-face cards) against them.
	</p>
	<h2 class="text-5xl font-bold">Setup</h2>
	<p>
		Your personal draw deck consists of 2’s, 3’s, 4’s, and two jokers. The remaining cards make up
		the Enemy Draw Deck, which is shuffled. At the start of the game, 4 cards are drawn from your
		deck to create your starting hand.
	</p>
	<p>
		Simultaneously, 4 cards are drawn from the Enemy Draw Deck. If any of these cards are Jacks,
		Queens, Kings, or Aces, they are taken out and placed at the bottom of the Enemy Draw Deck. The
		removed cards are then replaced by drawing new cards from the top of the Enemy Draw Deck.
	</p>
	<h2 class="text-5xl font-bold">Rules</h2>
	<h3 class="text-2xl font-bold">Materials</h3>
</GamePage>
