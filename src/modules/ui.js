// Import function to add Pokémon to the cart

import { getCartItems, deleteFromCart, addToCart } from "./storage.js";
import iconRed from "../Icons/299063_heart_icon-red.svg";
import iconWhite from "../Icons/299063_heart_icon-white.svg";

// Select DOM elements
const pokemonContainer = document.querySelector("#pokemon-container");
const searchInput = document.getElementById("default-search");
const searchForm = document.getElementById("search-form");
const bodyId = document.querySelector("body").id;


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
    const heartIconSrc = isFavorite ? iconRed : iconWhite;

    pokemonCard.innerHTML = `
      <h3 class="text-2xl font-bold mb-4">${pokemon.name}</h3>
      <img data-id="${
        pokemon.id
      }" class="absolute right-[16px] top-[21px] h-[25px] cursor-pointer heart-icon" src="${heartIconSrc}"
    alt="heart">
      <img class="h-[50px] mb-4" src="${pokemon.image}" alt="${pokemon.name}">
      <span>Type: ${pokemon.type.join(", ")}</span>
      <input data-id="${
        pokemon.id
      }" id="comment-input" type="text" class="w-full mt-4 border p-2" placeholder="Add a comment" value="${
        pokemon.comment || ""
      }">
      <button data-id="${
        pokemon.id
      }" id="add-comment" class="bg-blue-500 text-white px-4 py-2 mt-4">Add Comment</button>
    `;
    pokemonContainer.appendChild(pokemonCard);
  });
}

// Function to add event listeners
export function setupEventListeners(pokemonList) {
  
  const addCommentButtons = document.querySelectorAll("#add-comment");
  addCommentButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (event.target.matches("button[data-id]")) {
        const pokemonId = event.target.getAttribute("data-id");
        
        const pokemon = pokemonList.find((p) => p.id == pokemonId);
      
      
     
      const targetInput = document.querySelector(`input[data-id="${pokemonId}"]`);
      console.log(targetInput.value, pokemonId);
      }
      
      
      
    })
  });
 

// commentInput.addEventListener("input", (e) => {
//   console.log(e.target.value);});
  // Add a single click event listener on the container (event delegation)
  pokemonContainer.addEventListener("click", (event) => {
    // If the user clicks on a Pokémon's add-to-cart icon
    if (event.target.matches("img[data-id]")) {
      const pokemonId = event.target.getAttribute("data-id");
      const pokemon = pokemonList.find((p) => p.id == pokemonId);
      toggleFavorite(event.target);
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
    const foundPokemons =
      bodyId === "journal"
        ? getCartItems().filter(
            (p) =>
              p.name.toLowerCase().includes(searchValue) ||
              p.type.some((t) => t.includes(searchValue))
          )
        : pokemonList.filter(
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
  icon.src = icon.src.includes(iconRed) ? iconWhite : iconRed;
}
