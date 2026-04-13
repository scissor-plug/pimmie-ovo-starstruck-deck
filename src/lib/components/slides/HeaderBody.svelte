<script lang="ts">
	import type { SlideContent } from '$lib/types';

	let { content }: { content: SlideContent } = $props();

	function iframeSrc(url: string): string {
		try {
			const u = new URL(url.trim());
			if (u.hostname.endsWith('figma.com') && !u.pathname.startsWith('/embed')) {
				return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url.trim())}`;
			}
		} catch {
			/* fall through */
		}
		return url.trim();
	}
</script>

<div class="slide header-body">
	<div class="hb-header">
		{#if content.title}
			<h2 class="slide-title">{content.title}</h2>
		{/if}
		{#if content.subtitle}
			<p class="slide-subtitle">{content.subtitle}</p>
		{/if}
	</div>
	<div class="hb-body">
		{#if content.body}
			<p class="slide-body">{content.body}</p>
		{/if}
		{#if content.embedUrl}
			<div class="hb-embed">
				<iframe
					class="hb-iframe"
					title="Figma prototype"
					src={iframeSrc(content.embedUrl)}
					loading="lazy"
					allowfullscreen
				></iframe>
			</div>
		{/if}
		{#if content.gridItems?.length}
			<div class="hb-items">
				{#each content.gridItems as item}
					<div class="hb-item">
						<span class="label">{item.label}</span>
						<span class="item-value">{item.value}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.header-body {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.hb-header {
		padding: clamp(32px, 8vw, 56px) clamp(16px, 5vw, 40px) clamp(24px, 5vw, 40px);
		flex: 0 0 auto;
	}

	.slide-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 100;
		line-height: 1;
		margin-bottom: 8px;
	}

	.slide-subtitle {
		font-size: 1rem;
		color: var(--gray-400);
		font-weight: 400;
	}

	.hb-body {
		flex: 1;
		min-height: 0;
		padding: clamp(20px, 4vw, 32px) clamp(16px, 5vw, 40px) clamp(24px, 5vw, 40px);
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.slide-body {
		font-size: 0.9375rem;
		color: var(--gray-600);
		max-width: min(600px, 100%);
		line-height: 1.8;
		flex-shrink: 0;
		white-space: pre-line;
		word-break: break-word;
	}

	.hb-embed {
		flex: 1;
		min-height: min(280px, 42vh);
		width: 100%;
		max-width: 100%;
		position: relative;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--gray-50);
	}

	.hb-iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.hb-items {
		margin-top: 28px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
		gap: 20px;
	}

	.hb-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border);
	}

	.item-value {
		font-size: 0.9375rem;
		font-weight: 500;
		word-break: break-word;
	}

	@media (max-width: 768px) {
		.slide-title {
			font-size: clamp(1.75rem, 8vw, 2.5rem);
		}

		.slide-subtitle {
			font-size: 0.875rem;
		}
	}
</style>
