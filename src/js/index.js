//global app controller
import "../sass/main.scss";
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

// http://huli.logdown.com/posts/2223581-ajax-and-cors <輕鬆理解 Ajax 與跨來源請求>
// https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html
// https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest

const makeRequest = () => {
    // https://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/
    const xhr = new XMLHttpRequest();
    
    // onload was added in XMLHttpRequest2 whereas onreadystatechange has been around since the original spec.
    // Setup our listener to process compeleted requests
    // xhr.onreadystatechange = () => {
    //     // Only run if the request is complete
    //     if (xhr.readyState !== 4) return;
    //     // Process our return data
    //     if (xhr.status >= 200 && xhr.status < 300) {
    //         // What do when the request is successful
    //         const products = JSON.parse(xhr.responseText);
    //         console.log(products);
    //     }else {
    //         // What to do when the request has failed
    //         console.log('error', xhr.status);
    //     }
    // }
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open("GET", "https://cafeca-webapp.firebaseio.com/products.json", true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', "https://cafeca-webapp.firebaseio.com/");
    
    xhr.send();
}
makeRequest();

