<script lang="ts">
	import type { SlideContent } from '$lib/types';
	let { content }: { content: SlideContent } = $props();

	const columns = $derived(
		content.tableRows?.length ? Object.keys(content.tableRows[0]) : []
	);
</script>

<div class="slide data-table">
	{#if content.title}
		<div class="dt-header">
			<h2 class="slide-title">{content.title}</h2>
			{#if content.subtitle}
				<p class="slide-subtitle">{content.subtitle}</p>
			{/if}
		</div>
	{/if}

	{#if content.gridItems?.length}
		<div class="dt-kv">
			{#each content.gridItems as item}
				<div class="kv-row">
					<span class="kv-label">{item.label}</span>
					<span class="kv-value">{item.value}</span>
				</div>
			{/each}
		</div>
	{/if}

	{#if content.tableRows?.length}
		<div class="dt-table-wrap">
			<table>
				<thead>
					<tr>
						{#each columns as col}
							<th>{col}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each content.tableRows as row}
						<tr>
							{#each columns as col}
								<td>{row[col] ?? ''}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	{#if content.body}
		<div class="dt-footer">
			<p class="slide-body">{content.body}</p>
		</div>
	{/if}
</div>

<style>
	.data-table {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.dt-header {
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

	.dt-kv {
		padding: 0 clamp(16px, 5vw, 40px);
	}

	.kv-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
		padding: 14px 0;
		border-bottom: 1px solid var(--border);
		min-width: 0;
	}

	.kv-label {
		font-size: 0.6875rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--gray-400);
	}

	.kv-value {
		font-size: 0.9375rem;
		font-weight: 500;
		min-width: 0;
		word-break: break-word;
	}

	.dt-table-wrap {
		padding: 0 clamp(12px, 4vw, 40px);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	.dt-table-wrap :global(th),
	.dt-table-wrap :global(td) {
		word-break: break-word;
		overflow-wrap: anywhere;
	}

	.dt-footer {
		padding: 24px clamp(16px, 5vw, 40px);
		margin-top: auto;
	}

	.slide-body {
		font-size: 0.8125rem;
		color: var(--gray-500);
	}

	@media (max-width: 768px) {
		.kv-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 6px;
		}

		.kv-label {
			font-size: 0.625rem;
		}

		.kv-value {
			font-size: 0.875rem;
		}
	}
</style>
