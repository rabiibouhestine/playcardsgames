<script>
	import { onMount } from 'svelte';

	export let title = '';

	let notification = false;
	let exitModal;

	onMount(() => {
		const notifications = localStorage.getItem('notifications');
		if (notifications === null) {
			notification = true;
		}
	});

	function handleNotification() {
		exitModal.showModal();
		notification = false;
		localStorage.setItem('notifications', 1);
	}
</script>

<div class="bg-base-300 border-b border-base-300 sticky top-0 z-10 h-16">
	<div class="navbar max-w-screen-xl mx-auto">
		<div class="navbar-start">
			<a href="/">
				<svg
					class="h-10 fill-current"
					viewBox="0 0 168.65164 180.25536"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g
						transform="matrix(1.4007783,0,0,1.4007783,-32.616649,-525.30316)"
						style="display:inline"
					>
						<path
							d="m 28.576338,387.27379 c -2.931581,0 -5.291677,2.31801 -5.291677,5.19723 v 106.02207 c 0,2.87923 2.360096,5.19724 5.291677,5.19724 h 74.083492 c 2.93158,0 5.29168,-2.31801 5.29168,-5.19724 V 392.47102 c 0,-2.87922 -2.3601,-5.19723 -5.29168,-5.19723 z m 7.71285,6.15308 a 0.81207137,0.72926483 0 0 1 0.547096,0.1911 l 4.010077,3.29476 a 25.813311,23.181141 0 0 1 1.429166,1.33472 5.3003897,4.7599119 0 0 1 0.252705,6.01106 c -0.859168,1.01952 -2.217976,1.4842 -3.508356,1.30189 l -0.08448,-0.0148 0.558902,1.50627 a 0.81207137,0.72926483 0 0 1 -0.674002,0.95512 l -0.09592,0.005 h -4.872594 a 0.81207137,0.72926483 0 0 1 -0.770289,-0.95991 l 0.57329,-1.54464 -0.199951,0.0273 c -1.213232,0.132 -2.471095,-0.26928 -3.292911,-1.14805 l -0.113625,-0.12912 a 5.3012016,4.7606406 0 0 1 0.254919,-6.0129 c 0.456384,-0.46162 0.932245,-0.90639 1.440602,-1.34395 a 1132.8923,1017.3719 0 0 1 3.997903,-3.28443 v 7.4e-4 a 0.81207137,0.72926483 0 0 1 0.547466,-0.19036 z m 29.331109,25.32878 a 2.977595,2.673971 0 0 1 2.006513,0.7002 l 14.703369,12.08114 a 94.648805,84.997516 0 0 1 5.240399,4.89325 19.434762,17.45301 0 0 1 0.925969,22.0414 c -3.150284,3.73824 -8.131842,5.44186 -12.863233,4.77336 l -0.309518,-0.0535 2.04857,5.52151 a 2.977595,2.673971 0 0 1 -2.471343,3.50282 l -0.351573,0.0188 H 56.684134 a 2.977595,2.673971 0 0 1 -2.825868,-3.51868 l 2.102062,-5.66354 -0.73229,0.0989 c -4.448521,0.48398 -9.060807,-0.98679 -12.074131,-4.20892 l -0.416871,-0.47332 A 19.437739,17.455682 0 0 1 43.67186,436.4225 c 1.673407,-1.6926 3.418479,-3.32393 5.282455,-4.9283 a 4153.9384,3730.3636 0 0 1 14.65873,-12.04351 v 0.002 a 2.977595,2.673971 0 0 1 2.007252,-0.69725 z m 27.066356,64.37151 h 4.872594 a 0.81207138,0.72926483 0 0 1 0.770657,0.95954 l -0.573289,1.54463 0.199581,-0.0269 c 1.213233,-0.132 2.471094,0.26892 3.292914,1.14769 l 0.11362,0.12912 a 5.3012016,4.7606406 0 0 1 -0.25492,6.0129 c -0.45638,0.46162 -0.93224,0.90639 -1.440599,1.34395 a 1132.8924,1017.3719 0 0 1 -3.997902,3.28479 v -7.3e-4 a 0.81207138,0.72926483 0 0 1 -1.094563,-0.001 l -4.010076,-3.29476 a 25.813311,23.181141 0 0 1 -1.429167,-1.33435 5.3003897,4.7599119 0 0 1 -0.252704,-6.01143 c 0.859168,-1.01952 2.217976,-1.4842 3.508355,-1.30189 l 0.08448,0.0148 -0.558902,-1.5059 a 0.81207138,0.72926483 0 0 1 0.674003,-0.95549 z"
						/>
						<path
							style="stroke-width:1.40078"
							d="m 103.61873,590.41804 c -2.35988,0.14524 -4.584752,1.41677 -5.845117,3.59978 l -4.523234,7.83466 H 125.9042 l -18.07125,-10.43346 c -1.33363,-0.76997 -2.79828,-1.08812 -4.21422,-1.00098 z m 53.92126,29.69948 1e-5,107.58 42.94363,-74.38047 c 2.01658,-3.49283 0.77664,-7.95753 -2.77968,-10.01077 z"
							transform="matrix(0.71388885,0,0,0.71388885,-0.12983318,-46.474833)"
						/>
					</g>
				</svg>
			</a>
		</div>
		<div class="navbar-center lg:flex">
			<h1 class="text-md sm:text-2xl font-black">{title}</h1>
		</div>
		<div class="navbar-end space-x-4">
			<label class="swap">
				<input type="button" on:click={handleNotification} />
				<div class="indicator">
					{#if notification}
						<span class="indicator-item badge badge-accent">1</span>
					{/if}
					<svg viewBox="0 0 24 24" class="fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						/><g id="SVGRepo_iconCarrier">
							<path
								d="M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z"
							/>
							<path
								d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z"
							/>
						</g></svg
					>
				</div>
			</label>
			<label class="swap">
				<!-- this hidden checkbox controls the state -->
				<input type="checkbox" />

				<!-- volume on icon -->
				<svg
					class="swap-off fill-current w-8 h-8"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
					/></svg
				>

				<!-- volume off icon -->
				<svg
					class="swap-on fill-current w-8 h-8"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"
					/></svg
				>
			</label>
		</div>
	</div>
</div>

<dialog bind:this={exitModal} class="modal backdrop-blur-md">
	<div class="modal-box max-w-screen-md">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="flex flex-col justify-center items-center text-center">
			<h1 class="text-5xl font-bold">Be the first to play new games</h1>
			<p class="py-6">
				Be the first to play new games, get notified whenever we release a new game.
			</p>
			<form class="card-body">
				<div class="form-control">
					<input
						id="email"
						type="email"
						placeholder="email"
						class="input input-bordered"
						required
					/>
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-primary">Subscribe</button>
				</div>
			</form>
		</div>
	</div>
</dialog>
