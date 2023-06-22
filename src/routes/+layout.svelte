<script>
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import "../app.scss";
	import { faces } from "$lib/stores/faces";

	let emojies = [
		"🍑",
		"🍌",
		"🍓",
		"🍉",
		"🥑",
		"🍅",
		"🥝",
		"🍇",
		"🍒",
		"🍋",
		"🍏",
		"🧃",
		"🥭",
		"🍐",
		"🍍",
		"🍎",
		"🍊",
		"🍈",
		"🫐",
		"🥥",
		"🥤",
		"🍣",
		"🦪",
		"🦐",
		"🦞",
		"🐙",
		"🍤",
		"🦀",
		"🐟",
		"🦑",
		"🍱"
	];
</script>

<div class="layout">
	<nav>
		<div class="logo">{emojies[Math.floor(Math.random() * emojies.length)]}</div>
		<button on:click={() => faces.sort(1)}><i class="fa fa-arrow-up-short-wide" /></button>
		<button on:click={() => faces.sort(-1)}><i class="fa fa-arrow-down-wide-short" /></button>
	</nav>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.layout {
		height: 100vh;

		@media only screen and (hover: none) and (pointer: coarse) {
			height: -moz-available;
			height: -webkit-fill-available;
			height: fill-available;
		}

		@media all and (display-mode: standalone) {
			height: 100vh;
		}

		display: grid;
		grid-template-rows: max-content 1fr;
		overflow: hidden;

		nav {
			background-color: var(--color-700);
			color: var(--on-color-700);
			padding: 1rem;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;

			padding-top: calc(env(safe-area-inset-top) + 1rem);

			button {
				width: max-content;

				background-color: var(--color-950);
				color: var(--on-color-950);
			}

			.logo {
				font-size: 2rem;
				margin-right: auto;
			}
		}

		main {
			overflow: auto;
			padding-bottom: env(safe-area-inset-bottom);
			background-color: white;
		}
	}
</style>
