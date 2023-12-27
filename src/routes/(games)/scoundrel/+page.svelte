<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/apps/scoundrel/Game.js';
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

<GamePage title="SCOUNDREL">
	<div bind:this={canvas} class="grow" slot="gameSection" />
	<h2 class="text-5xl font-bold">Scoundrel</h2>
	<p>
		Scoundrel is a single player rogue-like card game for use with a standard deck of playing cards.
		It was designed by <Link href="https://boardgamegeek.com/boardgamedesigner/60260/zach-gage"
			>Zach Gage</Link
		> and <Link href="https://boardgamegeek.com/boardgamedesigner/12161/kurt-bieg">Kurt Bieg</Link>.
		You can download the rules of the game in a <Link
			href="https://boardgamegeek.com/boardgame/191095/scoundrel/files">free pdf file</Link
		> on BoardGameGeek.com.
	</p>
	<h2 class="text-5xl font-bold">Setup</h2>
	<p>
		Jokers, Red Face Cards and Red Aces are not included in the game. The remaining cards are
		shuffled to form the Dungeon, and you start the game with a health of 20, and no cards in your
		hand.
	</p>
	<h2 class="text-5xl font-bold">Rules</h2>
	<p>
		The 26 Clubs and Spades in the deck are Monsters. Their damage is equal to their ordered value.
	</p>
	<p>(e.g. 10 is 10, Jack is 11, Queen is 12, King is 13, and Ace is 14)</p>
	<p>
		The 9 Diamonds in the deck are Weapons. Each weapon does as much damage as its value. All
		weapons in Scoundrel are binding, meaning if you pick one up, you must equip it, and discard
		your previous weapon.
	</p>
	<p>
		The 9 Hearts in the deck are Health Potions. You may only use one health potion each turn, even
		if you pull two. The second potion you pull is simply discarded. You may not restore your life
		beyond your starting 20 health.
	</p>
	<p>
		The Game ends when either your life reaches 0 or you make your way through the entire Dungeon.
	</p>
	<h2 class="text-5xl font-bold">Gameplay</h2>
	<p>
		On every turn, cards are flipped off the top of the deck, one by one, until there are 4 cards
		face up to make a Room.
	</p>
	<p>
		You may avoid the Room if you wish. If you chose to do so, all four cards in the current room
		are placed at the bottom of the Dungeon. While you may avoid as many Rooms as you want, you may
		not avoid two Rooms in a row.
	</p>
	<p>
		If you choose not to avoid the Room, one by one, you must face 3 of the four cards it contains.
	</p>
	<p>
		Once you have chosen 3 cards (such that only one remains), your turn is complete. 3 other cards
		will be drawn from the Dungeon to signal moving to the next room.
	</p>
	<h3 class="text-2xl font-bold">Picking a weapon</h3>
	<p>
		Picking a weapon will equip it. It will be placed face up in your 'Tableau'. If you had a
		previous Weapon equipped, the weapon and any monsters on it will be discarded to the discard
		pile.
	</p>
	<h3 class="text-2xl font-bold">Healing</h3>
	<p>
		Healing will add the value of the selected card to your health, and than discard it. Your health
		does not exceed 20, and you may not use more than one Health Potion per turn. If you take two
		Health Potions on a single turn, the second is simply discarded, adding nothing to your health.
	</p>
	<h3 class="text-2xl font-bold">Fighting Monsters</h3>
	<p>You can either fight monsters barehanded or with an equipped Weapon.</p>
	<p>
		If you choose to fight the monster barehanded, its full value is substracted from your health,
		and the monster is moved to the discard pile.
	</p>
	<p>
		If you choose to fight the monster with your equipped weapon, the monster is placed face up on
		top of the weapon (and on top of any other monsters on the weapon). The weapon's current value
		is subtracted from the monster's value and any remaining value is substracted from your health.
	</p>
	<p>
		Your weapon is retained until it is replaced by another. Once a weapon is used on a monster, the
		weapon can only be used to slay monsters of a lower value than the previous monster it had
		slain.
	</p>
	<h2 class="text-5xl font-bold">Game End</h2>
	<p>
		If your life has reached zero, the values of all the remaining monsters in the Dungeon are
		subtracted from your health, this negative value is your score.
	</p>
	<p>
		If you have made your way through the entire Dungeon, your score is your positive health, or if
		your health is 20, and your last card was a health potion, your health + the value of that
		potion.
	</p>
</GamePage>
