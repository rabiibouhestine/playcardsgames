<script>
	import Header from '$lib/components/Header.svelte';
	import CardsIcon from '$lib/components/CardsIcon.svelte';

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
	<button class="btn btn-outline"> <CardsIcon /> REQUEST GAME </button>
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
