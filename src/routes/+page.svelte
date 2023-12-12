<script>
	import Header from '$lib/components/Header.svelte';

	import regicideSolitaireCover from '$lib/assets/regicideSolitaire.svg';
	import clearTheDungeonCover from '$lib/assets/clearTheDungeon.svg';
	import scoundrelCover from '$lib/assets/scoundrel.svg';
	import merchantSolitaireCover from '$lib/assets/merchantSolitaire.svg';
	import cardCaptureCover from '$lib/assets/cardCapture.svg';
	import theSandwichGuyCover from '$lib/assets/theSandwichGuy.svg';
	import fourSquare from '$lib/assets/fourSquare.svg';
	import ninja from '$lib/assets/gameIcons/scoundrel.svg';

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
			name: 'REGICIDE SOLITAIRE',
			src: regicideSolitaireCover,
			href: '/regicide-solitaire',
			time: 5,
			weight: 3.0
		},
		{
			name: 'SCOUNDREL',
			src: scoundrelCover,
			href: '/scoundrel',
			time: 5,
			weight: 3.0
		},
		{
			name: 'CLEAR THE DUNGEON',
			src: clearTheDungeonCover,
			href: '/clear-the-dungeon',
			time: 5,
			weight: 3.0
		},
		{
			name: 'MERCHANT SOLITAIRE',
			src: merchantSolitaireCover,
			href: '/merchant-solitaire',
			time: 5,
			weight: 3.0
		},
		{
			name: 'CARD CAPTURE',
			src: cardCaptureCover,
			href: '/card-capture',
			time: 5,
			weight: 3.0
		},
		{
			name: 'THE SANDWICH GUY',
			src: theSandwichGuyCover,
			href: '/the-sandwich-guy',
			time: 5,
			weight: 3.0
		},
		{
			name: 'SKYWAY',
			src: fourSquare,
			href: '/',
			time: 5,
			weight: 3.0
		},
		{
			name: 'AREA 52',
			src: fourSquare,
			href: '/',
			time: 5,
			weight: 3.0
		},
		{
			name: 'DEAD CENTER',
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
				<a
					href={game.href}
					class="group w-80 p-2 bg-emerald-600 rounded-lg border-2 border-emerald-600 hover:border-slate-200"
				>
					<div
						class="flex flex-col justify-center items-center gap-y-2 h-28 flex justify-center text-white"
					>
						<img src={ninja} alt={game.name} class="h-10" />
						<h2 class="font-black text-2xl">{game.name}</h2>
					</div>
					<div class="flex justify-between pt-3 border-t-[1px] border-slate-200 text-sm">
						<span class="flex flex-nowrap items-center gap-2 px-3 py-1 bg-emerald-700 rounded-3xl">
							<svg
								class="fill-current w-4 h-4"
								viewBox="0 0 24 24"
								id="Layer_1"
								data-name="Layer 1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="SVGRepo_bgCarrier" stroke-width="0" />
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
								<g id="SVGRepo_iconCarrier">
									<path
										d="M24,12A12,12,0,0,1,0,12a1,1,0,0,1,2,0A10,10,0,1,0,12,2a1,1,0,0,1,0-2A12.013,12.013,0,0,1,24,12ZM10.277,11H8a1,1,0,0,0,0,2h2.277A1.994,1.994,0,1,0,13,10.277V7a1,1,0,0,0-2,0v3.277A2,2,0,0,0,10.277,11ZM1.827,8.784a1,1,0,1,0-1-1A1,1,0,0,0,1.827,8.784ZM4.221,5.207a1,1,0,1,0-1-1A1,1,0,0,0,4.221,5.207ZM7.779,2.841a1,1,0,1,0-1-1A1,1,0,0,0,7.779,2.841Z"
									/>
								</g>
							</svg>
							{game.time} min</span
						>
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
