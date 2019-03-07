import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  // http://blog.kenyang.net/2017/08/25/firebase-realtime-database-web
  apiKey: "AIzaSyBNulErK-OblwR4nCl5oB4C62q4ytrl_RY",
  authDomain: "cafeca-webapp.firebaseapp.com",
  databaseURL: "https://cafeca-webapp.firebaseio.com",
  projectId: "cafeca-webapp"
}
firebase.initializeApp(config);

const ProductsModel = {
  makeRequest: () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = event => {
      // if (xhr.status >= 200 && xhr.status < 300) {
        const products = JSON.parse(xhr.responseText);
        // console.log(products);
      // }
    };
    xhr.onerror = () => {
     alert("Getting error");
    };
    xhr.open("GET", "https://cafeca-webapp.firebaseio.com/products.json", true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', "https://cafeca-webapp.firebaseio.com/");
    xhr.send();
  }
}
// makeRequest();

export default ProductsModel;

// https://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/
// http://huli.logdown.com/posts/2223581-ajax-and-cors <輕鬆理解 Ajax 與跨來源請求>
// https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html
// https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest
// https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html