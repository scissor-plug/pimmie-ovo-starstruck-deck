<script lang="ts">
	import type { SlideContent } from '$lib/types';
	let { content }: { content: SlideContent } = $props();
</script>

<div class="slide grid3">
	{#if content.title}
		<div class="grid3-header">
			<h2 class="slide-title">{content.title}</h2>
			{#if content.subtitle}
				<p class="slide-subtitle">{content.subtitle}</p>
			{/if}
		</div>
	{/if}
	{#if content.gridItems?.length}
		<div class="grid3-body">
			{#each content.gridItems as item}
				<div class="grid3-cell">
					<span class="label">{item.label}</span>
					<span class="cell-value">{item.value}</span>
				</div>
			{/each}
		</div>
	{/if}
	{#if content.body}
		<div class="grid3-footer">
			<p class="slide-body">{content.body}</p>
		</div>
	{/if}
</div>

<style>
	.grid3 {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.grid3-header {
		padding: clamp(20px, 5vw, 40px);
		border-bottom: 1px solid var(--border);
	}

	.slide-title {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 300;
		margin-bottom: 4px;
	}

	.slide-subtitle {
		font-size: 0.8125rem;
		color: var(--gray-400);
	}

	.grid3-body {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		flex: 1;
	}

	.grid3-cell {
		padding: clamp(20px, 4vw, 32px);
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
	}

	.grid3-cell:nth-child(3n) {
		border-right: none;
	}

	.cell-value {
		font-size: 1.125rem;
		font-weight: 500;
	}

	.grid3-footer {
		padding: 24px clamp(16px, 5vw, 40px);
	}

	.slide-body {
		font-size: 0.8125rem;
		color: var(--gray-500);
	}

	@media (max-width: 768px) {
		.grid3-body {
			grid-template-columns: 1fr;
		}

		.grid3-cell {
			border-right: none;
		}

		.cell-value {
			font-size: 1rem;
			word-break: break-word;
		}
	}
</style>
