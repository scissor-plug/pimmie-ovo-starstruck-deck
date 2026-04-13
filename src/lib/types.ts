export type SlideLayout =
	| 'single'
	| 'split'
	| 'grid-3'
	| 'grid-4'
	| 'header-body'
	| 'image-text'
	| 'data-table'
	| 'gantt';

export type GridItem = {
	label: string;
	value: string;
};

/** One row in a Gantt chart; `start` is 1-based week column from project kickoff */
export type GanttBar = {
	label: string;
	start: number;
	span: number;
	tone?: 'neutral' | 'blue' | 'green' | 'amber';
};

export type GanttSpec = {
	weeks: number;
	columnLabels?: string[];
	bars: GanttBar[];
	/** When true, chart is shown blurred with a TBD label (schedule not fixed). */
	tbd?: boolean;
};

export type SlideContent = {
	title?: string;
	subtitle?: string;
	body?: string;
	/** Figma proto/share URL or full embed URL — HeaderBody renders as iframe when set */
	embedUrl?: string;
	image?: string;
	imageAlt?: string;
	gridItems?: GridItem[];
	tableRows?: Record<string, string>[];
	metadata?: Record<string, string>;
	gantt?: GanttSpec;
};

export type DeckJSON = {
	name: string;
	type: 'deck';
	slides: {
		position: number;
		layout: SlideLayout;
		content: SlideContent;
	}[];
};

/** Normalized slide for the viewer (mirrors syncdeck `deck_slides` shape). */
export type DeckSlide = {
	id: string;
	workspace_id: string;
	position: number;
	layout: SlideLayout;
	content: SlideContent;
	created_at: string;
	updated_at: string;
};
