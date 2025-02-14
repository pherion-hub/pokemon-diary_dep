import { fetchPokemon } from "./utils/fetch.js";
import { renderPokemons } from "./modules/ui.js";

export let pokemonList = await fetchPokemon();

renderPokemons(pokemonList);
