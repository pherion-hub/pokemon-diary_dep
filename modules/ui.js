// import addToCard from storage.js
// render pokemons
// event listeners

import { pokemonList } from "../index.js";
import { fetchPokemon } from "../utils/fetch.js";
import { addToCart } from "./storage.js";

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
      "shadow",
      "relative"
    );
    pokemonCard.innerHTML = `
    <h3 class = "text-2xl font-weight: 700 mb-4">${pokemon.name}</h3>
    <img data-id="${pokemon.id}" id = "fave-icon" class = "absolute right-[16px] top-[21px] h-[25px]" src="Icons/299063_heart_icon 2.svg" alt="heart">
      <img class = "h-[50px] mb-4" src="${pokemon.image}" alt="${pokemon.name}">
      <span>Type: ${pokemon.type.join(", ")}</span>
    `;
    pokemonContainer.appendChild(pokemonCard);
    const addToCardButtons = document.querySelectorAll("[data-id]");
    
    addToCardButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const pokemonId = event.target.dataset.id;
        console.log(pokemonId);
        addToCart(pokemonId);
      });
    });

    // Function Heart Journal red
    const faveIcons = document.querySelectorAll("#fave-icon");
    // console.log(faveIcon);

    let isFavourit = false;

    faveIcons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        
        isFavourit = !isFavourit;
        isFavourit
          ? (event.target.src = "Icons/299063_heart_icon.svg")
          : (event.target.src = "Icons/299063_heart_icon 2.svg");
      });
    });
  });
}

// Search by name or type
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.toLowerCase(); // To lower Case

  const foundPokemons = pokemonList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchValue) ||
      p.type.some((t) => t.includes(searchValue))
  );

  if (foundPokemons.length > 0) {
    renderPokemons(foundPokemons); // Render foundPokemons
  } else {
    pokemonContainer.innerHTML =
      "<p class='text-red-500'>Pokémon not found!</p>";
  }
});

export function setupEventListeners(products) {
  // Fügt dem gesamten Dokument einen Klick-EventListener hinzu
  document.addEventListener('click', (event) => {
    // Überprüft, ob das geklickte Element eine Button mit data-id-Attribut ist
    if (event.target.matches('button[data-id]')) {
      // Holt die Produkt-ID aus dem geklickten Button
      const productId = event.target.getAttribute('data-id');

      // Findet das entsprechende Produkt aus dem Array der Produkte
      const product = products.find((p) => p.id == productId);

      // Falls das Produkt gefunden wurde, wird es in den Warenkorb hinzugefügt und eine Alert angezeigt
      if (product) {
        addToCart(product);
        alert(`${product.title} wurde zum Warenkorb hinzugefügt!`);
      }
    }
  });
}