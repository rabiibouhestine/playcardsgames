<script>
	import '../app.css';
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
				<a href="/credits" class="link link-hover">Credits</a>
				<a href="/contact" class="link link-hover">Contact</a>
			</nav>
			<aside>
				<p>Copyright © 2023 - All right reserved by playcards.games</p>
			</aside>
		</footer>
	</div>
</div>
