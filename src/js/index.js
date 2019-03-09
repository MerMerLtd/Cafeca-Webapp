import "../sass/main.scss";
import { elements, renderLoader, clearLoader, makeRequest, getLocation } from "./views/base";

import "./views/swipe";
// import CartItems from "./models/cartItems";
import Collections from "./models/collections";
// import creditcardModel from "./models/creditCard";
// import possessionsModel from "./models/possessionItems"
import Products from "./models/products";
// import userModel from "./models/userModel";

// import * as collectionsView from "./views/collectionsView";
// import * as possessionsView from "./views/possessionsView";
import * as productsView from "./views/productView";
import * as cartView from "./views/cartView";


//================================
//--------------- firebase -------

import firebase from "firebase/app";
import "firebase/database";
import { get } from "https";
const config = {
  // http://blog.kenyang.net/2017/08/25/firebase-realtime-database-web
  apiKey: "AIzaSyBNulErK-OblwR4nCl5oB4C62q4ytrl_RY",
  authDomain: "cafeca-webapp.firebaseapp.com",
  databaseURL: "https://cafeca-webapp.firebaseio.com",
  projectId: "cafeca-webapp"
}
firebase.initializeApp(config);



 
/** Global state of the app
 * - products object
 * - cart object
 * - collections object
 * - possessions object
 */
const state = {};

//===========================================
//----- products || display controller ------
const controlProducts = async () => {
    // 1. 取得瀏覽網頁者的location
    getLocation()
    .then(res => {
        console.log({
            lat: res.coords.latitude || res.location.lat,
            lng: res.coords.longitude || res.location.lng
        });
        return {
            lat: res.coords.latitude || res.location.lat,
            lng: res.coords.longitude || res.location.lng
        };
    })
    // 2. 利用瀏覽網頁者的location，取得使用者附近店家的商品，並呈現在畫面上
    .then(location => {  
        // 2.1 生成 products object 
        state.products = Object.create(Products);   
        // 2.2 prepare UI for the result
        productsView.clearResult();
        renderLoader(elements.display);
        // 2.3 取得使用者附近店家的商品
        const opts = {
            method: "GET",
            url: `https://cafeca-webapp.firebaseio.com/.json`, //這裡之後要使用位置資訊
            headers: {
                "Access-Control-Allow-Origin" :`https://cafeca-webapp.firebaseio.com/`,
            }
        }
        makeRequest(opts)
        .then( res => {
            // 2.4 把取得的商品們先存到state.products也就是products的model裡面
            state.products = Object.values(res.products);
            // 2.5 從state.products取得商品們在放到畫面上
            // console.log("Success!", Object.values(res.products));
            clearLoader();
            productsView.renderResults(state.products);
        })
        .catch(error => {
            console.log("Something went wrong", error);
        });
    })
    .catch( error => {
        console.log("Something went wrong: index", error);
    });
};
controlProducts();

// Handling card button clicks
elements.display.addEventListener("click", e => {

    const card = e.target.closest(".card");
   
    // console.log(e.target);

    if (e.target.matches(".card__btn")) {

        const goToIndex = parseInt(e.target.dataset.goto, 10);
        productsView.swipeCardList(elements.productList, goToIndex);
        productsView.clearBtns(e.target);
        productsView.renderResults(state.products, goToIndex);

    } else if (e.target.matches(".product__switch, .product__switch *")) {
        // toggle price
        //....

    } else if (e.target.matches(".product__btn-collections, .product__btn-collections *")) {
        // collections controller: add product to collections
        controlCollections();
    }else if (e.target.matches(".btn--cart, .btn--cart *")) {
        // cart controller: add product to cart
        controlCart();
    }
});
//===========================================
//------------ cartItems controller ---------
const controlCartitems = () => {};

//===========================================
//------------ collections controller ---------
const controlCollections = () => {
    if (!state.collections) state.collections = Object.create(Collections);
    const currentID = state.products.id;

    console.log(state.products);
    console.log(currentID);
    // User has NOT yet add current product to collections
    if (!state.collections.isItemExist(currentID)) {
        // Add item to the state
        const newCollectionItem = state.collections.addItem(
            currentID,
            state.products.name, 
            state.products.accessory, 
            state.products.price1, 
            state.products.price2, 
            state.products.img, 
            state.products.description
        );
        // Toggle the both collection button in cart and display
        

        // Add item to UI list
       

    // User HAS collect current product
    } else {
        // Remove item from the state
        state.collections.deleteItem(currentID);

        // Toggle the both collection button in cart and display
        

        // Remove item from UI list
       
    }
    // collectionItemsView.toggleLikeMenu(state.collectionItems.getNumCollectionItems());
};



// 打開購物車
elements.cart.addEventListener("click", e => {
    if(e.target.matches(".cart__toogle--logo")){
        cartView.cartToggle();
    }
});