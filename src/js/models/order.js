
export const Order = {
    orderList:[],
    getOrder: function (cartList){
        cartList.forEach(item => {
            const newItem = {...item};
            this.orderList.push({
                main: newItem.main.name,
                accessory: newItem.withSet 
                    ? newItem.accessory.name 
                    : null,
                price: newItem.price,
                count: newItem.count,
                img: newItem.withSet 
                ? newItem.accessory.img 
                : newItem.main.img,
            });
        });
    },
    postOrder: function(){},
    cleanOrder: function(){}
}
