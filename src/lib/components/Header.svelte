<script>
	import logo from '$lib/assets/logo.svg';

	export let title = '';

	let theme = 'night';
	let notification = true;
	let exitModal;

	function toggleTheme() {
		if (theme === 'night') {
			theme = 'aqua';
		} else {
			theme = 'night';
		}
	}

	function handleNotification() {
		exitModal.showModal();
		notification = false;
	}
</script>

<div class="bg-base-200 border-b border-base-300 sticky top-0 z-10">
	<div class="navbar max-w-screen-xl mx-auto">
		<div class="navbar-start">
			<a href="/">
				<img src={logo} alt="logo" />
			</a>
		</div>
		<div class="navbar-center lg:flex">
			<h1 class="text-md sm:text-2xl font-bold">{title}</h1>
		</div>
		<div class="navbar-end space-x-4">
			<label class="swap">
				<input type="button" on:click={handleNotification} />
				<div class="indicator">
					{#if notification}
						<span class="indicator-item badge badge-accent">1</span>
					{/if}
					<svg
						viewBox="0 0 24 24"
						class="swap-off fill-current w-8 h-8"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0" /><g id="SVGRepo_tracerCarrier" /><g
							id="SVGRepo_iconCarrier"
						>
							<path
								d="M6.31317 12.463C6.20006 9.29213 8.60976 6.6252 11.701 6.5C14.7923 6.6252 17.202 9.29213 17.0889 12.463C17.0889 13.78 18.4841 15.063 18.525 16.383C18.525 16.4017 18.525 16.4203 18.525 16.439C18.5552 17.2847 17.9124 17.9959 17.0879 18.029H13.9757C13.9786 18.677 13.7404 19.3018 13.3098 19.776C12.8957 20.2372 12.3123 20.4996 11.701 20.4996C11.0897 20.4996 10.5064 20.2372 10.0923 19.776C9.66161 19.3018 9.42346 18.677 9.42635 18.029H6.31317C5.48869 17.9959 4.84583 17.2847 4.87602 16.439C4.87602 16.4203 4.87602 16.4017 4.87602 16.383C4.91795 15.067 6.31317 13.781 6.31317 12.463Z"
							/>
							<path
								d="M9.42633 17.279C9.01212 17.279 8.67633 17.6148 8.67633 18.029C8.67633 18.4432 9.01212 18.779 9.42633 18.779V17.279ZM13.9757 18.779C14.3899 18.779 14.7257 18.4432 14.7257 18.029C14.7257 17.6148 14.3899 17.279 13.9757 17.279V18.779ZM12.676 5.25C13.0902 5.25 13.426 4.91421 13.426 4.5C13.426 4.08579 13.0902 3.75 12.676 3.75V5.25ZM10.726 3.75C10.3118 3.75 9.97601 4.08579 9.97601 4.5C9.97601 4.91421 10.3118 5.25 10.726 5.25V3.75ZM9.42633 18.779H13.9757V17.279H9.42633V18.779ZM12.676 3.75H10.726V5.25H12.676V3.75Z"
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

			<label class="swap swap-rotate">
				<!-- this hidden checkbox controls the state -->
				<input type="checkbox" class="theme-controller" value={theme} on:click={toggleTheme} />

				<!-- sun icon -->
				<svg
					class="swap-on fill-current w-8 h-8"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
					/></svg
				>

				<!-- moon icon -->
				<svg
					class="swap-off fill-current w-8 h-8"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
					/></svg
				>
			</label>
		</div>
	</div>
</div>

<dialog bind:this={exitModal} class="modal">
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
