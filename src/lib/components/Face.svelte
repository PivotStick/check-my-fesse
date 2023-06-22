<script>
	import { createEventDispatcher, tick } from "svelte";

	/**
	 * @type {FaceItem}
	 */
	export let face;

	/** @type {FileList} */
	let files;

	/**
	 * @param {KeyboardEvent & { currentTarget: HTMLElement }} e
	 */
	const onTagKeydown = async (e) => {
		switch (e.key) {
			case "Enter": {
				const el = e.currentTarget;
				e.preventDefault();
				if (!el.textContent) break;
				face.tags.push("");
				face.tags = face.tags;

				await tick();

				if (el.nextSibling instanceof HTMLElement) {
					el.nextSibling.focus();
				}
				break;
			}

			case "Backspace": {
				const previous = e.currentTarget.previousSibling;
				if (previous instanceof HTMLElement && !e.currentTarget.textContent) {
					e.preventDefault();
					face.tags.pop();
					face.tags = face.tags;

					await tick();

					const range = document.createRange(); //Create a range (a range is a like the selection but invisible)
					const selection = window.getSelection(); //get the selection object (allows you to change selection)

					if (selection) {
						range.selectNodeContents(previous); //Select the entire contents of the element with the range
						range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start

						selection.removeAllRanges(); //remove any selections already made
						selection.addRange(range); //make the range you have just created the visible selection
					}
				}
				break;
			}

			default:
				break;
		}
	};

	const dispatch = createEventDispatcher();

	$: if (files) {
		const file = files.item(0);

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				if (typeof reader.result === "string") {
					face.image = reader.result;
				}
			};
			reader.onerror = () => (face.image = "");
		}
	}
</script>

<div class="container">
	<label>
		{#if face.image}
			<img class="avatar" src={face.image} alt="" />
		{:else}
			<div class="avatar"><i class="fa fa-image" /></div>
		{/if}
		<input type="file" style="display: none" bind:files />
	</label>
	<div class="right">
		<div class="head">
			<input type="text" class="name" bind:value={face.name} placeholder="Nom" />
			<i class="fa fa-trash delete danger" on:click={() => dispatch("delete")} />
		</div>
		<div class="rating">
			{#each Array(5) as _, i}
				<i
					style:--index={i}
					class:active={i < face.rating}
					class="fa fa-star"
					on:click={() => (face.rating = i + 1)}
				/>
			{/each}
		</div>
	</div>
	<div class="tags">
		{#each face.tags as tag}
			<div contenteditable="true" on:keydown={onTagKeydown} bind:innerText={tag} class="tag" />
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;

		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2rem;

		.head {
			display: flex;
			align-items: flex-start;
			gap: 1rem;
		}

		.delete {
			cursor: pointer;

			background-color: var(--color-200);
			color: var(--on-color-200);

			$size: 2.5rem;

			width: $size;
			height: $size;

			display: flex;
			justify-content: center;
			align-items: center;

			border-radius: 50%;

			flex-shrink: 0;

			transition-property: opacity;

			&:active {
				opacity: 0.5;
			}
		}

		.name {
			font: inherit;
			font-size: 1.75rem;
			font-weight: 900;
			margin-bottom: 0.75rem;
			width: 100%;
			border: none;
			outline: 0px solid var(--color-100);
			border-radius: 0;

			transition-property: outline-width, border-radius, padding;

			&::placeholder {
				color: inherit;
				opacity: 0.5;
				font-style: italic;
			}

			&:focus {
				padding: 0.25rem 0.5rem;
				outline-width: 0.25rem;
				border-radius: 0.25rem;
			}
		}

		.avatar {
			display: flex;
			justify-content: center;
			align-items: center;

			object-fit: cover;
			border-radius: 50%;

			background-color: var(--color-200);

			$size: 6rem;

			width: $size;
			height: $size;

			transition-property: opacity;

			border: 3px solid var(--color-50);

			i {
				font-size: 2rem;
			}

			&:active {
				opacity: 0.5;
			}
		}

		.rating {
			display: flex;
			gap: 0.25rem;

			i {
				font-size: 2rem;
				color: var(--color-300);
				scale: 0.8;

				transition-property: color, scale;
				transition-delay: calc(var(--index) * 20ms);

				&.active {
					color: var(--color-800);
					scale: 1;
				}
			}
		}

		.tags {
			grid-column: 1 / -1;
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;

			.tag {
				background-color: var(--color-200);
				color: var(--on-color-200);
				padding: 0.25rem 0.75rem;
				border-radius: 2rem;

				outline: 0px solid var(--color-100);

				transition-property: outline-width, background-color;

				&:focus {
					outline-width: 3px;
					background-color: var(--color-50);
				}
			}
		}
	}
</style>
