export const List = {
    // can be use on Collection and Cart
    collections:[],
    cartItems:[],
    addItem: function (item){
        // const item = {id, name, accessory, price1, price2, img, description}
        this.items.push(item);

        this.persistData();
        return item;
    },
    deleteItem: function (id){
        const index = this.items.findIndex(item => item.id ===id);
        this.items.splice(index, 1);

        this.persistData();
    },
    updateCount: function (type){
       const newCount = type === "dec" ? this.count -1 : this.count + 1;
       this.count = newCount;
    },

    // updateCount: function (id, newCount){
    //     this.items.findIndex(item => item.id ===id).count = newCount;
    // },

    isItemExist: function (id){
        return this.items.findIndex(item => item.id === id) !== -1;
    },
    getItemsNums: function (){
        return this.items.length;
    },
    persistData: function (type) {
        // localStorage.setItem("Collections", JSON.stringify(this.items));
        localStorage.setItem(type, JSON.stringify(this.items));
    },
    readStorage: function (type){
        // const storage = JSON.parse(localStorage.getItem("Collections"));
        const storage = JSON.parse(localStorage.getItem("type"));

        if (storage) this.items = storage;
    }
}

// export default Collections;