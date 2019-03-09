
export default class CartItems{
    constructor(){
        this.cartItems = [];
    }

    addCartItem (id, name, accessory, price1, price2, img, description) {
        const cartItem = {id, name, accessory, price1, price2, img, description};
        this.cartItems.push(cartItem);

        // Perist data in localStorage
        this.persistData();

        return cartItem;
    }
    deleteCartItem (id) {
        const index = this.cartItems.findIndex(el => el.id === id);
        this.cartItems.splice(index, 1);

        // Perist data in localStorage
        this.persistData();
    }

    isItemInCart(id) {
        return this.cartItems.findIndex(el => el.id === id) !== -1;
    }

    getNumCartItems() {
        return this.cartItems.length;
    }

    persistData() {
        localStorage.setItem('CartItems', JSON.stringify(this.cartItems));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('CartItems'));
        
        // Restoring CartItems from the localStorage
        if (storage) this.cartItems = storage;
    }
};