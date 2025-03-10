// fetch 150 pokemons and return data

export async function fetchPokemons() {
  const pokemonList = [];
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
        id: details.id,
        isFavorite: false,
        comment: "",
      });
    });

    await Promise.all(fetches); // waiting for all requests

    return pokemonList;
  } catch (error) {
    console.log(error);
  }
}
