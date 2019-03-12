export const elements = {
    numsctrls: document.querySelectorAll(".product__numsctrl"),
    priceDisplays1: document.querySelectorAll(".switch--price1 > span"),
    priceDisplays2: document.querySelectorAll(".switch--price2 > span"),
    switchs: document.querySelectorAll(".product__switch"),

   
    display: document.querySelector(".display"),
    possessions: document.querySelector(".possessions"),
    displayBtnBox: document.querySelector(".display > .card__btn-box"),
    possessionBtnBox: document.querySelector(".possessions > .card__btn-box"),
    productList: document.querySelector(".display > .card > .card__list"),
    voucherList: document.querySelector(".possessions > .card > .card__list"),
    
    // cardInfo: document.querySelector(".card__info > .product"),
    cardName: document.querySelector(".card__info > .product > .product__name"),
    cardAccessory: document.querySelector(".card__info > .product > .product__accessory"),
    cardPrice: document.querySelector(".card__price > span"),

    card: document.querySelectorAll(".card"),

    swipe: document.querySelector(".swipe"), //testing
    body: document.querySelector("body"), //testing

    // cartToggle: document.querySelector(".cart__toggle"),
    cart: document.querySelector(".cart"),
}

export const elementStrings = {
    loader: "lds-ellipsis",
}

export const renderLoader = parent => {
    // https://loading.io/css/
    const loader = `
    <div class="${elementStrings.loader}">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}

export const renderCreditCart = (parent, user) => {
    const markup = `
        <div class="heading-2 mb-sm">輸入卡片資訊</div>
        <div class="credit-card__info">
            <label for="card-number-${user.id}" class="credit-card__num">信用卡號</label>
            <input type="text" id="card-number-${user.id}" class="credit-card__numi credit-card__numi--1" maxlength="4" />
            <input type="text" id="card-number-1" class="credit-card__numi credit-card__numi--2" maxlength="4" />
            <input type="text" id="card-number-2" class="credit-card__numi credit-card__numi--3" maxlength="4" />
            <input type="text" id="card-number-3" class="credit-card__numi credit-card__numi--4" maxlength="4" />
            
            <label for="name-${user.id}" class="credit-card__name">持卡人姓名</label>
            <input type="text" name="name" id="name-${user.id}" class="credit-card__name-input">

            <label class="credit-card__expire">有效期限</label>
        
            <select id="month" class="credit-card__mon">
                <option>...</option>
                <option>Jan</option>
                <option>Feb</option>
                <option>Mar</option>
                <option>Apr</option>
                <option>May</option>
                <option>Jun</option>
                <option>Jul</option>
                <option>Aug</option>
                <option>Sep</option>
                <option>Oct</option>
                <option>Nov</option>
                <option>Dec</option>
            </select>

            <select id="year" class="credit-card__year">
                <option>...</option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
            </select>

            <label for="card-cvv-${user.id}" class="credit-card__cvv">信用卡背面末三碼</label>
            <input type="text" id="card-cvv-${user.id}" class="credit-card__cvv-input" maxlength="3" />    
            
        </div> 
        <div class="credit-card__btn-checkout mt-lg">確認付款</div>  
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
}

// const renderNumsctrl = (parent, product) =>{
//     const markup = `
//         <div class="product__numsctrl">
//             <span class="numsctrl__btn numsctrl__btn--increase">
//                 <i class="fas fa-plus"></i> 
//             </span>
//             <input type="number" name="nums" class="numsctrl__display" value="1" min="0" max="10">
//             <span class="numsctrl__btn numsctrl__btn--decrease"> 
//                 <i class="fas fa-minus"></i> 
//             </span>
//         </div>  
//     `;
// }



export const makeRequest = (opts) => {
    // Create the XHR request
    const xhr = new XMLHttpRequest();
    // Return it as a Promise
    return new Promise( (resolve, reject) => {
      // Setup our listener to process compeleted requests
      xhr.onreadystatechange =  () => {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;
        // Process the response
        if (xhr.status >= 200 && xhr.status < 300) {
          // If successful
          resolve(JSON.parse(xhr.responseText));
        } else {
          // If failed
          reject({
            error: JSON.parse(xhr.response).error.message,
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      // Setup our HTTP request
      xhr.open(opts.method || 'GET', opts.url, true);
      if (opts.headers) {
        Object.keys(opts.headers).forEach(key => xhr.setRequestHeader(key, opts.headers[key]));
      }
      // Send the request
      xhr.send();
    });
  }
 //================================
//----------- getLocation --------
export const getLocation = () => {
    if(navigator.geolocation){  //if(!navigator.geolocation) 有問題
      const opt={
        enableAcuracy: true,
        maximumAge: 3000,
        timeout: 2500
      };
      const errorTypes={
          0:"不明原因錯誤",
          1:"使用者拒絕提供位置資訊",
          2:"無法取得位置資訊?",
          3:"位置查詢逾時"
      };
      return new Promise((resolve, reject) => {
        navigator.geolocation.watchPosition(resolve, error => reject({
             error: errorTypes[error.code]
        }), opt);
      });
    }else{
      const opts = {
        method: "POST",
        url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBvQFadDREYnAl2MMF_xEnVQrRXi0w0slc",
      };
      return makeRequest(opts);
    }
}