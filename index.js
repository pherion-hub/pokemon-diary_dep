import { fetchPokemon } from "./utils/fetch.js";
import { renderPokemons } from "./modules/ui.js";

const pokemonList = await fetchPokemon();

renderPokemons(pokemonList);
