import "../sass/main.scss";

import cartitemsModel from "./models/cartitemsModel";
import collectionsModel from "./models/collectionsModel";
import creditcardModel from "./models/creditCardModel";
import possessionsModel from "./models/possessionsModel"
import ProductsModel from "./models/productsModel";
import userModel from "./models/userModel";

import * as collectionsView from "./views/collectionsView";
import * as possessionsView from "./views/possessionsView";
import * as productsView from "./views/productView";

/** Global state of the app
 * - products list object
 * - cartitems object
 * - collections object
 * - possessions object
 */
const state = {};

const controlProducts =  () => {
    // get user's location
    // https://www.oxxostudio.tw/articles/201810/google-maps-20-get-current-position.html
    if(navigator.geolocation){
        const getLocation = navigator.geolocation.watchPosition(showPosition, showError, option);
        function showPosition (position) {
            console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // console.log("latitude:", latitude);
            // console.log("longitude:", longitude);
        }
        function showError (error) {
            const errorTypes={
                0:"不明原因錯誤",
                1:"使用者拒絕提供位置資訊",
                2:"無法取得位置資訊?",
                3:"位置查詢逾時"
            };
            console.log(errorTypes[error.code]);
        }
        let option={
            enableAcuracy: true,
            maximumAge: 3000,
            timeout: 2500
        };
       
    }else {
        //使用 Google api
        const geolocation = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBvQFadDREYnAl2MMF_xEnVQrRXi0w0slc';
        (function() {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', geolocation);
           
            xhr.onreadystatechange = () => {
                if(xhr.readyState !== 4) return;
                let response = JSON.parse(xhr.responseText);
                if(xhr.readyState == 4 && xhr.status == 200){
                    const latitude = response.location.lat;
                    const longitude = response.location.lng;
                    // console.log("latitude:", latitude);
                    // console.log("longitude:", longitude);
                }else{
                    console.log(response.error.message)
                }
            }
            xhr.send();
        })();
    }


};
controlProducts();
const controlCartitems = () => {};
const controlCollections = () => {};
const controlPossessions = () => {};

const display = document.querySelector(".display");
console.log(display)

// console.log(ProductModel);
const products = Object.create(ProductsModel);
// console.log(products)
products.makeRequest();