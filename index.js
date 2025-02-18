import { fetchPokemons } from "./utils/fetch.js";
import { renderPokemons } from "./modules/ui.js";
import { setupEventListeners } from "../modules/ui.js";

window.addEventListener("load", async () => {
  const pokemonList = await fetchPokemons();
  renderPokemons(pokemonList);
  setupEventListeners(pokemonList);
});
