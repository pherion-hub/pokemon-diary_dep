// Import function to add Pokémon to the cart

import { getCartItems, deleteFromCart, addToCart } from "./storage.js";

// Select DOM elements
const pokemonContainer = document.querySelector("#pokemon-container");
const searchInput = document.getElementById("default-search");
const searchForm = document.getElementById("search-form");

// Function to render Pokémon cards
export function renderPokemons(list) {
  pokemonContainer.innerHTML = ""; // Clear the container before rendering

  // Get all Favorites from Local Storage
  const cart = getCartItems();

  list.forEach((pokemon) => {
    pokemon.isFavorite = cart.some((p) => p.id === pokemon.id);
    // Create a card for each Pokémon
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

    // Check if pokemon in  Local Storage
    const isFavorite = cart.some((p) => p.name === pokemon.name);

    // isFavorite ? - icon red, if not - icon white
    const heartIconSrc = isFavorite
      ? "Icons/299063_heart_icon-red.svg"
      : "Icons/299063_heart_icon-white.svg";

    pokemonCard.innerHTML = `
      <h3 class="text-2xl font-bold mb-4">${pokemon.name}</h3>
      <img data-id="${
        pokemon.id
      }" class="absolute right-[16px] top-[21px] h-[25px] cursor-pointer heart-icon" src="${heartIconSrc}"
    alt="heart">
      <img class="h-[50px] mb-4" src="${pokemon.image}" alt="${pokemon.name}">
      <span>Type: ${pokemon.type.join(", ")}</span>
    `;
    pokemonContainer.appendChild(pokemonCard);
  });
}

// Function to add event listeners
export function setupEventListeners(pokemonList) {
  // Add a single click event listener on the container (event delegation)
  pokemonContainer.addEventListener("click", (event) => {
    // If the user clicks on the heart icon, toggle the favorite status
    if (event.target.classList.contains("heart-icon")) {
      toggleFavorite(event.target);
    }

    // If the user clicks on a Pokémon's add-to-cart icon
    if (event.target.matches("img[data-id]")) {
      const pokemonId = event.target.getAttribute("data-id");
      const pokemon = pokemonList.find((p) => p.id == pokemonId);

      if (pokemon.isFavorite === true) {
        pokemon.isFavorite = false;
        deleteFromCart(pokemon.id);
      } else {
        pokemon.isFavorite = true;
        addToCart(pokemon);
      }

      if (document.body.id === "journal") {
        renderPokemons(getCartItems());
      }
    }
  });

  // Search Pokémon by name or type
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchValue = searchInput.value.toLowerCase(); // Convert input to lowercase

    // Filter Pokémon based on name or type
    const foundPokemons = pokemonList.filter(
      (p) =>
        p.name.toLowerCase().includes(searchValue) ||
        p.type.some((t) => t.includes(searchValue))
    );

    if (foundPokemons.length > 0) {
      renderPokemons(foundPokemons); // Render the found Pokémon
    } else {
      pokemonContainer.innerHTML =
        "<p class='text-red-500'>Pokémon not found!</p>";
    }
  });
}

// Function to toggle favorite (heart) icon
function toggleFavorite(icon) {
  const isFavorite = icon.src.includes("299063_heart_icon-red.svg");
  icon.src = isFavorite
    ? "Icons/299063_heart_icon-white.svg"
    : "Icons/299063_heart_icon-red.svg";
}
