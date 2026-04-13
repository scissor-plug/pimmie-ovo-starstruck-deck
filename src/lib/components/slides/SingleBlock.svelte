<script lang="ts">
	import type { SlideContent } from '$lib/types';
	let { content }: { content: SlideContent } = $props();
</script>

<div class="slide single-block">
	{#if content.title}
		<h2 class="slide-title">{content.title}</h2>
	{/if}
	{#if content.subtitle}
		<p class="slide-subtitle">{content.subtitle}</p>
	{/if}
	<div class="rule"></div>
	{#if content.body}
		<p class="slide-body">{content.body}</p>
	{/if}
	{#if content.metadata}
		<div class="slide-meta">
			{#each Object.entries(content.metadata) as [key, value]}
				<div class="meta-item">
					<span class="label">{key}</span>
					<span class="meta-value">{value}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.single-block {
		padding: clamp(28px, 6vw, 48px) clamp(16px, 5vw, 40px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100%;
		min-width: 0;
	}

	.slide-title {
		font-size: clamp(2rem, 4vw, 3.5rem);
		font-weight: 200;
		margin-bottom: 8px;
	}

	.slide-subtitle {
		font-size: 1rem;
		color: var(--gray-400);
		margin-bottom: 24px;
	}

	.rule {
		width: 48px;
		height: 1px;
		background: var(--black);
		margin-bottom: 24px;
	}

	.slide-body {
		font-size: 0.9375rem;
		color: var(--gray-600);
		max-width: min(640px, 100%);
		line-height: 1.8;
		word-break: break-word;
	}

	.slide-meta {
		margin-top: 32px;
		display: flex;
		gap: 32px;
		flex-wrap: wrap;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.meta-value {
		font-size: 0.875rem;
		font-weight: 500;
	}
</style>
