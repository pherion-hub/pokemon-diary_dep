// get favorite list from localStorage
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

  // check if pokemon with id pokemonId is in cart and delete it
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == pokemonId) {
      cart.splice(i, 1);
    }
  }
  // update cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// get comments from localStorage
export function getComments(pokemonId) {
  const comments = JSON.parse(localStorage.getItem("comments")) || {};
  return comments[pokemonId] || [];
}

// add comment to localStorage
export function addComment(pokemonId, comment) {
  const comments = JSON.parse(localStorage.getItem("comments")) || {};
  if (!comments[pokemonId]) {
    comments[pokemonId] = [];
  }
  comments[pokemonId].push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));
}
