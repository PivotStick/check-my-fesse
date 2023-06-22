<script>
	import Face from "$lib/components/Face.svelte";
	import { slide } from "svelte/transition";

	const addNewFace = () => {
		faces.push({
			image: "",
			name: "",
			rating: 0,
			tags: [""]
		});
		faces = faces;
	};

	const key = "_RATE_MY_FESSE_DATA_";

	/**
	 * @type {FaceItem[]}
	 */
	let faces = JSON.parse(localStorage.getItem(key) || "[]");

	$: localStorage.setItem(key, JSON.stringify(faces));
</script>

<ul>
	{#each faces as face}
		<li transition:slide>
			<Face bind:face on:delete={() => (faces = faces.filter((f) => f !== face))} />
		</li>
	{/each}

	<li class="new">
		<button on:click={addNewFace}><i class="fa fa-plus" /></button>
	</li>
</ul>

<style lang="scss">
	ul {
		display: grid;
		$gap: 3.5rem;
		padding: 1rem;

		li {
			&:not(:last-child) {
				border-bottom: 1px solid var(--color-200);
				padding-bottom: $gap;
				margin-bottom: $gap;
			}

			&.new {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
