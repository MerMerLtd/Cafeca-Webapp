import "../sass/main.scss";
import getLocation from "./helper/getLocation";
import * as helper from "./helper";

import cartitemsModel from "./models/cartitemsModel";
import collectionsModel from "./models/collectionsModel";
import creditcardModel from "./models/creditCardModel";
import possessionsModel from "./models/possessionsModel"
import ProductsModel from "./models/productsModel";
import userModel from "./models/userModel";

import * as collectionsView from "./views/collectionsView";
import * as possessionsView from "./views/possessionsView";
import * as productsView from "./views/productView";

//================================
//--------------- firebase -------

import firebase from 'firebase/app';
import 'firebase/database';
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
 * - cartitems object
 * - collections object
 * - possessions object
 */
const state = {};

const controlProducts = async () => {
    // 1. 取得瀏覽網頁者的location
    helper.getLocation()
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
        state.products = Object.create(ProductsModel);
        // 2.2 prepare UI for the result

        // 2.3 取得使用者附近店家的商品
        const opts = {
            method: "GET",
            url: `https://cafeca-webapp.firebaseio.com/.json`, //這裡之後要使用位置資訊
            headers: {
                'Access-Control-Allow-Origin' :`https://cafeca-webapp.firebaseio.com/`,
            }
        }
        state.products.makeRequest(opts)
        .then( res => {
            const products = res.products;

            // 2.4 render results on UI
            console.log('Success!', products);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        });
    })
    .catch( error => {
        console.log('Something went wrong: index', error);
    });

   
};
controlProducts();
const controlCartitems = () => {};
const controlCollections = () => {};
const controlPossessions = () => {};

const display = document.querySelector(".display");
console.log(display);


// makeRequest({
//     method: "GET",
//     url: `https://cafeca-webapp.firebaseio.com/.json`,
//     headers: {
//         'Access-Control-Allow-Origin' :`https://cafeca-webapp.firebaseio.com/`,
//     }
//     // url: `https://cafeca-webapp.firebaseio.com/.json&{location}`,
// })
// .then( res => {
//     const products = res.products;
//     console.log('Success!', products);
// })
// .catch( error => {
//     console.log('Something went wrong', error);
// });