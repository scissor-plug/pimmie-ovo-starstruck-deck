<script lang="ts">
	import type { SlideContent } from '$lib/types';
	let { content }: { content: SlideContent } = $props();
</script>

<div class="slide grid4">
	{#if content.title}
		<div class="grid4-header">
			<h2 class="slide-title">{content.title}</h2>
		</div>
	{/if}
	{#if content.gridItems?.length}
		<div class="grid4-body">
			{#each content.gridItems as item, i}
				<div class="grid4-cell">
					{#if item.label}
						<span class="label">{item.label}</span>
					{/if}
					<span class="cell-value">{item.value}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.grid4 {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.grid4-header {
		padding: clamp(20px, 5vw, 40px);
		border-bottom: 1px solid var(--border);
	}

	.slide-title {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 300;
	}

	.grid4-body {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		flex: 1;
	}

	.grid4-cell {
		padding: clamp(20px, 4vw, 32px);
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 8px;
		aspect-ratio: 1;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-width: 0;
	}

	.grid4-cell:nth-child(2n) {
		border-right: none;
	}

	.cell-value {
		font-size: 1rem;
		font-weight: 500;
		word-break: break-word;
	}

	@media (max-width: 768px) {
		.grid4-body {
			grid-template-columns: 1fr;
		}

		.grid4-cell {
			border-right: none;
			aspect-ratio: auto;
			min-height: 120px;
		}
	}
</style>
