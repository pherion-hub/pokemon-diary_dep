// import addToCard from storage.js
// render pokemons
// event listeners

import { pokemonList } from "../index.js";

const pokemonContainer = document.querySelector("#pokemon-container");
const searchInput = document.getElementById("default-search");
const searchForm = document.getElementById("search-form");

export function renderPokemons(list) {
  pokemonContainer.innerHTML = ""; // Clear a container before render

  list.forEach((pokemon) => {
    // Create a card
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add(
      "rounded",
      "border",
      "flex",
      "flex-col",
      "items-center",
      "p-4",
      "shadow"
    );
    pokemonCard.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <p>Name: <span>${pokemon.name}</span></p>
      <span>Type: ${pokemon.type.join(", ")}</span>
    `;
    pokemonContainer.appendChild(pokemonCard);
  });
}

// Search by name
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.toLowerCase(); // To lower case

  const foundPokemon = pokemonList.find(
    (p) => p.name.toLowerCase() === searchValue
  );

  if (foundPokemon) {
    renderPokemons([foundPokemon]); // Render one pokemon
  } else {
    pokemonContainer.innerHTML =
      "<p class='text-red-500'>Pokémon not found!</p>";
  }
});
