

// addCart(pokemon)
export function getCartItems(pokemon) {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// add to localStorage
export function addToCart(product) {
    const cart = getCartItems();
    cart.push(product);
    
    // update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// addCart(pokemon)
// add to localStorage
