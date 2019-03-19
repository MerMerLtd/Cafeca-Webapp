export const Cart = {
    cartItems:[],
    addItem: function (item){
        // 為了不動到原來的data 所有複製一個
        // 有沒有含set 對我來說是兩個不同的東西
        let newItem = {...item, 
            count: 1, 
            id: item.withSet
                ? item.id + "set"
                : item.id,
            price: item.withSet
                ? (item.main.price + item.accessory.price) - item.discountMinus 
                : item.main.price,
            img: item.withSet
                ? item.accessory.img
                : item.main.img,
            withSet: item.withSet,
            discountPercentage: item.discountPercentage,
            discountMinus: item.discountMinus,
            };

        let index = this.cartItems.findIndex(i => i.id === newItem.id);
        
        // 如果這個組合已經在list裡面了
        if(index !== -1){
            this.cartItems[index].count++;

            this.persistData();
            return this.cartItems[index];
        }
        
        //如果這個組合還不在list裡面
        this.cartItems.push(newItem);

        this.persistData();
        return newItem;
    },
    deleteItem: function (id){    
        const index = this.cartItems.findIndex(item => item.id === id);
        this.cartItems.splice(index, 1);
        this.persistData();
    },
    updateCount: function (id, type){
        const index = this.cartItems.findIndex(item => item.id === id);
        const oldCount = this.cartItems[index].count;
        let newCount;
        switch (type){
            case "dec":
                oldCount > 0 
                ? newCount = oldCount - 1
                : newCount = 0
                break;
            case "inc":
                oldCount < 10 
                ? newCount = oldCount + 1
                : newCount = 10
                break;
            default:
                return;
        }
        // const newCount = type === "dec" ? oldCount -1 : oldCount + 1;
        this.cartItems[index].count = newCount;
        // console.log(this.cartItems[index].count);
    },
    updateProduct: function (id){
        const index = this.cartItems.findIndex(item => item.id === id);
        const item = this.cartItems[index];
        const oldItem = {...item};
        item.withSet = !oldItem.withSet;
       
        item.price = !oldItem.withSet
        ? ( (item.main.price + item.accessory.price) - item.discountMinus ) 
        : (item.main.price) ;
        item.img = !oldItem.withSet
        ? item.accessory.img
        : item.main.img;
       
        return item;
    },
    isInCart: function(id){
        return this.cartItems.findIndex(item => item.id === id) !== -1 
        ? this.cartItems.findIndex(item => item.id === id)
        : false;
    },
    persistData: function(){
        console.log(this.cartItems)
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
    readStorage: function() {
        const storage = JSON.parse(localStorage.getItem('cartItems'));
        console.log(storage);
        
        // Restoring likes from the localStorage
        if (storage) this.cartItems = storage;
    }
}
