<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="min-h-screen">
	<Header />

	<slot />

	<footer
		class="footer footer-center p-10 bg-base-200 text-base-content rounded sticky top-[100vh]"
	>
		<nav class="grid grid-flow-col gap-4">
			<a href="/" class="link link-hover">About us</a>
			<a href="/" class="link link-hover">Terms of use</a>
			<a href="/" class="link link-hover">Privacy policy</a>
			<a href="/" class="link link-hover">Disclaimer</a>
			<a href="/" class="link link-hover">Credits</a>
			<a href="/" class="link link-hover">Contact</a>
		</nav>
		<aside>
			<p>Copyright © 2023 - All right reserved by playcards.games</p>
		</aside>
	</footer>
</div>
