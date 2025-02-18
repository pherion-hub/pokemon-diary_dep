// addCart(pokemon)
export function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// add to localStorage
export function addToCart(pokemon) {
  const cart = getCartItems();
  cart.push(pokemon);

  // update cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function deleteFromCart(pokemonId) {
  const cart = getCartItems();
  // const pokemonToDelete = JSON.parse(cart.find((i) => i.id === pokemonId));

  // localStorage.removeItem("cart", JSON.stringify(cart));

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == pokemonId) {
      cart.splice(i, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
