<script lang="ts">
	import SlideRenderer from '$lib/components/SlideRenderer.svelte';
	import type { DeckJSON, DeckSlide } from '$lib/types';

	let { data } = $props();

	const deck = $derived(data.deck);

	const slides = $derived.by((): DeckSlide[] => {
		const ordered = [...deck.slides].sort((a, b) => a.position - b.position);
		return ordered.map((s, i) => ({
			id: `local-${i}`,
			workspace_id: 'local',
			position: s.position,
			layout: s.layout,
			content: s.content,
			created_at: '',
			updated_at: ''
		}));
	});

	let selectedIndex = $state(0);
	let showPresentation = $state(false);
	let presentationIndex = $state(0);

	const selectedSlide = $derived(slides[selectedIndex] ?? null);

	function selectSlide(i: number) {
		selectedIndex = i;
	}

	function openPresentation() {
		presentationIndex = selectedIndex;
		showPresentation = true;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!showPresentation) return;
		if (e.key === 'ArrowRight' || e.key === ' ') {
			e.preventDefault();
			if (presentationIndex < slides.length - 1) presentationIndex++;
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			if (presentationIndex > 0) presentationIndex--;
		} else if (e.key === 'Escape') {
			showPresentation = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>{deck.name} · Scissor Studio</title>
	<meta name="author" content="Scissor Studio" />
	<meta
		name="description"
		content="PIMMIE · OVO / Starstruck — website overhaul invoice: $1,500 for work completed; optional content editor +$1,000. No committed timeline in this deck."
	/>
</svelte:head>

{#if showPresentation}
	<div class="presentation-mode">
		<div class="presentation-slide">
			{#if slides[presentationIndex]}
				<SlideRenderer
					variant="presentation"
					layout={slides[presentationIndex].layout}
					content={slides[presentationIndex].content}
				/>
			{/if}
		</div>
		<footer class="presentation-footer" aria-label="Prepared by">
			<span class="footer-mark">Scissor Studio</span>
			<span class="footer-sep" aria-hidden="true">|</span>
			<a href="mailto:alex@scissor.cloud">alex@scissor.cloud</a>
			<span class="footer-sep" aria-hidden="true">|</span>
			<a href="tel:+14074533134">407.453.3134</a>
		</footer>
		<div class="presentation-controls">
			<span class="presentation-counter">{presentationIndex + 1} / {slides.length}</span>
			<button type="button" class="btn btn-sm" onclick={() => (showPresentation = false)}>Exit</button>
		</div>
	</div>
{:else}
	<div class="viewer">
		<header class="viewer-toolbar">
			<div class="toolbar-left">
				<h1 class="toolbar-title">{deck.name}</h1>
				<span class="label">{slides.length} slides</span>
			</div>
			<div class="toolbar-right">
				<span class="toolbar-studio" aria-label="Scissor Studio">Scissor Studio</span>
				<button type="button" class="btn btn-sm" onclick={openPresentation}>Present</button>
			</div>
		</header>

		<div class="viewer-body">
			<aside class="slide-sidebar" aria-label="Slide list">
				<div class="sidebar-header">
					<span class="label">Slides</span>
				</div>
				<div class="slide-list">
					{#each slides as slide, i}
						<button
							type="button"
							class="slide-thumb"
							class:active={i === selectedIndex}
							onclick={() => selectSlide(i)}
						>
							<span class="thumb-num">{i + 1}</span>
							<span class="thumb-title">{slide.content.title || 'Untitled'}</span>
						</button>
					{/each}
				</div>
			</aside>

			<div class="viewer-preview">
				{#if selectedSlide}
					<SlideRenderer variant="viewer" layout={selectedSlide.layout} content={selectedSlide.content} />
				{:else}
					<div class="empty-preview">
						<p>No slides defined.</p>
					</div>
				{/if}
			</div>
		</div>

		<footer class="viewer-footer" aria-label="Prepared by">
			<div class="footer-brand">
				<span class="footer-mark">Scissor Studio</span>
			</div>
			<div class="footer-contact">
				<a href="mailto:alex@scissor.cloud">alex@scissor.cloud</a>
				<span class="footer-sep" aria-hidden="true">|</span>
				<a href="tel:+14074533134">407.453.3134</a>
			</div>
		</footer>
	</div>
{/if}

<style>
	.viewer {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-height: 100dvh;
	}

	.viewer-toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px var(--page-pad);
		border-bottom: 1px solid var(--border);
		background: var(--white);
		flex-shrink: 0;
	}

	.toolbar-left {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.toolbar-title {
		font-size: 1rem;
		font-weight: 500;
	}

	.toolbar-right {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-shrink: 0;
	}

	.toolbar-studio {
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--gray-500);
		white-space: nowrap;
	}

	.viewer-body {
		display: flex;
		flex: 1;
		overflow: hidden;
		min-height: 0;
	}

	.slide-sidebar {
		width: 220px;
		border-right: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		background: var(--gray-50);
	}

	.sidebar-header {
		padding: 12px 16px;
		border-bottom: 1px solid var(--border);
	}

	.slide-list {
		flex: 1;
		overflow-y: auto;
	}

	.slide-thumb {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 10px 16px;
		border: none;
		border-bottom: 1px solid var(--border);
		border-radius: 0;
		background: none;
		cursor: pointer;
		text-align: left;
		font-family: var(--font-body);
		font-size: 0.75rem;
		color: inherit;
		transition: background 0.1s;
	}

	.slide-thumb:hover {
		background: var(--white);
	}

	.slide-thumb.active {
		background: var(--white);
		font-weight: 600;
	}

	.thumb-num {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--gray-300);
		min-width: 16px;
	}

	.thumb-title {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.viewer-preview {
		flex: 1;
		min-width: 0;
		min-height: 0;
		padding: 24px;
		overflow: auto;
		background: var(--gray-50);
	}

	.viewer-preview > :global(.slide-frame) {
		width: 100%;
		min-height: 100%;
	}

	.empty-preview {
		text-align: center;
		color: var(--gray-400);
	}

	.viewer-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px 24px;
		padding: 10px var(--page-pad);
		border-top: 1px solid var(--border);
		background: var(--white);
		font-size: 0.8125rem;
		color: var(--gray-500);
		flex-shrink: 0;
	}

	.footer-mark {
		font-weight: 600;
		color: var(--gray-700);
		letter-spacing: 0.02em;
	}

	.footer-contact {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px 10px;
	}

	.footer-contact a:hover,
	.presentation-footer a:hover {
		text-decoration: underline;
	}

	.footer-sep {
		color: var(--gray-300);
		user-select: none;
	}

	.presentation-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 6px 10px;
		padding: 8px 16px;
		border-top: 1px solid var(--border);
		font-size: 0.75rem;
		color: var(--gray-500);
		flex-shrink: 0;
	}

	.presentation-footer .footer-mark {
		font-weight: 600;
		color: var(--gray-600);
	}

	.presentation-mode {
		position: fixed;
		inset: 0;
		z-index: 300;
		background: var(--white);
		display: flex;
		flex-direction: column;
	}

	.presentation-slide {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px;
		min-height: 0;
	}

	.presentation-slide > :global(*) {
		width: 100%;
		max-width: 1100px;
		height: 100%;
		max-height: min(90vh, 900px);
	}

	.presentation-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16px;
		padding: 16px;
		border-top: 1px solid var(--border);
		flex-shrink: 0;
	}

	.presentation-counter {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--gray-400);
	}

	@media (max-width: 768px) {
		.viewer-toolbar {
			align-items: flex-start;
			flex-wrap: wrap;
			gap: 10px;
			padding: 10px max(12px, env(safe-area-inset-left)) 10px max(12px, env(safe-area-inset-right));
		}

		.toolbar-left {
			min-width: 0;
			flex: 1 1 100%;
			width: 100%;
		}

		.toolbar-title {
			font-size: 0.8125rem;
			line-height: 1.35;
			word-break: break-word;
		}

		.toolbar-right {
			width: 100%;
			justify-content: space-between;
			flex-wrap: wrap;
			gap: 8px;
			flex: 1 1 100%;
		}

		.toolbar-studio {
			font-size: 0.625rem;
			letter-spacing: 0.1em;
		}

		.viewer-body {
			flex-direction: column;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
		}

		.slide-sidebar {
			width: 100%;
			max-height: min(200px, 32vh);
			flex-shrink: 0;
			border-right: none;
			border-bottom: 1px solid var(--border);
			order: -1;
		}

		.sidebar-header {
			padding: 8px 12px;
		}

		.slide-list {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			gap: 0;
			overflow-x: auto;
			overflow-y: hidden;
			-webkit-overflow-scrolling: touch;
			scroll-snap-type: x proximity;
			border-bottom: 1px solid var(--border);
		}

		.slide-thumb {
			flex: 0 0 auto;
			min-width: min(200px, 72vw);
			max-width: 280px;
			border-bottom: none;
			border-right: 1px solid var(--border);
			padding: 10px 12px;
			scroll-snap-align: start;
		}

		.thumb-title {
			white-space: normal;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.viewer-preview {
			padding-top: 16px;
			padding-bottom: max(16px, env(safe-area-inset-bottom));
			padding-left: max(12px, env(safe-area-inset-left));
			padding-right: max(12px, env(safe-area-inset-right));
			flex: 1;
			min-height: 0;
		}

		.viewer-footer {
			padding: 10px max(12px, env(safe-area-inset-left)) max(10px, env(safe-area-inset-bottom))
				max(12px, env(safe-area-inset-right));
		}

		.presentation-slide {
			padding: 12px;
			padding-top: max(12px, env(safe-area-inset-top));
			align-items: flex-start;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
		}

		.presentation-slide > :global(*) {
			max-width: 100%;
			max-height: none;
			height: auto;
			min-height: 0;
		}

		.presentation-footer {
			padding-left: max(8px, env(safe-area-inset-left));
			padding-right: max(8px, env(safe-area-inset-right));
			padding-bottom: max(8px, env(safe-area-inset-bottom));
			font-size: 0.6875rem;
		}

		.presentation-controls {
			padding-bottom: max(12px, env(safe-area-inset-bottom));
		}
	}
</style>
