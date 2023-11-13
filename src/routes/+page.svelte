<script>
	import Header from '$lib/components/Header.svelte';

	const games = [
		{
			name: 'Rage Inside'
		},
		{
			name: 'name 2'
		},
		{
			name: 'name 3'
		},
		{
			name: 'name 4'
		},
		{
			name: 'name 5'
		},
		{
			name: 'name 6'
		},
		{
			name: 'name 7'
		},
		{
			name: 'name 8'
		},
		{
			name: 'name 9'
		},
		{
			name: 'name 10'
		}
	];
</script>

<Header />
<div class="grid justify-items-center space-y-6 mt-10">
	<h1 class="text-5xl font-bold">Play Cards Games</h1>
	<p>Enjoy amazing solitaire cards games right from your browser</p>
	<button class="btn btn-outline">
		<svg
			class="h-6 w-6"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="100"
			height="100"
			viewBox="0 0 24 24"
		>
			<path
				d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"
			/>
		</svg>
		REQUEST GAME
	</button>
</div>
<div class="p-20 grid grid-cols-5 gap-5 max-w-screen-2xl mx-auto">
	{#each games as game}
		<a href="/rageinside">
			<div class="card w-60 bg-base-100 shadow-xl">
				<figure><img src="https://placehold.co/400x400/grey/white" alt="Shoes" /></figure>
				<div class="card-body items-center text-center">
					<h2 class="card-title">{game.name}</h2>
				</div>
			</div>
		</a>
	{/each}
</div>
