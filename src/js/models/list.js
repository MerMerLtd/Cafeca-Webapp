export const List = {
    // can be use on Collection and Cart
    items:[],
    addItem: function (id, name, accessory, price1, price2, img, description){
        const item = {id, name, accessory, price1, price2, img, description}
        this.items.push(item);

        this.persistData();
        return item;
    },
    deleteItem: function (id){
        const index = this.items.findIndex(item => item.id ===id);
        this.items.splice(index, 1);

        this.persistData();
    },
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