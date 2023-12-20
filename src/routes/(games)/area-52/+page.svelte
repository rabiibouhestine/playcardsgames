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
		Merchant Solitaire is a solitaire card game designed by <Link
			href="https://greggjewell.itch.io/">Gregg Jewell</Link
		>. All you need to play is a standard deck of playing cards and a copy of <Link
			href="https://greggjewell.itch.io/merchants-solitaire">the game rules</Link
		>. You can <Link href="https://www.youtube.com/watch?v=Q6zZw1PA5J4"
			>watch Gregg explain the rules of the game on Youtube</Link
		>, or play the digital version of the game above by following the rules explained here.
	</p>
	<h2 class="text-5xl font-bold">Overview</h2>
	<p>
		In Merchant's Solitaire, you take on the part of an aspiring merchant attempting to earn fame by
		providing the rarest and most distinctive goods to a diverse range of customers. You must match
		a customer's offer with an equivalent amount of merchandise from your shop to complete a trade.
		Making fair trades with each customer you encounter will help you build a great reputation, but
		if you don't, your reputation will be tarnished.
	</p>
	<h2 class="text-5xl font-bold">Setup</h2>
	<p>The game is played with a standard deck of playing cards with no jokers.</p>
	<p>
		The 12 face cards of Jacks (J), Queens (Q), and Kings (K) are shuffled together and placed face
		up in the Customers pile to form the Line.
	</p>
	<p>
		The top faceup card of the Line is always the current Customer. During the game, satisfied
		customers are placed in a pile to the left of the line.
	</p>
	<p />
	<p>
		The 40 cards numbered Ace (A) to 10 are shuffled together and placed face down in the Items
		pile. During the game, discarded Items are placed face up into the Traded Items pile. Whenever
		the Items pile is depleated, the Traded Items pile is shuffled and placed in the Items pile.
	</p>
	<p>
		The Shop is initially formed by 10 drawn items from the Items pile. During the game, after each
		successful trade, the shop gets restocked with 3 drawn cards from the Items pile.
	</p>
	<p>The goal of the game is to make successful trades with all 12 customers in the line.</p>
	<h2 class="text-5xl font-bold">Rules</h2>
	<h3 class="text-2xl font-bold">Customer’s Offer</h3>
	<p>Each customer has an item to trade and a set amount of money.</p>
	<p>Jacks (J) have $11, Queens (Q) have $12 and Kings (K) have $13.</p>
	<p>The value of the customer's offered Aces (A) is always $11.</p>
	<p>The customer’s trade value is the sum of their money and the value of the offered item.</p>
	<p>A K♠ offering a 3♠, for instance, has an offer of $16.</p>
	<h3 class="text-2xl font-bold">Your Offer's value</h3>
	<p>
		The trade value of items in the shop that match the suit of the current customer's offered item
		is $0.
	</p>
	<p>
		The trade value of Aces (A) in the Shop can be worth either $1 (On Sale) or $11 at your
		discretion.
	</p>
	<p>Your offer's trade value is the sum of the trade values of 3 selected items.</p>
	<h3 class="text-2xl font-bold">Successful Trades</h3>
	<p>
		A trade is successful if the trade value of the current customer's offer is equal to the
		combined worth of 3 selected items from the shop. In that case, the customer will leave happy.
	</p>
	<p>
		If it’s impossible to match the current customer’s offer based on the combination of items in
		the shop, your reputation crumbles! Restart the game and try again, we believe in you :)
	</p>
	<h2 class="text-5xl font-bold">Tips</h2>
	<p>Make sure to take advantage of the Aces (A) dynamic trade value.</p>
	<p>
		If you can match a customer's offer with only 2 items, no worries, just give them a third item
		that matches the suit of their offered item. Remember, an item that matches the suit of the
		customer's offer has a trade value of $0, but you can still offer it anyways.
	</p>
</GamePage>
