<script>
	import Header from '$lib/components/Header.svelte';

	import regicideSolitaireCover from '$lib/assets/regicideSolitaire.svg';
	import clearTheDungeonCover from '$lib/assets/clearTheDungeon.svg';
	import scoundrelCover from '$lib/assets/scoundrel.svg';
	import merchantSolitaireCover from '$lib/assets/merchantSolitaire.svg';
	import cardCaptureCover from '$lib/assets/cardCapture.svg';

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
			href: '/regicide-solitaire'
		},
		{
			name: 'Clear the Dungeon',
			src: clearTheDungeonCover,
			href: '/clear-the-dungeon'
		},
		{
			name: 'Scoundrel',
			src: scoundrelCover,
			href: '/scoundrel'
		},
		{
			name: 'Merchant Solitaire',
			src: merchantSolitaireCover,
			href: '/merchant-solitaire'
		},
		{
			name: 'Card Capture',
			src: cardCaptureCover,
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
							<h1
								class="card-title text-3xl sm:text-xl transition duration-300 ease-in-out group-hover:text-primary"
							>
								{game.name}
							</h1>
						</div>
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
