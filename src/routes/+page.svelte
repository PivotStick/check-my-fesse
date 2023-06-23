<script>
	import Face from "$lib/components/Face.svelte";
	import { faces } from "$lib/stores/faces";
	import { slide } from "svelte/transition";
</script>

<ul>
	<li class="new">
		<button on:click={faces.add}><i class="fa fa-plus" /></button>
	</li>

	{#each $faces as face (face.id)}
		<li transition:slide>
			<Face bind:face on:delete={() => ($faces = $faces.filter((f) => f !== face))} />
		</li>
	{/each}
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
