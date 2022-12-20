<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import variantLogo from './assets/variant-colors.svg'
  import Board from './lib/Board.svelte';
  import ControlBar from './lib/ControlBar.svelte';
  import { generation } from './stores/store';
  

  const src = variantLogo
  const titleHTML = "<span class='text-5xl'>Game of Life</span>"
  let cellGeneration: number;

  // Board size
  let x = 50
  let y = 30

  // Stores
  generation.subscribe(value => cellGeneration = value)

  // Controls
  let board: Board;

  function populateBoard() {
    board.populateCells()
  }
</script>

<!-- Example of using HTML
- Svente does not sanitize expressions before injecting HTML.
- Santitize first if data comes from untrusted source. 
- Not sanitizing data will expose users ti ab XSS vulnerability
-->
<header class="title self-center text-transparent">
  {@html titleHTML}
</header>

<main class="flex flex-col justify-center">
    <div class="text-secondary5 my-2">
      Board size: {x}x{y} Generation: {cellGeneration}
     <!--  <input class="w-20 text-center rounded-full" type="number" bind:value={x} min="0" max="200">
      x
      <input class="w-20 text-center rounded-full" type="number" bind:value={y} min="0" max="200"> -->
    </div>

    <!-- 
      Notify Sibling
      - We can bind a Svelte component and call its function
     -->
    <Board bind:this={board} />
    <ControlBar on:populateBoard="{populateBoard}" />
</main>

<footer class="absolute bottom-0 self-center">
  <div class="flex items-center justify-center">
    <a href="https://variant.no" target="_blank" rel="noreferrer"> 
      <!-- Shorthand -->
      <img {src} class="logo" alt="Variant Logo" />
    </a>

    <div class="text-5xl">+</div>

    <a href="https://svelte.dev" target="_blank" rel="noreferrer"> 
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  
    <div>Game is based on 
      <a class="font-medium text-blue-600" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a> 
    </div>  
</footer>

<style>
  @import "app.css";
  .title {
    background: linear-gradient(120deg, #E61A6B, #423D89, #03DAC6);
    width: max-content;
    background-clip: text;
    -moz-background-clip: text;
    -webkit-background-clip: text;
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>