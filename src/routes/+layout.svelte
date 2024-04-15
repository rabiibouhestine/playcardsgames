<script>
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Analytics from '$lib/components/Analytics.svelte';

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

<svelte:head>
	<script
		data-name="BMC-Widget"
		data-cfasync="false"
		src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
		data-id="rabiibouhestine"
		data-description="Support me on Buy me a coffee!"
		data-message=""
		data-color="#5F7FFF"
		data-position="Right"
		data-x_margin="18"
		data-y_margin="18"
	></script>
</svelte:head>

<Analytics />
<div class="min-h-screen bg-base-100">
	<slot />

	<footer
		class="footer footer-center p-10 bg-base-300 text-base-content rounded sticky top-[100vh] gap-y-8"
	>
		<nav class="flex flex-wrap justify-center gap-4">
			<a href="/terms" class="link link-hover">Terms of use</a>
			<a href="/privacy" class="link link-hover">Privacy policy</a>
			<a href="/disclaimer" class="link link-hover">Disclaimer</a>
		</nav>
		<p class="flex">
			Made with <span class="text-pink-400">♡</span> by
			<a href="https://rabiibouhestine.com" target="_blank" class="text-blue-300 link link-hover"
				>Rabii Bouhestine</a
			>
		</p>
	</footer>
</div>
