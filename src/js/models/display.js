import { makeRequest, getLocation } from "../views/base";
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
            console.log(res);
            this.products = Object.values(res.products);
            return Promise.resolve(true);
        })
        .catch(error => {
            console.log("Something went wrong at makeRequest", error);
        });
    },
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