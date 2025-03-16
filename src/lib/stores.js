import { writable } from 'svelte/store';

// Create your stores here
export const storePopup = writable({});

export function initializeStores() {
    // Initialize any stores here
    // This function is called in +layout.svelte
}