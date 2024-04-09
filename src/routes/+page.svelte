<script>
	import Header from '$lib/components/Header.svelte';
	import GameCard from '$lib/components/GameCard.svelte';

	import regicideSolitaireCover from '$lib/assets/gameIcons/regicideSolitaire.svg';
	import scoundrelCover from '$lib/assets/gameIcons/scoundrel.svg';
	import clearTheDungeonCover from '$lib/assets/gameIcons/clearTheDungeon.svg';
	import merchantSolitaireCover from '$lib/assets/gameIcons/merchantSolitaire.svg';
	import cardCaptureCover from '$lib/assets/gameIcons/cardCapture.svg';
	import area52Cover from '$lib/assets/gameIcons/area52.svg';

	const games = [
		{
			name: 'REGICIDE SOLITAIRE',
			src: regicideSolitaireCover,
			href: '/regicide-solitaire',
			time: 8,
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
			time: 3,
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
		</div>
		<div class="my-10 flex flex-wrap justify-center gap-10 sm:gap-5 max-w-screen-xl mx-auto">
			{#each games as game}
				<GameCard {game} />
			{/each}
		</div>
		<div class="space-y-6 py-10 max-w-screen-lg mx-auto">
			<div id="about" class="flex flex-col gap-4 px-6 text-center items-center">
				<h2 class="text-3xl md:text-4xl font-bold mb-4">About This Website</h2>
				<p>
					The standard deck of cards really doesn't get enough love from the hobby, does it? In
					every home, there is at least one deck of cards. They're affordable, classy, and
					multipurpose. The suits, face cards, and ranks all include interesting patterns that could
					be nicely utilised in creative game design.
				</p>
				<p>
					I believe the standard deck has more to offer than just 'sort cards in a certain way' and
					'red goes here, black goes there'.
				</p>
				<p>
					PlayCardGames.io is a game site focused on modern thematic solitaire card games. My goal
					is to offer a variety of engaging thematic solitaire card games that can be played with
					standard playing cards. I put a lot of effort into making the games straightforward and
					simple to use, and I sincerely hope you love playing them as much as I did creating them.
				</p>
				<p>
					If you enjoyed playing these games and would like to see more, consider supporting the
					project.
				</p>
				<a href="https://www.buymeacoffee.com/rabiibouhestine" target="_blank" class="my-6">
					<img
						src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
						alt="Buy Me A Coffee"
						style="height: 60px !important;width: 217px !important;"
					/>
				</a>
			</div>
		</div>
	</div>
</div>
