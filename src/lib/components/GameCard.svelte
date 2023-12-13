<script>
	export let game;
</script>

<a
	href={game.href}
	class="group w-80 p-2 bg-emerald-600 rounded-lg border-2 border-emerald-500 hover:border-slate-200"
>
	<div
		class="flex flex-col justify-center items-center gap-y-2 h-28 flex justify-center ease-in-out duration-300 group-hover:scale-105"
	>
		<img src={game.src} alt={game.name} class="h-10" />
		<h2 class="font-black text-white text-2xl">{game.name}</h2>
	</div>
	<div
		class="flex justify-between pt-3 border-t-[1px] border-slate-200 font-semibold text-emerald-100 text-sm"
	>
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
		<span class="px-3 py-1 bg-emerald-700 rounded-3xl">
			Weight: {game.weight.toFixed(2)}
		</span>
	</div>
</a>
