<script>
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	let exitModal;

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	onMount(() => {
		document.addEventListener('mouseleave', () => {
			exitModal.showModal();
		});
	});
</script>

<div class="bg-cards bg-fixed bg-cover">
	<div class="min-h-screen bg-base-100 bg-opacity-90 backdrop-blur-sm">
		<slot />

		<footer
			class="footer footer-center p-10 bg-base-200 text-base-content rounded sticky top-[100vh]"
		>
			<nav class="flex flex-wrap justify-center gap-4">
				<a href="/about" class="link link-hover">About us</a>
				<a href="/terms" class="link link-hover">Terms of use</a>
				<a href="/privacy" class="link link-hover">Privacy policy</a>
				<a href="/disclaimer" class="link link-hover">Disclaimer</a>
				<a href="/contact" class="link link-hover">Contact</a>
			</nav>
			<aside>
				<p>Copyright © 2023 - All rights reserved by playcards.games</p>
			</aside>
		</footer>
	</div>
</div>

<dialog bind:this={exitModal} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="flex flex-col justify-center items-center text-center">
			<h1 class="text-5xl font-bold">Be the first to play new games</h1>
			<p class="py-6">
				We would love for you to play our games as soon as they release, get notified whenever we
				release a new game.
			</p>
			<form class="card-body">
				<div class="form-control">
					<input
						id="email"
						type="email"
						placeholder="email"
						class="input input-bordered"
						required
					/>
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-primary">Subscribe</button>
				</div>
			</form>
		</div>
	</div>
</dialog>
