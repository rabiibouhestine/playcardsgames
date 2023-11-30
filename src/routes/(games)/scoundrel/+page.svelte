<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/scoundrel/Game.js';
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

<GamePage title="Scoundrel">
	<div bind:this={canvas} class="grow" slot="gameSection" />
	<h1 class="text-5xl font-bold">Scoundrel</h1>
	<p>
		In Clear the Dungeon, you are a monster exterminator hired by the King to rid his castle of
		pesky beasts. As you tread through the dark and dingy dungeon cells, monsters will appear. Beat
		them down with a powerful attack and wipe them out using their weakness against them.
		Exterminate the monsters before running out of power and victory will be yours.
	</p>
	<h2 class="text-4xl font-bold">Materials</h2>
	<p>
		Clear the Dungeon requires a fifty-four card deck: aces up through kings in four suits as well
		as two jokers.
	</p>
	<h2 class="text-4xl font-bold">Setup</h2>
	<p>
		Separate all of the face cards (J’s, Q’s, & K’s) from the deck. These twelve cards are used to
		form the dungeon monster deck. The rest of the cards (A-10, jokers) make up your power deck.
	</p>
	<p>
		Shuffle the dungeon monster deck and deal out four columns face down with three cards in each
		column. Flip the top most card of each column over to reveal the first set of monsters.
	</p>
	<p>Shuffle the power deck and place it face down in front of you.</p>
	<h2 class="text-4xl font-bold">Play</h2>
	<p>Each turn has three phases: draw, attack, & discard.</p>
	<h3 class="text-3xl font-bold">Draw</h3>
	<p>
		Draw three cards from the power deck. These three cards make up your hand. Each card will have
		to be played or discarded before drawing again.
	</p>
	<h3 class="text-3xl font-bold">Attack</h3>
	<p>Each monster type has a different power level: jacks 11, queens 12, and kings 13.</p>
	<p>Decide how you want to play your cards. Place them on the monsters you wish to attack.</p>
	<p>
		Three cards must be used to defeat a dungeon monster. Added together, the first two cards must
		be equal to or more than the monster’s power level. Suit does not matter.
	</p>
	<p>
		The third card is used to finish the attack, and it must match the monster’s suit. Rank does not
		matter.
	</p>
	<p>
		A monster is immediately defeated once the third card is played. Remove the defeated monster
		with the attack cards and place them in your clear pile.
	</p>
	<p>
		For example, if you are attacking a jack of hearts, your first two attack cards must add up to
		11 or more. In order to defeat the monster, your third attack card must be a heart of any rank.
		Once the heart card is played, the monster is defeated.
	</p>
	<h3 class="text-3xl font-bold">Jokers</h3>
	<p>Jokers are worth a power of 10, and they may be any suit needed.</p>
	<h3 class="text-3xl font-bold">Discard</h3>
	<p>
		Any cards that cannot be played (or that you choose not to play) must be discarded prior to
		drawing your next three card hand. Those attack cards are considered misses and must be placed
		face up on the discard pile.
	</p>
	<h3 class="text-3xl font-bold">Reserve Card</h3>
	<p>
		Choose how you discard wisely. The top card on the discard pile is your reserve card. It can be
		played as if it is part of your hand. Once it is played, the next top card of the pile becomes
		your new reserve card.
	</p>
	<h2 class="text-4xl font-bold">Win</h2>
	<p>
		If you defeat all of the monsters before running out of cards in the power deck, you win the
		game.
	</p>
	<p>
		Increase the difficulty level by removing the jokers and/or playing without the reserve card.
	</p>
</GamePage>
