<script lang="ts">
import { createEventDispatcher } from "svelte";
import { generation, started, clear } from "../stores/store";

let hasStarted
const dispatch = createEventDispatcher()
const classList="rounded-full text-secondary6 bg-secondary1 py-2 w-20 mx-1"

// Store subscribes
started.subscribe(value => hasStarted = value)

// functions
function populateBoard() {
    dispatch('populateBoard')
}

function updateStarted() {
    started.update(v => !v)
}

function next(){
    generation.update(v => v + 1)
}

function clearBoard() {
    clear.update(v => !v)
}
</script>

<div class="flex justify-center">
    <button class="{classList}" on:click={populateBoard}>Populate</button>
    {#if !hasStarted}
        <button class="{classList}" on:click={updateStarted}>Start</button>
    {/if}

    {#if hasStarted}
        <button class="{classList}" on:click={updateStarted}>Stop</button>
    {/if}
    <button class="{classList}" on:click={next}>Next</button>
    <button class="{classList}" on:click={clearBoard}>Clear</button>
</div>
