<script lang="ts">
	import type { SlideContent } from '$lib/types';
	let { content }: { content: SlideContent } = $props();
</script>

<div class="slide image-text">
	<div class="it-image">
		{#if content.image}
			<img src={content.image} alt={content.imageAlt ?? content.title ?? ''} />
		{:else}
			<div class="it-placeholder">
				<span class="label">Image</span>
			</div>
		{/if}
	</div>
	<div class="it-divider"></div>
	<div class="it-content">
		{#if content.title}
			<h2 class="slide-title">{content.title}</h2>
		{/if}
		{#if content.subtitle}
			<p class="slide-subtitle">{content.subtitle}</p>
		{/if}
		{#if content.body}
			<div class="rule"></div>
			<p class="slide-body">{content.body}</p>
		{/if}
		{#if content.metadata}
			<div class="it-meta">
				{#each Object.entries(content.metadata) as [key, value]}
					<div class="meta-row">
						<span class="label">{key}</span>
						<span class="meta-value">{value}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.image-text {
		display: grid;
		grid-template-columns: 1fr 1px 1fr;
		min-height: 100%;
	}

	.it-image {
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--gray-50);
	}

	.it-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.it-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-height: 200px;
	}

	.it-divider {
		background: var(--border);
	}

	.it-content {
		padding: clamp(24px, 5vw, 48px) clamp(16px, 5vw, 40px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}

	.slide-title {
		font-size: clamp(1.5rem, 2.5vw, 2.25rem);
		font-weight: 200;
		margin-bottom: 6px;
	}

	.slide-subtitle {
		font-size: 0.9375rem;
		color: var(--gray-400);
	}

	.rule {
		width: 32px;
		height: 1px;
		background: var(--black);
		margin: 20px 0;
	}

	.slide-body {
		font-size: 0.875rem;
		color: var(--gray-600);
		line-height: 1.8;
		word-break: break-word;
	}

	.it-meta {
		margin-top: 24px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.meta-row {
		display: flex;
		justify-content: space-between;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.meta-value {
		font-size: 0.875rem;
		font-weight: 500;
		text-align: right;
		word-break: break-word;
	}

	@media (max-width: 768px) {
		.image-text {
			display: flex;
			flex-direction: column;
		}

		.it-divider {
			display: none;
		}

		.it-image {
			min-height: 180px;
			max-height: 40vh;
		}

		.it-content {
			border-top: 1px solid var(--border);
		}

		.meta-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}

		.meta-value {
			text-align: left;
		}
	}
</style>
