class Cart {
    cartItems
    #localStorageKey

    constructor(localStorageKey) {
        cart.#localStorageKey = localStorageKey
        cart.#loadStorage()
    }

    #loadStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey))
        if (!this.cartItems) {
            this.cartItems = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryId: '2'
                }
            ]
        }
    }


    saveCart() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(cart))
    }

    addtoCart(productId) {
        const selectedQuantity = Number(document.querySelector(`.js-dropdown[data-product-id="${productId}"]`).value)
        let matchingItem

        this.cartItems.forEach((item) => {
            if (productId === item.productId) matchingItem = item;
        })

        if (matchingItem) {
            matchingItem.quantity += selectedQuantity
        }
        else {
            this.cartItems.push({
                productId: productId,
                quantity: selectedQuantity,
                deliveryId: '1'
            })
        }

        this.saveCart()
    }


    removeCart(productId) {
        const newCart = [];

        this.cartItems.forEach((item) => {
            if (item.productId !== productId) {
                newCart.push(item)
            }
        })
        this.cartItems = newCart;

        this.saveCart()
    }


    updateDeliveryOption(productId, deliveryId) {
        let matchingItem

        this.cartItems.forEach((item) => {
            if (productId === item.productId) matchingItem = item;
        })

        matchingItem.deliveryId = deliveryId

        this.saveCart()
    }

}


const cart = new Cart('cart-oops')
const buisnessCart = new Cart('buisness-cart')
