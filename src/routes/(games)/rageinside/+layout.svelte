<script>
	import Header from '$lib/components/Header.svelte';
</script>

<Header>
	<ul slot="navbar-center-desktop" class="menu menu-horizontal px-1 py-0">
		<li><a href="play">Play</a></li>
		<li><a href="ruleset">Rules</a></li>
	</ul>
</Header>

<slot />
