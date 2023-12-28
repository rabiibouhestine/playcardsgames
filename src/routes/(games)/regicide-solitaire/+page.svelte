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
		Regicide Solitaire is an online version of the single player mode of the card game <Link
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
	<p>
		The face cards (K's, Q's and J's) are shuffled to form the Castle deck. They are shuffled in a
		way that the first 4 cards on top are Jacks (J), the next 4 cards are Queens (Q) and then the 4
		Kings (K).
	</p>
	<p>
		The top card of the Castle Deck is always flipped to reveal the current enemy. After defeating
		an enemy, it gets discarded and the next top card in the Castle Deck is revealed.
	</p>
	<p>
		Numbered cards (A..10) are shuffled to form your Tavern deck. The Tavern deck is where cards are
		dealt and drawn from. During the game, any discarded cards are placed into a discard pile beside
		the Tavern deck. The game starts with 8 cards drawn from the Tavern deck to your hand.
	</p>
	<h2 class="text-5xl font-bold">How to play</h2>
	<p>
		You play cards from your hand to deal damage to the current enemy in order to defeat it. The
		values on the cards determine damage, while the suit provides a special power.
	</p>
	<h3 class="text-2xl font-bold">Hearts</h3>
	<p>
		Attacking with Hearts refills the Tavern deck from the discard pile. The amount of cards
		refilled is equal to the total attack value of the cards you attacked with. Note that the the
		cards refilled are picked randomly from the discard pile.
	</p>
	<h3 class="text-2xl font-bold">Diamonds</h3>
	<p>
		Attacking with Diamonds refills your hand from the Tavern deck. The amount of cards refilled is
		equal to the total attack value of the cards you attacked with. Note that you can only hold a
		maximum of 8 cards in your hand. This effect does not bypass that and only restores cards untill
		your hand is full.
	</p>
	<h3 class="text-2xl font-bold">Clubs</h3>
	<p>Attacking with Clubs doubles the total attack value of the cards you attacked with.</p>
	<h3 class="text-2xl font-bold">Spades</h3>
	<p>
		Attacking with Spades reduces the attack value of the current enemy by the attack value played.
		The shield effects of spades remain in effect until the enemy is defeated.
	</p>
	<h3 class="text-2xl font-bold">Taking Damage</h3>
	<p>
		If not defeated, the enemy attacks you by dealing damage equal to that enemy’s attack value.
		Select cards from your hand to satisfy the enemy's attack. These cards are discarded to the
		discard pile.
	</p>
	<h2 class="text-5xl font-bold">Animal Companions</h2>
	<p>
		Aces (A) are Animal Companions. Animal Companions can be played on their own, but may also be
		paired with one other card. Animal Companions count as 1 towards the attack total and their suit
		power is also applied.
	</p>
	<p>
		For example, when playing the 8 of Diamonds with the Animal Companion of Clubs the attack value
		is 9 and the effects of both suit powers are applied: 9 cards are drawn and 18 damage is dealt.
	</p>
	<p>
		Any time where both a Hearts power and Diamonds power are played together, the Hearts effect is
		resolved before cards are drawn with Diamonds.
	</p>
	<p>
		Animal Companions can also be paired with one other Animal Companion. If you play an Animal
		Companion with another card of the same suit, the suit power is only applied once.
	</p>
	<h2 class="text-5xl font-bold">Combos</h2>
	<p>
		Instead of playing a single card to attack with, you can combine cards together in sets of 2, 3
		or 4 of the same number as long as the combined total of the cards played equals 10 or less.
	</p>
	<p>
		Animal Companions cannot be added to a combo or played as a combo on their own; they can only
		ever be paired with one other card (which could be another Animal Companion).
	</p>
	<p>
		So you can play a pair of 2s, 3s, 4s, or 5s, triple 2s and 3s, or quadruple 2s. When these cards
		are played together all suit powers are resolved at the total attack value.
	</p>
	<p>
		For example, if you play the 3 of Diamonds, Spades and Clubs together, you will draw 9 cards,
		reduce the enemy’s attack value by 9 and deal 18 damage.
	</p>
	<p>
		Any time where both a Hearts power and Diamonds power are resolved together, the Hearts healing
		is resolved before drawing with Diamonds.
	</p>
	<h2 class="text-5xl font-bold">Enemy Immunity</h2>
	<p>
		Each enemy is immune to the suit powers of cards played against them which match their suit. For
		example, you will not draw cards when a diamond is played against the Jack of Diamonds (however
		the number is still added to the damage total).
	</p>
	<h2 class="text-5xl font-bold">Drawing a defeated enemy</h2>
	<p>
		Jacks in hand count as a 10, Queens in hand count as a 15 and Kings in hand count as a 20. These
		values are applied when either playing them as an attack card or discarding them from hand to
		suffer damage. Their suit power is applied as normal when played.
	</p>
	<h2 class="text-5xl font-bold">Playing the Jesters</h2>
	<p>
		A Jester can be flipped to activate the following power: “Your entire hand is discarded and
		refilled to 8 cards by drawing from the Tavern deck - this does not count as drawing for the
		purpose of enemy diamond immunity.” Since you have two Jesters this can be done twice per game.
	</p>
	<p>
		To activate a Jester, simply click on it. If you get into a situation where a play is not
		possible, a Jester will be activated automatically. If no Jesters are available, you lose the
		game.
	</p>
	<h2 class="text-5xl font-bold">Game End</h2>
	<p>
		The game ends when you win by defeating the last King or when you lose because you are unable to
		satisfy the damage dealt by an enemy. You also lose if you are unable to play a card (you have
		no cards in your hand to attack with).
	</p>
	<ul>
		<li>A win having used 2 Jesters = Bronze Victory</li>
		<li>A win having used 1 Jester = Silver Victory</li>
		<li>A win having used 0 Jesters = Gold Victory</li>
	</ul>
</GamePage>
