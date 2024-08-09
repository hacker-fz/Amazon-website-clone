export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart = [
        {
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2
        }
    ]
}

export function saveCart(){
    localStorage.setItem('cart' , JSON.stringify(cart))
}

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

    saveCart()
}

export function removeCart(productId){
    const newCart = [];

    cart.forEach((item) => {
        if(item.productId !== productId){
            newCart.push(item)
        }
    })
    cart = newCart;

    saveCart()
}