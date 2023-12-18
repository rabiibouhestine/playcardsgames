<script>
	import Header from './Header.svelte';

	export let title;
</script>

<Header {title} />
<div>
	<div class="flex flex-col h-[calc(100vh-4rem)] relative bg-emerald-600">
		<div class="flex flex-col h-full">
			<slot name="gameSection" />
			<div class="flex justify-center">
				<svg
					fill="#FFFFFF"
					class="w-7 h-7"
					viewBox="0 -6 524 524"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0" />
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
					<g id="SVGRepo_iconCarrier">
						<title>down</title>
						<path d="M64 191L98 157 262 320 426 157 460 191 262 387 64 191Z" />
					</g>
				</svg>
			</div>
		</div>
	</div>
	<div class="bg-base-100">
		<article class="max-w-screen-md mx-auto py-10 px-4 flex flex-col gap-y-3">
			<slot />
		</article>
	</div>
</div>
