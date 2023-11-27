<script>
	import Header from '$lib/components/Header.svelte';
	import CardsIcon from '$lib/components/CardsIcon.svelte';

	import zombiesInCastlesCover from '$lib/assets/zombiesRegicide.svg';
	import clearTheDungeonCover from '$lib/assets/clearTheDungeon.svg';
	import scoundrelCover from '$lib/assets/scoundrel.svg';

	const games = [
		{
			name: 'Zombies Regicide',
			src: zombiesInCastlesCover,
			href: '/zombies-regicide'
		},
		{
			name: 'Clear the Dungeon',
			src: clearTheDungeonCover,
			href: '/clear-the-dungeon'
		},
		{
			name: 'Scoundrel',
			src: scoundrelCover,
			href: '/'
		},
		{
			name: 'Merchant Solitaire',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Card Capture',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Skyway',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Sandwich Guy',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Area 52',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Dead Center',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Boba Tea Shop',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Foursquare',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Loot The Loop',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Syndicate',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Hide and Seek',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'The Emissary',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		}
	];
</script>

<Header />
<div class="grid justify-items-center space-y-6 mt-10 text-slate-200">
	<h1 class="text-4xl md:text-5xl font-bold">Play Cards Games</h1>
	<div>
		<p class="px-6 text-center">
			Enjoy an amazing collection of modern solitaire card games right from your browser
		</p>
		<p class="px-6 text-center">All games can be played with a standard deck of playing cards</p>
	</div>
	<a href="/contact" class="btn btn-outline text-slate-200 border-slate-200">
		<CardsIcon /> REQUEST A GAME
	</a>
</div>
<div class="my-20 flex flex-wrap justify-center gap-10 sm:gap-5 max-w-screen-xl mx-auto">
	{#each games as game}
		<a href={game.href} class="group">
			<div
				class="card overflow-hidden w-80 sm:w-60 bg-base-100 shadow-xl ease-in-out duration-300 group-hover:scale-105"
			>
				<figure>
					<img
						src={game.src}
						alt={game.name}
						class="ease-in-out duration-300 group-hover:scale-110"
					/>
				</figure>
				<div class="card-body items-center text-center">
					<h1 class="card-title">{game.name}</h1>
				</div>
				<div
					class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-secondary bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-25"
				/>
			</div>
		</a>
	{/each}
</div>
