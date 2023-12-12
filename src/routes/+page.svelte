<script>
	import Header from '$lib/components/Header.svelte';

	import regicideSolitaireCover from '$lib/assets/regicideSolitaire.svg';
	import clearTheDungeonCover from '$lib/assets/clearTheDungeon.svg';
	import scoundrelCover from '$lib/assets/scoundrel.svg';
	import merchantSolitaireCover from '$lib/assets/merchantSolitaire.svg';
	import cardCaptureCover from '$lib/assets/cardCapture.svg';
	import theSandwichGuyCover from '$lib/assets/theSandwichGuy.svg';
	import apples from '$lib/assets/ROTTEN_APPLES.svg';

	const classic = [
		{
			name: 'Klondike',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Freecell',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Spider',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Yukon',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		},
		{
			name: 'Scorpion',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/'
		}
	];

	const games = [
		{
			name: 'Regicide Solitaire',
			src: regicideSolitaireCover,
			href: '/regicide-solitaire',
			time: 5,
			weight: 3.0
		},
		{
			name: 'Scoundrel',
			src: scoundrelCover,
			href: '/scoundrel',
			time: 5,
			weight: 3.0
		},
		{
			name: 'Clear the Dungeon',
			src: clearTheDungeonCover,
			href: '/clear-the-dungeon',
			time: 5,
			weight: 3.0
		},
		{
			name: 'Merchant Solitaire',
			src: merchantSolitaireCover,
			href: '/merchant-solitaire',
			time: 5,
			weight: 3.0
		},
		{
			name: 'Card Capture',
			src: cardCaptureCover,
			href: '/card-capture',
			time: 5,
			weight: 3.0
		},
		{
			name: 'The Sandwich Guy',
			src: theSandwichGuyCover,
			href: '/the-sandwich-guy',
			time: 5,
			weight: 3.0
		},
		{
			name: 'Skyway',
			src: apples,
			href: '/',
			time: 5,
			weight: 3.0
		},
		{
			name: 'Area 52',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/',
			time: 5,
			weight: 3.0
		},
		{
			name: 'Dead Center',
			src: 'https://placehold.co/400x400/grey/white',
			href: '/',
			time: 5,
			weight: 3.0
		}
		// {
		// 	name: 'Boba Tea Shop',
		// 	src: 'https://placehold.co/400x400/grey/white',
		// 	href: '/',
		// 	time: 5,
		// 	weight: 3.00
		// },
		// {
		// 	name: 'Foursquare',
		// 	src: 'https://placehold.co/400x400/grey/white',
		// 	href: '/',
		// 	time: 5,
		// 	weight: 3.00
		// },
		// {
		// 	name: 'Loot The Loop',
		// 	src: 'https://placehold.co/400x400/grey/white',
		// 	href: '/',
		// 	time: 5,
		// 	weight: 3.00
		// },
		// {
		// 	name: 'Syndicate',
		// 	src: 'https://placehold.co/400x400/grey/white',
		// 	href: '/',
		// 	time: 5,
		// 	weight: 3.00
		// },
		// {
		// 	name: 'Hide and Seek',
		// 	src: 'https://placehold.co/400x400/grey/white',
		// 	href: '/',
		// 	time: 5,
		// 	weight: 3.00
		// },
		// {
		// 	name: 'The Emissary',
		// 	src: 'https://placehold.co/400x400/grey/white',
		// 	href: '/',
		// 	time: 5,
		// 	weight: 3.00
		// }
	];
</script>

<div class="bg-cards bg-fixed bg-cover">
	<div class="bg-base-100/90 backdrop-blur-md">
		<Header />
		<div class="grid justify-items-center space-y-6 py-10">
			<h1 class="text-4xl md:text-5xl font-bold">Play Card Games</h1>
			<div>
				<p class="px-6 text-center text-lg">
					Enjoy an amazing collection of modern thematic solitaire card games
				</p>
				<p class="px-6 text-center text-lg">All games can be played with standard playing cards</p>
			</div>
			<nav class="flex flex-wrap justify-center gap-4 font-semibold">
				<a href="#about" class="link link-hover">About Us</a>
				<a href="#faq" class="link link-hover">Frequently Asked Questions</a>
				<a href="#contact" class="link link-hover">Contact</a>
			</nav>
		</div>
		<div class="my-10 flex flex-wrap justify-center gap-10 sm:gap-5 max-w-screen-xl mx-auto">
			{#each games as game}
				<a
					href={game.href}
					class="group w-80 p-2 bg-emerald-600 rounded-lg border-2 border-emerald-600 hover:border-slate-200"
				>
					<div class="h-28 flex justify-center p-2">
						<img src={game.src} alt={game.name} />
					</div>
					<div class="flex justify-between pt-3 border-t-[1px] border-slate-200 text-sm">
						<span class="px-3 py-1 bg-emerald-700 rounded-3xl">{game.time} min</span>
						<span class="px-3 py-1 bg-emerald-700 rounded-3xl">Weight: {game.weight}</span>
					</div>
				</a>
			{/each}
		</div>
		<div class="grid justify-items-center space-y-6 py-10">
			<div id="about" class="px-6 text-center">
				<h2 class="text-4xl md:text-5xl font-bold mb-4">About Us</h2>
				<p>Enjoy an amazing collection of modern thematic solitaire card games</p>
				<p>All games can be played with standard playing cards</p>
			</div>
			<div id="faq" class="px-6 text-center">
				<h2 class="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
				<p>Enjoy an amazing collection of modern thematic solitaire card games</p>
				<p>All games can be played with standard playing cards</p>
			</div>
			<div id="contact" class="px-6 text-center">
				<h2 class="text-4xl md:text-5xl font-bold mb-4">Contact</h2>
				<p>Enjoy an amazing collection of modern thematic solitaire card games</p>
				<p>All games can be played with standard playing cards</p>
			</div>
		</div>
	</div>
</div>
