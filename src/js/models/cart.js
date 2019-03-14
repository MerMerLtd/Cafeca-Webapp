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
                : item.main.price
            };

        let index = this.cartItems.findIndex(i => i.id === newItem.id);
        
        // 如果這個組合已經在list裡面了
        if(index !== -1){
            this.cartItems[index].count++;

            // this.persistData();
            return index;
        }
        
        //如果這個組合還不在list裡面
        this.cartItems.push(newItem);

        // this.persistData();
        return newItem;
    },
    deleteItem: function (id){    
        const index = this.cartItems.findIndex(item => item.id === id);
        this.cartItems.splice(index, 1);
    },
}
