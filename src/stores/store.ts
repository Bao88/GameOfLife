import { writable } from "svelte/store";

export const started = writable(false)
export const generation = writable(0)
export const clear = writable(false)

// reset
clear.subscribe(() => {
    generation.set(0)
})