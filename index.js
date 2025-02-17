import { fetchPokemon } from "./utils/fetch.js";
import { renderPokemons } from "./modules/ui.js";

export const pokemonList = await fetchPokemon();

renderPokemons(pokemonList);
