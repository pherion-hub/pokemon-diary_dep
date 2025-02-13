// You can work here or download the template
const pokemonContainer = document.querySelector("#pokemon-container");
const pokemonList = [];

async function fetchPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await response.json();

    const fetches = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();

      pokemonList.push({
        name: details.name,
        image: details.sprites.other.showdown.front_shiny,
        type: details.types.map((t) => t.type.name),
      });
    });

    await Promise.all(fetches); // waiting for all requests
    renderPokemons(pokemonList);
  } catch (error) {
    console.log(error);
  }
}

function renderPokemons(pokemonList) {
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

fetchPokemon();
