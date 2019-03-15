import { makeRequest, getLocation } from "../views/base";
import { Set } from "./set";
import uniqid from "uniqid";

export const Display = {
    getLocation: function () {
        return getLocation()
        .then(res => {
            // return {
            //     lat: res.coords.latitude || res.location.lat,
            //     lng: res.coords.longitude || res.location.lng
            // };
            this.location = {
                lat: res.coords.latitude || res.location.lat,
                lng: res.coords.longitude || res.location.lng
            };
            return Promise.resolve(true);
            // console.log(this.location);
        })
        .catch(error => {
            console.log("Something went wrong in getLocation", error);
        });
    },
    getProducts: function(location) {
        const opts = {
            method: "GET",
            // url: `https://cafeca-webapp.firebaseio.com/.json${location? location: null}`, //這裡之後要使用位置資訊
            url: `https://cafeca-webapp.firebaseio.com/.json`, 
            headers: {
                "Access-Control-Allow-Origin" :`https://cafeca-webapp.firebaseio.com/`,
            }
        };
        return makeRequest(opts)
        .then(res => {
            // seperate main products
            const products = Object.values(res.products)
            .filter(product => product.main)
            // Using Set model to create set
            .map(product => {
                const set = Object.create(Set);
                // 給每個set 一個unique Id
                set.id = uniqid(); // 等等我突然意識到id似乎不該放在這裏
                // set.id = product.id;
                // 把每個 main product 加進set
                set.main = product;
                return set;
            });
            products.map((set, i) => {
                // seperate main products
                const accessories = Object.values(res.products)
                .filter(product => !product.main);
                // 產生當天內會有一致性的隨機亂數（用 i 使每個set分配到不同的accessory）
                let index = Math.floor((new Date().getTime()/86400000)+ i)% accessories.length // consistent hashing
                // 每個 set只加進 一個由亂數決定的 accessory
                set.accessory = accessories[index];
                // 決定好每個set裡面的 main product 以及 accessory 就可以計算整個set 的價格了
                // ?? 如何決定使用 discountPercentage 還是 discountMinus
                set.price = set.withSet ? (set.main.price + set.accessory.price) - set.discountMinus : set.main.price;
            });

            this.products = products;
            // console.log(this);
            // console.log(this.products)
            return Promise.resolve(true);
        })
        .catch(error => {
            console.log("Something went wrong at makeRequest", error);
        });
    },
    toggleSet: function (product){
        const updateSet = !product.withSet;
        product.withSet = updateSet;
        // product.price = product.withSet ? (product.main.price + product.accessory.price) - product.discountMinus : product.main.price;
    }
}

// const newProducts = Object.values(res.products).map(product => {
//     console.log("product", product);
//     let newProduct = Object.create(Product);
//     newProduct.id = product.id;
//     newProduct.name = product.name;
//     // newProduct.accessory = product.accessory;
//     newProduct.description = product.description;
//     newProduct.img = product.img;
//     // newProduct.price1 = product.price1;
//     newProduct.price = product.price;
//     return newProduct;
// });

// console.log(newProducts);
// state.products = newProducts;