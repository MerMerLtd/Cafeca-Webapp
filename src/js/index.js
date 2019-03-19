import "../sass/main.scss";
import { elements, renderLoader, clearLoader, makeRequest, getLocation } from "./views/base";

import "./views/swipe";
import "./models/creditCard";

import { Display } from "./models/display";
import { Collections } from "./models/collections";
import { Cart } from "./models/cart";
import { Order } from "./models/order";
import { CreditCard } from "./models/creditCard";
import { Assets } from "./models/assets";

import * as displayView from "./views/displayView";
import * as cartView from "./views/cartView";
import * as collectionsView from "./views/collectionsView";
import * as orderView from "./views/orderView";
import * as possessionsView from "./views/possessionsView";
import * as assetsView from "./views/assetsView";


//================================
//--------------- firebase -------

import firebase from "firebase/app";
import "firebase/database";
import { get } from "https";
import { isNumber } from "util";
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
window.state = state;//test purpose


//===========================================
//--------- Order controller (post)----------
const controlOrder = async () => {
    if(!state.order) state.order = Object.create(Order);

    // 共用displayView method 整理畫面（清空畫面）
    displayView.clearResult(elements.voucherList);
    renderLoader(elements.possessions);

    // makeRequest to get purchased goods
    try{
        await state.order.getOrders();
        clearLoader();
        displayView.renderPurchasedProducts(state.order.purchased);
        
    }catch(error){
        console.log("Something went wrong with getOrders", error)
    }
    
}
controlOrder();
//===========================================
//----- products || display controller ------
const controlProducts = async () => {
    // 1 生成 products object 
    state.display = Object.create(Display);

    // 2. 取得瀏覽網頁者的location
    try{
        await state.display.getLocation();
    }catch(error){
        console.log("Something went wrong with getLocation", error);
    }

    // 3. 整理畫面（清空畫面）
    displayView.clearResult(elements.productList);
    renderLoader(elements.display);
    if(state.display.location){
    try{
        // 4. 利用瀏覽網頁者的location，取得使用者附近店家的商品
        await state.display.getProducts(state.display.location);
        // console.log(state.display);
        // 5 從state.display.products取得商品們在放到畫面上
        clearLoader();
        displayView.renderResults(state.display.products);

    }catch(error){
        console.log(error);
    }
   }
}
controlProducts();
// Handling card button clicks
elements.display.addEventListener("click", e => {

    if (e.target.matches(".card__btn")) {
        const goToIndex = parseInt(e.target.dataset.goto, 10);
        displayView.swipeCardList(elements.productList, goToIndex, state.display.products);
        displayView.clearBtns(e.target);
        // displayView.clearResult();
        // displayView.renderResults(state.display.products, goToIndex);
        displayView.reRenderButtons(goToIndex, elements.productList.children.length, elements.displayBtnBox);

    }

});
elements.possessions.addEventListener("click", e => {

    if (e.target.matches(".card__btn")) {
        const goToIndex = parseInt(e.target.dataset.goto, 10);
        displayView.swipeCardList(elements.voucherList, goToIndex, state.order.purchased);
        displayView.clearBtns(e.target);
        // displayView.clearResult();
        // displayView.renderResults(state.display.products, goToIndex);
        displayView.reRenderButtons(goToIndex, elements.voucherList.children.length, elements.possessionBtnBox);

    }

});

//===========================================
//------------ List( cart || collections ) controller ---------
// const controlList = (list, item) => {
//     if(!state.list) state.list = Object.create(List);
//     const newItem = state.list.addItem(list, item);
//     list === "cart" 
//     ? cartView.renderItem(newItem) 
//     : collectionsView.renderItem(newItem);
// };
// Restore cartItems on page load
window.addEventListener('load', () => {
    state.cart = Object.create(Cart);
    
    // Restore cartItems
    state.cart.readStorage();

    state.cart.cartItems.forEach(item => {
        // Render the existing items to cart
        cartView.renderItem(item);
    });
});
// ===========================================
// ------------ Cart controller ---------
const controlCartList = item => {
    // if(!state.cart) state.cart = Object.create(Cart);
    const newItem = state.cart.addItem(item);

    newItem.count === 1
        ? cartView.renderItem(newItem)
        : cartView.updateColumn(newItem);

    // toggle collection Btn if collect before add to cart
    if(state.collections){
        state.collections.isCollected(item.id)
        ? collectionsView.toggleCollectBtn([document.querySelectorAll(".cart .column .fa-bookmark").item(state.cart.isInCart(item.id))], true)
        : null
    }
}

// ===========================================
// ------------ Collections controller ---------
const controlCollectiontList = item => {
    if(!state.collections) state.collections = Object.create(Collections);
    const currentId = item.id;
    const els = [];

    // 選取在display 裡面對應item 的 card__display 的 icon 然後放到 els array 裡面
    if(state.display) els.push(document.querySelectorAll(".display .card__display .fa-bookmark").item(state.display.products.findIndex(i => i.id === item.id)));
    // 選取在cart 裡面對應item 的 column 的 icon 然後放到 els array 裡面
    if(state.cart) state.cart.isInCart 
    ? els.push(document.querySelectorAll(".cart .column .fa-bookmark").item(state.cart.isInCart(currentId)))
    : null;
    // console.log(els);

    if(!state.collections.isCollected(currentId)){
        // add item to the state.collections
        const newItem = state.collections.addItem(item);
        // render item to collections UI
        collectionsView.renderItem(newItem);
        // toggle collection Buttons both in display and cart(if it is in cart)
        collectionsView.toggleCollectBtn(els, true);

    }else{
        // remove item from the state.collections
        state.collections.deleteItem(currentId);
        // delete item from collections UI
        collectionsView.deleteItem(currentId);
        // toggle collection Buttons both in display and cart(if it is in cart)
        collectionsView.toggleCollectBtn(els, false);        
    }

    // newItem
    // ? collectionsView.renderItem(newItem)
    // : console.log("已經在collection裡面啦");
}


elements.cartList.addEventListener("click", e => {

    if(!state.cart){
        return
    }

    let currentId = e.target.closest(".column").dataset.model;
    let index = state.cart.cartItems.findIndex(item => item.id === currentId);
    let item = state.cart.cartItems[index];

    if(e.target.matches(".btn--increase, .btn--increase *")){
        state.cart.updateCount(currentId, "inc");
        cartView.updateColumn(item);

    }else if(e.target.matches(".btn--decrease, .btn--decrease *")){
        state.cart.updateCount(currentId, "dec");
        cartView.updateColumn(item);

    }else if(e.target.matches(".numsctrl__display")){
        // input value
    
    }else if(e.target.matches(".column__btn--top, .column__btn--top *")){
        // add to collection
        controlCollectiontList(item)

    }else if(e.target.matches(".column__btn--bottom, .column__btn--bottom *")){
        // delete item from state
        state.cart.deleteItem(currentId);

        // delete item UI
        cartView.deleteItem(currentId);

    }else if(e.target.matches(".product__switch")){
        // switch: 合併column ??
        state.cart.updateProduct(currentId);
        cartView.updateColumn(item);

        // return false;
    }

});

elements.collectionList.addEventListener("click", e => {
    if(!state.collections){
        return
    }
    let currentId = e.target.closest(".column").dataset.model;

    if(e.target.matches(".column__btn--top, .column__btn--top *")){
        // add to cart
        let index = state.collections.collectionItems.findIndex(item => item.id === currentId);
        let item = state.collections.collectionItems[index];
        controlCartList(item);
    }else if(e.target.matches(".column__btn--bottom, .column__btn--bottom *")){
        // delete item from state
        state.collections.deleteItem(currentId);

        // delete item UI
        collectionsView.deleteItem(currentId);
    }

});

elements.productCard.addEventListener("click", e => {
    let currentId = e.target.closest(".card__display").dataset.model;
    let index = state.display.products.findIndex(product => product.id === currentId);
    let item = state.display.products[index];

    if (e.target.matches(".product__switch, .product__switch *")) {
        state.display.toggleSet(item);
        displayView.updateSetState(item, index);

    } else if (e.target.matches(".product__btn-collections, .product__btn-collections *")) {
        // collections controller: add product to collections // 
        controlCollectiontList(item);
       
    }else if (e.target.matches(".btn--cart, .btn--cart *")) {
        // cart controller: add product to cart // 
        controlCartList(item);

        // add notication
        displayView.renderNotification();
    }
});

elements.productCard.addEventListener("touchmove", e => {

});


// 打開購物車
elements.cart.addEventListener("click", e => {
    if(e.target.matches(".cart__toogle--logo")){
        cartView.cartToggle();
    }else if(e.target.matches(".cart__btn-order")){
        if(!state.cart || state.cart.cartItems.length === 0){
            orderView.renderNotification(); //去逛逛
            return;
        }
        if(!state.order){
            state.order = Object.create(Order);
        }
        // 生成訂單資料存入order model
        orderView.renderOrderList();
        state.order.createOrderData(state.cart.cartItems); // state.order.orderData
        // 清空畫面for 新的 訂單
        orderView.cleanPreOrderList();
        // 利用 order model 裡面的 orderData 畫到 UI 上
        orderView.renderOrderList(state.order.orderData);
    }
});

elements.order.addEventListener("click", e => {
    if(e.target.matches(".order__btn-checkout")){
        cartView.cartToggle();
        elements.swipe.style.setProperty("--i", 2);
        state.order.postOrder(state.order.orderData)
        .then(res => {
            if(res){
                // request order list
                controlOrder();
                // open possesions (show loader first)
            }
        });
    }else if(e.target.matches(".order__btn-walkaround")){
        cartView.cartToggle();
    }
});

// 監聽add to cart notification animation end 
elements.cartToggle.addEventListener("animationend", e => {
    e.target.parentElement.removeChild(e.target);
});

// credit card
if(!state.creditCard) state.creditCard = Object.create(CreditCard);
elements.creditCard.addEventListener("click", e => {
    if(e.target.matches(".card-input")){
        elements.cardInputs.forEach(input => {
            input.addEventListener("input", e => {
                state.creditCard.next(e.target.dataset.idx);
            });
        });
    }
})

// assets
// user 未登入
if(!state.user){
    assetsView.renderLoginBtn();
} else{
    assetsView.renderAsset();
}
elements.loginForm.addEventListener("click", e => {
    if(e.target.matches(".login-form__btn--login")){
        // check user state
        // if(state.user)
        assetsView.clearAssetsContainer();
        renderLoader(elements.assetsContainer);
        setTimeout(()=> {
            clearLoader();
            assetsView.clearAssetsContainer();
            assetsView.renderAsset();
        }, 1500);
           
    }
});