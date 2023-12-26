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
		enemy’s own weapons and tools (non-face cards) against them. You can download the rules for free
		on <Link href="https://boardgamegeek.com/boardgame/264566/card-capture/files"
			>BoardGameGeek.com</Link
		>.
	</p>
	<h2 class="text-5xl font-bold">Setup</h2>
	<p>
		Your personal draw deck starts with 2’s, 3’s, 4’s, and two jokers. The remaining cards make up
		the Enemy Draw Deck, which is shuffled. At the start of the game, 4 cards are drawn from your
		deck to create your starting hand.
	</p>
	<p>
		Simultaneously, 4 cards are drawn from the Enemy Draw Deck. If any of these cards are Jacks,
		Queens, Kings, or Aces, they are taken out and placed at the bottom of the Enemy Draw Deck. The
		removed cards are then replaced by drawing new cards from the top of the Enemy Draw Deck.
	</p>
	<h2 class="text-5xl font-bold">Rules</h2>
	<p>
		The game is played in a series of rounds. Each round of the game is separated into 2 phases. The
		discard phase and the capture phase.
	</p>
	<p>
		In the Discard phase, you can select any cards that you would like to discard (to your personal
		capture pile), which will be replaced by drawing from your personal draw deck.
	</p>
	<p>In the capture phase, you can perform of three actions:</p>
	<h3 class="text-2xl font-bold">Capture cards</h3>
	<p>
		Select any card from the enemy row, then select one or more cards from your hand. In order to
		capture the selected enemy card, the selected cards in your hand must all match the suit of the
		selected enemy card. They also must have a combined value that is equal or greater than the
		value of the enemy selected card. Press the 'Capture Card' button to capture the enemy card.
	</p>
	<h3 class="text-2xl font-bold">Get captured</h3>
	<p>
		Select any card from your hand, then press the 'Get Captured' button. The selected card from
		your hand, as well as the enemy card in the far right position get discarded to the enemy
		captured pile.
	</p>
	<h3 class="text-2xl font-bold">Sacrifice cards</h3>
	<p>
		Select any 2 cards from your hand and any 1 card from the enemy row, then press the 'Sacrifice
		Cards' button. The 2 selected cards from your hand get discarded to the enemy captured pile. The
		selected enemy card is moved back to the back of the enemy draw deck.
	</p>
	<h2 class="text-5xl font-bold">Winning the Game</h2>
	<p>
		At the end of the Capture Phase, If there are any cards left in the Enemy Draw Deck or the Enemy
		Row, a new round begins. Continue until you win the game or until you get stuck.
	</p>
	<p>
		If there are no more cards left in the Enemy Draw Deck or the Enemy Row at the end of the
		Capture Phase, CONGRATULATONS! You have won the game!
	</p>
</GamePage>
