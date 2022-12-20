<script lang="ts">
import CellComponent from "./CellComponent.svelte";
import { Cell } from "../types/cell-types"
import { generation, started, clear } from "../stores/store";

export let x: number = 50
export let y: number = 30

let emptyList = [...new Array(x*y).keys()].map(n => new Cell(n))
let list: Array<Cell> = [...emptyList]
let interval;

export function populateCells(){
    for (let index = 0; index < list.length; index++) {
        const random = Math.floor(Math.random() * x * y);
        list[random].alive = list[random].alive ? 0 : 1
    }
}

function executeGeneration() {
    var newArray = [];
    let neighboors: number
    let len = x;
    let total = x * y;
    for (let i = 0; i < list.length; i++) {
        neighboors = 0;

        if (i < len) {
            // Top edge
            neighboors += list[total + i - len].alive;
            if (i === 0) {
                neighboors += list[total - 1].alive;
                neighboors += list[i + (len * 2) - 1].alive;
                neighboors += list[total + i - len + 1].alive;
                neighboors += list[i + len + 1].alive;
            } else if (i === len - 1) {
                neighboors += list[0].alive;
                neighboors += list[i - 1].alive;
                neighboors += list[total - 2].alive;
                neighboors += list[total - len].alive;
            } else {
                neighboors += list[i - 1].alive;
                neighboors += list[total + i - len - 1].alive;
                neighboors += list[total + i - len + 1].alive;
                neighboors += list[i + len + 1].alive;
            }
            neighboors += list[i + 1].alive;
            neighboors += list[i + len - 1].alive;
            neighboors += list[i + len].alive;
        } else if (i > len * y - len - 1) {
            // Find the bottom edges
            if (i === total - len) {
                neighboors += list[len - 1].alive;
                neighboors += list[total - 1].alive;
                neighboors += list[i + 1].alive;
                neighboors += list[len - (total - i) + 1].alive;
            } else if (i === total - 1) {
                neighboors += list[0].alive;
                neighboors += list[total - len - 2].alive;
                neighboors += list[total - len * 2].alive;
                neighboors += list[len - 2].alive;
            } else {
                neighboors += list[len - (total - i) - 1].alive;
                neighboors += list[i - len - 1].alive;
                neighboors += list[i + 1].alive;
                neighboors += list[len - (total - i) + 1].alive;
            }
            neighboors += list[i - len].alive;
            neighboors += list[i - len + 1].alive;
            neighboors += list[i - 1].alive;
            neighboors += list[len - (total - i)].alive;
        } else if (i % len === len - 1) {
            // Find right edge
            neighboors += list[i - len - 1].alive;
            neighboors += list[i - len].alive;
            neighboors += list[(i - len + 1) - len].alive;
            neighboors += list[i - 1].alive;
            neighboors += list[i - len + 1].alive;
            neighboors += list[i + len - 1].alive;
            neighboors += list[i + len].alive;
            neighboors += list[i + 1].alive;
        } else if (i % len === 0) {
            // Find the left edge
            neighboors += list[(i + len - 1) - len].alive;
            neighboors += list[i - len].alive;
            neighboors += list[i - len + 1].alive;
            neighboors += list[i + len - 1].alive;
            neighboors += list[i + 1].alive;
            neighboors += list[(i + len - 1) + len].alive;
            neighboors += list[i + len].alive;
            neighboors += list[i + len + 1].alive;
        } else {
            // Cell is not on the edges
            neighboors += list[i - len - 1].alive;
            neighboors += list[i - len].alive;
            neighboors += list[i - len + 1].alive;
            neighboors += list[i - 1].alive;
            neighboors += list[i + 1].alive;
            neighboors += list[i + len - 1].alive;
            neighboors += list[i + len].alive;
            neighboors += list[i + len + 1].alive;
        }
        //      Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        //      Any live cell with two or three live neighbours lives on to the next generation.
        //      Any live cell with more than three live neighbours dies, as if by overpopulation.
        //      Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        if (list[i].alive === 1) {
            console.log(list[i].alive, i)
            if (neighboors < 2 || 3 < neighboors) newArray[i] = 0;
            if (neighboors === 2 || neighboors === 3) newArray[i] = 1;
            if (neighboors > 3) newArray[i] = 0;
        } else {
            if (neighboors === 3) {
                console.log("alive", i)
                newArray[i] = 1;
            }
        }
    }

    // Copy the status over
    for (var a = 0; a < list.length; a++) {
        if (newArray[a] === 1) {
            if (list[a].alive) list[a].old = true;
            else list[a].alive = 1;
        }
        else {
            list[a].alive = 0 
            list[a].old = false
        }
    }
}

started.subscribe(start => {
    if(start) {
        interval = setInterval(() => generation.update(v => v + 1), 100)
    } else clearInterval(interval)
})

generation.subscribe(() => {
    executeGeneration()
})

clear.subscribe(() => {
    list = [...new Array(x*y).keys()].map(n => new Cell(n))
})
</script>

<div class="flex flex-wrap justify-center my-3">
   {#each list as cell}
        <CellComponent {cell} />
   {/each}
</div>