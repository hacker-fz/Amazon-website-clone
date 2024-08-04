export const cart = []

export function addtoCart(productId) {
    const selectedQuantity = Number(document.querySelector(`.js-dropdown[data-product-id="${productId}"]`).value)
    let matchingItem

    cart.forEach((item) => {
        if (productId === item.productId) matchingItem = item;
    })

    if (matchingItem) {
        matchingItem.quantity += selectedQuantity
    }
    else {
        cart.push({
            productId: productId,
            quantity: selectedQuantity
        })
    }
}