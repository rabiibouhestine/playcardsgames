<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import ArrowDownIcon from '$lib/components/ArrowDownIcon.svelte';
	import { Game } from '$lib/games/zombiesincastles/Game.js';

	let game;
	let canvas;
	let gameOverModal;

	onMount(() => {
		game = new Game(canvas);
		window.addEventListener('gameOver', handleGameOver);

		return () => {
			game.end();
			window.removeEventListener('gameOver', handleGameOver);
		};
	});

	function handleGameOver() {
		gameOverModal.showModal();
	}

	function restartGame() {
		game.end();
		game = new Game(canvas);
	}
</script>

<div class="flex flex-col h-screen relative bg-emerald-600">
	<Header title="Zombies in Castles" />
	<div class="h-full">
		<div bind:this={canvas} class="h-full" />
	</div>
	<div class="w-full grid justify-items-center absolute bottom-0 select-none text-white">
		<h1 class="text-md font-bold">ABOUT THE GAME</h1>
		<ArrowDownIcon />
	</div>
</div>
<div class="bg-base-100">
	<article class="max-w-screen-md mx-auto py-10">
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
		<h1 class="text-5xl font-bold">Rage Inside Game</h1>
	</article>
</div>
<dialog bind:this={gameOverModal} class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">GameOver</h3>
		<p class="py-4">Press Restart to restart the game</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn" on:click={restartGame}>Restart</button>
			</form>
		</div>
	</div>
</dialog>
