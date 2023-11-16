<script>
	import Header from '$lib/components/Header.svelte';
	import CardsIcon from '$lib/components/CardsIcon.svelte';
	import zombiesInCastlesCover from '$lib/assets/zombiesInCastlesCover.jpg';

	const games = [
		{
			name: 'Zombies in Castles',
			src: zombiesInCastlesCover
		},
		{
			name: 'Scoundrel',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'Clear the Dungeon',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 4',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 5',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 6',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 7',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 8',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 9',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 10',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 6',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 7',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 8',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 9',
			src: 'https://placehold.co/400x400/grey/white'
		},
		{
			name: 'name 10',
			src: 'https://placehold.co/400x400/grey/white'
		}
	];
</script>

<Header />
<div class="grid justify-items-center space-y-6 mt-10">
	<h1 class="text-4xl md:text-5xl font-bold">Play Cards Games</h1>
	<div>
		<p class="px-6 text-center">
			Enjoy an amazing collection of modern solitaire games right from your browser
		</p>
		<p class="px-6 text-center">All games can be played with a standard deck of playing cards</p>
	</div>
	<a href="/contact" class="btn btn-outline"> <CardsIcon /> SUBMIT A GAME </a>
</div>
<div class="my-20 flex flex-wrap justify-center gap-5 max-w-screen-xl mx-auto">
	{#each games as game}
		<a href="/zombies-in-castles" class="group">
			<div
				class="card overflow-hidden w-60 bg-base-200 shadow-xl ease-in-out duration-300 group-hover:scale-105"
			>
				<figure>
					<img src={game.src} alt="Shoes" class="ease-in-out duration-300 group-hover:scale-110" />
				</figure>
				<div class="card-body items-center text-center">
					<h2 class="card-title">{game.name}</h2>
				</div>
				<div
					class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-base-200 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-25"
				/>
			</div>
		</a>
	{/each}
</div>
