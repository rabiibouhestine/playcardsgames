<script>
	import { onMount } from 'svelte';
	import { Game } from '$lib/games/apps/area52/Game.js';
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

<GamePage title="AREA 52">
	<div bind:this={canvas} class="grow" slot="gameSection" />
	<h2 class="text-5xl font-bold">Area 52</h2>
	<p>
		<Link href="https://boardgamegeek.com/boardgame/362543/area-52">Area 52</Link> is one of 10 modern
		solitaire card games designed by <Link href="https://boardgamegeek.com/user/inaytaobako"
			>Wil Su</Link
		>. All 10 games can be played with standard playing cards and are very well documented by Wil Su
		in a <Link href="https://drive.google.com/file/d/1DB2YF46s0oVFUSIpR9vxoGIbhpTKz2jw/view"
			>free-to-download document</Link
		>. If you have any comments or feedbacks on Area 52 (or any of the other games in the document),
		the best place to reach Wil is the <Link
			href="https://boardgamegeek.com/thread/2587399/isaludo-ten-new-solo-card-games-playable-standard/page/1"
			>One Player Guild thread on BoardGameGeek.com</Link
		>.
	</p>
	<h2 class="text-5xl font-bold">Overview</h2>
	<p>
		To repel an alien invasion, you must lead a team of elite soldiers. The aliens will launch two
		waves of attacks. The second wave will be stronger and more brutal than the first. To win the
		game, you need to successfully repel both waves without running out of resources. It's crucial
		to maintain a diverse and well-dispersed defense force to effectively fend off the intruders.
	</p>
	<h2 class="text-5xl font-bold">Setup</h2>
	<p>The game is played with a standard deck of playing cards with no jokers.</p>
	<p>
		The red cards are shuffled together and placed face down in the Aliens pile to form the first
		wave.
	</p>
	<p>The black cards are shuffled together and placed face down in the Defenders pile.</p>
	<p>The game starts with 3 aliens revealed and 6 defenders drawn from the Defenders pile.</p>
	<p>
		Aces (A) are worth 1, while Jacks (J), Queens (Q) and Kings (K) are worth 11, 12, and 13
		respectively.
	</p>
	<h2 class="text-5xl font-bold">Rules</h2>
	<p>
		The game is played over a series of turns. Each turn, three new aliens are revealed, to be
		defeated (or avoided) one at a time. The card on top is always the current attacker.
	</p>
	<p>
		One at a time, in order, choose to engage the current attacker via either a dual attack, a
		single attack, or a sacrifice.
	</p>
	<h3 class="text-2xl font-bold">Dual Attack</h3>
	<p>
		Choose two defenders whose sum adds up exactly to the attacker’s value. The attacker gets
		discarded, and any defender that matches the attacker's color is also discarded. Fallen
		defenders get replaced by drawing from the defenders pile.
	</p>
	<h3 class="text-2xl font-bold">Single Attack</h3>
	<p>
		Choose a defender with a greater value and opposite color from the attacker. Your defender gets
		discarded and replaced with the attacker. Your soldier was hurt in the fight, it now has a lower
		value.
	</p>
	<h3 class="text-2xl font-bold">Sacrifice</h3>
	<p>
		If you cannot or do not want to defeat the invader via an attack, choose a defender and
		sacrifice it. The defender gets discarded and the current attacker gets moved to the back of the
		alien deck face down. Another defender is drawed to replace the sacrificed defender.
	</p>
	<h3 class="text-2xl font-bold">Second Wave</h3>
	<p>
		Once you’ve defeated all cards in the Aliens deck, the discard pile is shuffled and moved to
		form a second wave of attack. Remember that all cards are discarded to the same pile, including
		defenders! The second wave will therefore have a greater number of aliens, having both black and
		red cards.
	</p>
	<h2 class="text-5xl font-bold">Game End</h2>
	<p>
		If you run out of defenders on the board, you lose the game. Your score is negative of the
		number of cards left in the alien deck, including all face-up attackers. If you’re somehow still
		on the first wave. 50 is substracted from the score.
	</p>
</GamePage>
