// import addToCard from storage.js
// render pokemons
// event listeners

import { pokemonList } from "../index.js";

const pokemonContainer = document.querySelector("#pokemon-container");
const searchInput = document.getElementById("default-search");
const searchForm = document.getElementById("search-form");

export function renderPokemons(pokemonList) {
  pokemonList.forEach((pokemon) => {
    // new card for each pokemon
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
                <span>Type: ${pokemon.type}</span>
          `;
    pokemonContainer.appendChild(pokemonCard);
  });
}

export function renderOnePokemon(pokemon) {
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
              <span>Type: ${pokemon.type}</span>
        `;

  pokemonContainer.innerHTML = "";
  pokemonContainer.appendChild(pokemonCard);
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const target = pokemonList.find((p) => p.name == searchInput.value);
  renderOnePokemon(target);
});
