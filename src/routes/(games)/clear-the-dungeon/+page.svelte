<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/apps/clearTheDungeon/Game.js';
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

<GamePage title="CLEAR THE DUNGEON">
	<div bind:this={canvas} class="grow" slot="gameSection" />
	<h1 class="text-5xl font-bold">Clear the Dungeon</h1>
	<p>
		Clear the Dungeon is a solitaire card game designed by <Link
			href="https://boardgamegeek.com/boardgamedesigner/136705/mark-s-ball">Mark S Ball</Link
		>
		and published by
		<Link href="https://www.riffleshuffleandroll.com/">Riffle Shuffle & Roll</Link>. If you enjoy
		the game, consider <Link href="https://www.buymeacoffee.com/marksball"
			>buying the designer a cup of coffee</Link
		>.
	</p>
	<p>
		You can <Link href="https://www.youtube.com/watch?v=GbEkAfCqfTM"
			>watch Mark explain the rules of the game on Youtube</Link
		>.
	</p>
	<h2 class="text-5xl font-bold">Overview</h2>
	<p>
		In Clear the Dungeon, the King has appointed you as a monster exterminator to eradicate
		unwelcome creatures from his castle. Monsters will come as you move through the gloomy and dark
		dungeon chambers. Use their vulnerability to your advantage and dispatch them with a strong
		blow.You will win if you destroy the creatures before your power runs out.
	</p>
	<h2 class="text-5xl font-bold">Setup</h2>
	<p>The 12 face cards (J’s, Q’s, & K’s) form the dungeon monster deck.</p>
	<p>The rest of the cards (A-10, jokers) make up your power deck.</p>
	<p>
		The dungeon monster deck is shuffled and dealt over 3 columns face down with 4 cards in each
		column. The top most card of each column is flipped over to reveal the first set of monsters.
	</p>
	<p>The power deck is shuffled and placed in the Draw Pile at the bottom left of the screen.</p>
	<h2 class="text-5xl font-bold">Rules</h2>
	<p>
		The game is played in rounds. At the start of each round, 3 cards are drawn from the Draw Pile.
	</p>
	<p>You must play all 3 cards before another 3 cards are drawn.</p>
	<p>To attack a monster, drag and drop a card from your hand to the monster's column.</p>
	<p>
		To defeat a dungeon monster, you need to use three cards. The total of the first two cards must
		match or exceed the power level of the monster. It doesn't matter what the suit is.
	</p>
	<p>
		The third card is used to finish the attack, and it must match the monster’s suit. Rank does not
		matter.
	</p>
	<p>
		A monster is immediately defeated once the third card is played. The defeated monster will then
		be discarded to the Defeated Monsters Pile, and the next card in the monster's column will be
		flipped. The cards used in the attack will be discarded to the Discarded Pile.
	</p>
	<p>
		You can also discard any cards that cannot be played (or that you choose not to play). These
		cards get discarded to the Reserve Pile.
	</p>
	<p>
		Choose how you discard wisely. The top card in the Reserve Pile is your reserve card. It can be
		played as if it is part of your hand. Once it is played, the next top card of the pile becomes
		your new reserve card.
	</p>
	<h2 class="text-5xl font-bold">Game End</h2>
	<p>
		If you defeat all of the monsters before running out of cards in the power deck, you win the
		game.
	</p>
</GamePage>
