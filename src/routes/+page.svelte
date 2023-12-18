<script>
	import Header from '$lib/components/Header.svelte';
	import GameCard from '$lib/components/GameCard.svelte';

	import regicideSolitaireCover from '$lib/assets/gameIcons/regicideSolitaire.svg';
	import scoundrelCover from '$lib/assets/gameIcons/scoundrel.svg';
	import clearTheDungeonCover from '$lib/assets/gameIcons/clearTheDungeon.svg';
	import merchantSolitaireCover from '$lib/assets/gameIcons/merchantSolitaire.svg';
	import cardCaptureCover from '$lib/assets/gameIcons/cardCapture.svg';
	import theSandwichGuyCover from '$lib/assets/gameIcons/theSandwichGuy.svg';
	import area52Cover from '$lib/assets/gameIcons/area52.svg';

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
		}
	];

	const games = [
		{
			name: 'REGICIDE SOLITAIRE',
			src: regicideSolitaireCover,
			href: '/regicide-solitaire',
			time: 5,
			weight: 1.94
		},
		{
			name: 'SCOUNDREL',
			src: scoundrelCover,
			href: '/scoundrel',
			time: 5,
			weight: 1.0
		},
		{
			name: 'CLEAR THE DUNGEON',
			src: clearTheDungeonCover,
			href: '/clear-the-dungeon',
			time: 5,
			weight: 1.0
		},
		{
			name: 'MERCHANT SOLITAIRE',
			src: merchantSolitaireCover,
			href: '/merchant-solitaire',
			time: 5,
			weight: 1.0
		},
		{
			name: 'CARD CAPTURE',
			src: cardCaptureCover,
			href: '/card-capture',
			time: 5,
			weight: 1.4
		},
		{
			name: 'AREA 52',
			src: area52Cover,
			href: '/area-52',
			time: 5,
			weight: 1.3
		}
		// {
		// 	name: 'THE SANDWICH GUY',
		// 	src: theSandwichGuyCover,
		// 	href: '/the-sandwich-guy',
		// 	time: 5,
		// 	weight: 1.2
		// },
		// {
		// 	name: 'LOOT THE LOOP',
		// 	src: 'https://placehold.co/400x400/grey/white',
		// 	href: '/',
		// 	time: 5,
		// 	weight: 3.0
		// },
		// {
		// 	name: 'HIDE AND SEEK',
		// 	src: 'https://placehold.co/400x400/grey/white',
		// 	href: '/',
		// 	time: 5,
		// 	weight: 3.0
		// }
	];
</script>

<div class="bg-cards bg-fixed bg-cover">
	<div class="bg-base-100/90 backdrop-blur-md">
		<Header />
		<div class="grid justify-items-center space-y-6 py-10">
			<h1 class="text-4xl md:text-5xl font-black">PLAY CARD GAMES</h1>
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
				<GameCard {game} />
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
