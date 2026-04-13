import type { PageServerLoad } from './$types';
import type { DeckJSON } from '$lib/types';
import deckData from '$lib/data/pimmie-ovo-starstruck-deck.json';

export const load: PageServerLoad = async () => {
	return { deck: deckData as DeckJSON };
};
