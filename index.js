import { fetchPokemons } from "./utils/fetch.js";
import { renderPokemons } from "./modules/ui.js";
import { setupEventListeners } from "./modules/ui.js";
import { getCartItems } from "./modules/storage.js";

let bodyId = document.querySelector("body").id;

window.addEventListener("load", async () => {
  const pokemonList = await fetchPokemons();
  const favoriteList = getCartItems();

  pokemonList.forEach((pokemon) => {
    pokemon.isFavorite = favoriteList.some((p) => p.id === pokemon.id);
  });

  if (bodyId === "journal") {
    renderPokemons(favoriteList);
  } else {
    renderPokemons(pokemonList);
  }

  setupEventListeners(pokemonList);
});
