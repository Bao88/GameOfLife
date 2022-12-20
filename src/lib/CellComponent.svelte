<script lang="ts">
    import type { Cell } from "../types/cell-types";
    export let cell: Cell
   
    $: cellClass = cell ? `cell-size ${cell.old ? 'bg-primary' : cell.alive ? 'bg-secondary3' : 'bg-secondary5'}` : ''

    function toggleCell() {
        cell.alive = cell.alive === 0 ? 1 : 0 
        cell.old = false
    }
</script>

<button class="{cellClass}" on:click={toggleCell}>
    <!-- {id} -->
</button>

<style>
.cell-size {
    width: 20px; 
    height: 20px;
    border: 1px solid black;
}
</style>