<script lang="ts">
	import type { SlideLayout, SlideContent } from '$lib/types';
	import SingleBlock from './slides/SingleBlock.svelte';
	import SplitPanel from './slides/SplitPanel.svelte';
	import Grid3 from './slides/Grid3.svelte';
	import Grid4 from './slides/Grid4.svelte';
	import HeaderBody from './slides/HeaderBody.svelte';
	import ImageText from './slides/ImageText.svelte';
	import DataTable from './slides/DataTable.svelte';
	import GanttChart from './slides/GanttChart.svelte';

	let {
		layout,
		content,
		variant = 'viewer'
	}: { layout: SlideLayout; content: SlideContent; variant?: 'viewer' | 'presentation' } = $props();

	const layoutMap = {
		'single': SingleBlock,
		'split': SplitPanel,
		'grid-3': Grid3,
		'grid-4': Grid4,
		'header-body': HeaderBody,
		'image-text': ImageText,
		'data-table': DataTable,
		gantt: GanttChart
	} as const;

	const component = $derived(layoutMap[layout] ?? SingleBlock);
</script>

<div class="slide-frame" data-variant={variant}>
	{#key layout}
		{@const Component = component}
		<Component {content} />
	{/key}
</div>

<style>
	.slide-frame {
		box-sizing: border-box;
		background: var(--white);
		border: 1px solid var(--border);
		position: relative;
		width: 100%;
	}

	/* Editor / preview: one scrollable page that uses the full preview width */
	.slide-frame[data-variant='viewer'] {
		min-height: 100%;
		overflow: visible;
	}

	/* Present mode: fixed 16:10 slide on larger screens */
	.slide-frame[data-variant='presentation'] {
		aspect-ratio: 16 / 10;
		overflow: hidden;
	}

	@media (max-width: 768px) {
		.slide-frame[data-variant='presentation'] {
			aspect-ratio: auto;
			overflow: visible;
			min-height: 0;
			width: 100%;
		}
	}
</style>
