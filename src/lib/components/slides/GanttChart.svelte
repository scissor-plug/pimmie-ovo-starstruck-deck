<script lang="ts">
	import type { SlideContent, GanttBar } from '$lib/types';

	let { content }: { content: SlideContent } = $props();

	const spec = $derived(content.gantt);
	const weeks = $derived(spec?.weeks ?? 0);
	const bars = $derived(spec?.bars ?? []);
	const columnLabels = $derived(
		spec?.columnLabels?.length === weeks && weeks > 0
			? spec.columnLabels
			: Array.from({ length: weeks }, (_, i) => String(i + 1))
	);

	function barVars(bar: GanttBar): string {
		if (!weeks) return '';
		const left = ((bar.start - 1) / weeks) * 100;
		const width = (bar.span / weeks) * 100;
		return `--gantt-left:${left}%;--gantt-width:${width}%`;
	}
</script>

<div class="slide gantt">
	{#if content.title}
		<div class="gantt-header">
			<h2 class="slide-title">{content.title}</h2>
			{#if content.subtitle}
				<p class="slide-subtitle">{content.subtitle}</p>
			{/if}
		</div>
	{/if}

	{#if spec && weeks > 0 && bars.length}
		<div class="gantt-wrap" style="--gantt-weeks: {weeks}">
			<div class="gantt-grid-head" role="row">
				<div class="gantt-corner" role="columnheader"></div>
				<div
					class="gantt-weeks"
					style="grid-template-columns: repeat({weeks}, minmax(0, 1fr))"
					role="row"
				>
					{#each columnLabels as lab}
						<div class="gantt-week-num" role="columnheader">
							<span class="label">Week</span>
							<span class="week-label">{lab}</span>
						</div>
					{/each}
				</div>
			</div>

			{#each bars as bar, ri}
				<div class="gantt-row" role="row">
					<div class="gantt-label" id="gantt-row-{ri}">{bar.label}</div>
					<div
						class="gantt-track"
						style="--gantt-weeks: {weeks}"
						role="img"
						aria-labelledby="gantt-row-{ri}"
						aria-label="{bar.label}: {bar.span} week{bar.span === 1 ? '' : 's'} starting week {bar.start}"
					>
						<div class="gantt-grid-bg" aria-hidden="true"></div>
						<div
							class="gantt-bar tone-{bar.tone ?? 'neutral'}"
							style={barVars(bar)}
						>
							<span class="gantt-bar-text">{bar.span} wk{bar.span === 1 ? '' : 's'}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="gantt-empty">Add a <code>gantt</code> object to this slide in the deck JSON.</p>
	{/if}

	{#if content.body}
		<div class="gantt-foot">
			<p class="gantt-body">{content.body}</p>
		</div>
	{/if}
</div>

<style>
	.gantt {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.gantt-header {
		padding: clamp(20px, 5vw, 40px) clamp(16px, 5vw, 40px) 24px;
		border-bottom: 1px solid var(--border);
	}

	.slide-title {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 300;
		margin-bottom: 6px;
	}

	.slide-subtitle {
		font-size: 0.875rem;
		color: var(--gray-500);
		line-height: 1.5;
	}

	.gantt-wrap {
		padding: 16px max(12px, env(safe-area-inset-left)) 8px max(12px, env(safe-area-inset-right));
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	.gantt-grid-head {
		display: grid;
		grid-template-columns: minmax(88px, 160px) minmax(0, 1fr);
		align-items: end;
		gap: 0;
		margin-bottom: 8px;
	}

	.gantt-corner {
		min-height: 36px;
	}

	.gantt-weeks {
		display: grid;
		min-width: 280px;
		border-bottom: 1px solid var(--black);
	}

	.gantt-week-num {
		text-align: center;
		padding: 6px 4px 10px;
		border-left: 1px solid var(--border);
	}

	.gantt-week-num:first-child {
		border-left: none;
	}

	.gantt-week-num .label {
		display: block;
		margin-bottom: 2px;
	}

	.week-label {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--black);
	}

	.gantt-row {
		display: grid;
		grid-template-columns: minmax(88px, 160px) minmax(0, 1fr);
		align-items: stretch;
		min-width: 0;
	}

	.gantt-label {
		font-size: 0.8125rem;
		font-weight: 500;
		padding: 14px 10px 14px 0;
		line-height: 1.35;
		color: var(--gray-700);
		border-bottom: 1px solid var(--border);
		align-self: stretch;
		display: flex;
		align-items: center;
		min-width: 0;
		word-break: break-word;
		hyphens: auto;
	}

	.gantt-track {
		position: relative;
		min-height: 44px;
		border-bottom: 1px solid var(--border);
	}

	.gantt-grid-bg {
		position: absolute;
		inset: 0;
		background-image: linear-gradient(to right, var(--border) 1px, transparent 1px);
		background-size: calc(100% / var(--gantt-weeks)) 100%;
		pointer-events: none;
		opacity: 0.85;
	}

	.gantt-bar {
		position: absolute;
		left: var(--gantt-left);
		width: var(--gantt-width);
		top: 50%;
		transform: translateY(-50%);
		height: 26px;
		border-radius: var(--radius-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 6px;
		border: 1px solid rgba(0, 0, 0, 0.06);
	}

	.gantt-bar-text {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--gray-800);
		white-space: nowrap;
	}

	.tone-neutral {
		background: var(--gray-100);
	}

	.tone-blue {
		background: var(--blue-light);
		border-color: rgba(37, 99, 235, 0.25);
	}

	.tone-green {
		background: var(--green-light);
		border-color: rgba(22, 163, 74, 0.25);
	}

	.tone-amber {
		background: #fffbeb;
		border-color: rgba(217, 119, 6, 0.28);
	}

	.gantt-foot {
		padding: 20px clamp(16px, 5vw, 40px) clamp(24px, 5vw, 40px);
	}

	.gantt-body {
		font-size: 0.8125rem;
		color: var(--gray-600);
		line-height: 1.65;
		max-width: 52rem;
	}

	.gantt-empty {
		padding: 32px clamp(16px, 5vw, 40px);
		font-size: 0.875rem;
		color: var(--gray-400);
	}

	@media (max-width: 768px) {
		.gantt-weeks {
			min-width: 240px;
		}

		.gantt-week-num {
			padding: 4px 2px 8px;
		}

		.week-label {
			font-size: 0.75rem;
		}

		.gantt-bar-text {
			font-size: 0.5625rem;
		}
	}

	.gantt-empty code {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
	}
</style>
