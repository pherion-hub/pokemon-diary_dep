// import addToCard from storage.js
// render pokemons
// event listeners

const pokemonContainer = document.querySelector("#pokemon-container");

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
