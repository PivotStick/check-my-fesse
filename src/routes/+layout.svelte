<script>
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import "../app.scss";
</script>

<div class="layout">
	<nav>🍑</nav>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.layout {
		height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
		overflow: hidden;

		nav {
			background-color: var(--color-700);
			color: var(--on-color-700);
			padding: 1rem;

			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 2rem;
			padding-top: env(safe-area-inset-top);
		}

		main {
			overflow: auto;
			padding-bottom: env(safe-area-inset-bottom);
		}
	}
</style>
