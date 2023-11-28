<script>
	import '../app.css';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="bg-cards bg-fixed bg-cover">
	<div class="min-h-screen bg-base-100/90 backdrop-blur-sm">
		<slot />

		<footer
			class="footer footer-center p-10 bg-base-200 text-base-content rounded sticky top-[100vh] gap-y-8"
		>
			<nav class="flex flex-wrap justify-center gap-4">
				<a href="/terms" class="link link-hover">Terms of use</a>
				<a href="/privacy" class="link link-hover">Privacy policy</a>
				<a href="/disclaimer" class="link link-hover">Disclaimer</a>
				<a href="/contact" class="link link-hover">Contact</a>
			</nav>
			<p>Copyright © 2023 - All rights reserved by playcardgames.io</p>
		</footer>
	</div>
</div>
