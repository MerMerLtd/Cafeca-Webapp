import { makeRequest } from "../views/base";

export const Order = {
    orderData:{},
    createOrderData: function (cartItems){
        const orderPrice = cartItems.reduce((acc, cur, idx) => {
            return acc += cur.price * cur.count;
        }, 0);
        const orderProducts = cartItems.map(item => { return {...item}});
        this.orderData = {
            price: orderPrice, // number
            products: orderProducts, // []
        }
        return this.orderData;
    },
    postOrder: function(orderData){
        const orderDate = () => {
            const date = new Date();
            const mm = date.getMonth() + 1;
            const dd = date.getDate();
            const hh = date.getHours();
            const mi = date.getMinutes();
            const ss = date.getSeconds();
        
            return [date.getFullYear(), "-" +
                (mm > 9 ? '' : '0') + mm, "-" +
                (dd > 9 ? '' : '0') + dd, " " +
                (hh > 9 ? '' : '0') + hh, ":" +
                (mi > 9 ? '' : '0') + mi, ":" +
                (ss > 9 ? '' : '0') + ss
            ].join('');
        };
        const opts = {
            method: "POST",
            url: `https://cafeca-webapp.firebaseio.com/orders.json`, 
            payload: JSON.stringify({...orderData, date: orderDate()}),
            header: {
             "Content-type": "",
             "application/x-www-form-urlencoded": "",
             "charset=UTF-8": "",
            }      
        };
        return makeRequest(opts)
        .then(res => Promise.resolve(true))
        .catch(error => console.log(error, "POST"));
    },
    getOrders: function (){
        const opts = {
            method: "GET",
            url: `https://cafeca-webapp.firebaseio.com/orders.json`,
            headers: {
                "Access-Control-Allow-Origin" :`https://cafeca-webapp.firebaseio.com/`,
            }
        };
        return makeRequest(opts)
        .then(res => {
            if(res){
                this.purchased = [];
                Object.keys(res).map(key => {
                    this.purchased = this.purchased.concat([...res[key].products])
                });
            }
            return Promise.resolve(true);
        })
        .catch(err => {
            console.log(err);
        })
    }
}



// const newItem = {...item};
//             this.orderList.push({
//                 main: newItem.main.name,
//                 accessory: newItem.withSet 
//                     ? newItem.accessory.name 
//                     : null,
//                 price: newItem.price,
//                 count: newItem.count,
//                 img: newItem.withSet 
//                 ? newItem.accessory.img 
//                 : newItem.main.img,
//             });

