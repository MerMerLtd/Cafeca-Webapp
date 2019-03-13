export const List = {
    // can be use on Collection and Cart
    collections:[],
    cartItems:[],
    addItem: function (list, item){
        console.log(list, item)
        list === "cart" 
        ? this.cartItems.push(item)
        : this.collections.push(item);

        this.persistData();
        return item;
    },
    deleteItem: function (list, id){
        const items = list === "cart" ? this.cartItems : this.collections;
        const index = items.findIndex(item => item.id ===id);
        items.splice(index, 1);

        this.persistData();
    },
    updateCount: function (type){
       const newCount = type === "dec" ? this.count -1 : this.count + 1;
       this.count = newCount;
    },

    // updateCount: function (id, newCount){
    //     this.items.findIndex(item => item.id ===id).count = newCount;
    // },

    isItemExist: function (list, id){
        const items = list === "cart" ? this.cartItems : this.collections;
        return items.findIndex(item => item.id === id) !== -1;
    },
    getItemsNums: function (){
        return this.items.length;
    },
    persistData: function (list) {
        // localStorage.setItem("Collections", JSON.stringify(this.items));
        localStorage.setItem(list, JSON.stringify(this.items));
    },
    readStorage: function (list){
        // const storage = JSON.parse(localStorage.getItem("Collections"));
        const storage = JSON.parse(localStorage.getItem("list"));

        const items = list === "cart" ? this.cartItems : this.collections;
        if (storage) items = storage;
    }
}

// export default Collections;