<script lang="ts">
	import type { SlideContent } from '$lib/types';
	let { content }: { content: SlideContent } = $props();
</script>

<div class="slide split-panel">
	<header class="split-header">
		{#if content.title}
			<h2 class="slide-title">{content.title}</h2>
		{/if}
		{#if content.subtitle}
			<p class="slide-subtitle">{content.subtitle}</p>
		{/if}
	</header>
	<div class="split-main">
		{#if content.body}
			<p class="slide-body">{content.body}</p>
		{/if}
		{#if content.gridItems?.length}
			<div class="split-items">
				{#each content.gridItems as item}
					<div class="split-item">
						<span class="label">{item.label}</span>
						<span class="item-value">{item.value}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.split-panel {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		min-height: 100%;
	}

	.split-header {
		padding: clamp(24px, 5vw, 48px) clamp(16px, 5vw, 48px) 28px;
		border-bottom: 1px solid var(--border);
	}

	.split-main {
		padding: clamp(20px, 4vw, 32px) clamp(16px, 5vw, 48px) clamp(32px, 6vw, 56px);
		flex: 1;
		min-width: 0;
	}

	.slide-title {
		font-size: clamp(1.75rem, 2.5vw, 2.5rem);
		font-weight: 200;
		margin-bottom: 8px;
	}

	.slide-subtitle {
		font-size: 0.9375rem;
		color: var(--gray-400);
		line-height: 1.5;
	}

	.slide-body {
		font-size: 0.9375rem;
		color: var(--gray-600);
		line-height: 1.85;
		max-width: none;
		word-break: break-word;
	}

	.split-items {
		margin-top: 28px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.split-item {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-bottom: 14px;
		border-bottom: 1px solid var(--border);
	}

	.item-value {
		font-size: 0.9375rem;
		font-weight: 500;
		word-break: break-word;
	}
</style>
