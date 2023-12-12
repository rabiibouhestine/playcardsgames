<script>
	import logo from '$lib/assets/logo.svg';

	export let title = '';

	let notification = true;
	let exitModal;

	function handleNotification() {
		exitModal.showModal();
		notification = false;
	}
</script>

<div class="bg-base-200 border-b border-base-300 sticky top-0 z-10 h-16">
	<div class="navbar max-w-screen-xl mx-auto">
		<div class="navbar-start">
			<a href="/">
				<img src={logo} alt="logo" />
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
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="flex flex-col justify-center items-center text-center">
			<h1 class="text-5xl font-bold">Be the first to play new games</h1>
			<p class="py-6">
				We would love for you to play our games as soon as they release, get notified whenever we
				release a new game.
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
