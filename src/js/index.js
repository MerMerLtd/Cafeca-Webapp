import "../sass/main.scss";
import { elements, renderLoader, clearLoader, makeRequest, getLocation } from "./views/base";

import "./views/swipe";
import { Display } from "./models/display";
// import CartItems from "./models/cartItems";
import Collections from "./models/collections";
// import creditcardModel from "./models/creditCard";
// import possessionsModel from "./models/possessionItems"
import Product from "./models/product";
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
    // 1 生成 products object 
    state.display = Object.create(Display);

    // 2. 取得瀏覽網頁者的location
    try{
        await state.display.getLocation();
    }catch{
        console.log("Something went wrong with getLocation");
    }
    console.log(state.display);
    // 3. 整理畫面（清空畫面）
    productsView.clearResult();
    renderLoader(elements.display);

   if(state.display.location){
       console.log("hi");
    try{
        // 4. 利用瀏覽網頁者的location，取得使用者附近店家的商品
        await state.display.getProducts(state.display.location);
        console.log("hi",state.display);
        // 5 從state.display.products取得商品們在放到畫面上
        // console.log("Success!", Object.values(res.products));
        clearLoader();
        productsView.renderResults(state.display.products);

    }catch{
        console.log("Something went wrong with getProducts");
    }
   }
}
controlProducts();

// Handling card button clicks
elements.display.addEventListener("click", e => {

    const card = e.target.closest(".card");
   
    // console.log(e.target);

    if (e.target.matches(".card__btn")) {
        const goToIndex = parseInt(e.target.dataset.goto, 10);
        productsView.swipeCardList(elements.productList, goToIndex, state.display.products);
        productsView.clearBtns(e.target);
        productsView.renderResults(state.display.products, goToIndex);
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
    const currentID = state.display.products.id;

    console.log(state.display.products);
    console.log(currentID);
    // User has NOT yet add current product to collections
    if (!state.collections.isItemExist(currentID)) {
        // Add item to the state
        const newCollectionItem = state.collections.addItem(
            currentID,
            state.display.products.name, 
            state.display.products.accessory, 
            state.display.products.price1, 
            state.display.products.price2, 
            state.display.products.img, 
            state.display.products.description
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