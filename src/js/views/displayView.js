import {elements} from "./base";

export const renderTest = (h, w) => {
  document.querySelector(".height").textContent = h;
  document.querySelector(".width").textContent = w;

}

const renderProduct = product =>{
  const markup = `
    <li class="card__display" data-model="${product.id}"> 
      <div class="card__title"> <!-- grid -->
          <div class="product__name">${product.main.name}</div>
          <div class="product__accessory ">適合搭配： <span class="line">${product.accessory.name}</span></div>
          <div class="product__btn-collections btn btn--collections"><i class="fas fa-bookmark"></i></div>
          <p class="product__description">「${limitProductDescription(product.main.description)}」</p>
      </div>
    
      <div class="card__img-box">
          <img src="${product.main.img}" alt="image" class="card__img">
      </div>

      <div class="card__toolbox">

          <input type="checkbox" id="${product.main.id}--display" name="set-name" class="product__switch switch__checkbox">
          <label for="${product.main.id}--display" class="switch__label"></label> 

          <p class="product__price">NT <span>${product.price}</span></p>
          
          <div class="btn btn--cart">
              <i class="fas fa-shopping-cart"></i>
          </div>
          
      </div>
  </li>
  `;
  // https://developer.mozilla.org/zh-TW/docs/Web/API/Element/insertAdjacentHTML
  elements.productList.insertAdjacentHTML("beforeend", markup);
 
}

// for possessions page
const renderPurchasedProduct = product =>{
  const markup = `
    <li class="voucher__display" data-model="${product.id}">
        <div class="voucher__cover"> <!-- grid -->
            <!-- 商品 -->
            <div class="product__name">${product.main.name}  <span>（x${product.count}）</span></div>
            <div class="product__accessory">適合搭配： <span class="${product.withSet? null: "line"}">${product.accessory.name}</span></div>
            <p class="product__description">${product.main.description}</p>

            <!-- 兌換資訊: qr code -->
            <div class="voucher__qrcode">
                <i class="fas fa-qrcode"></i>
            </div>
            <div class="voucher__barcode">
                <i class="fas fa-barcode"></i>
            </div>
        </div>
        <!-- 商品圖片 -->
        <div class="card__img-box">
            <img src="${product.img}" alt="image" class="card__img">
        </div>  
    </li> 
  `;
  // https://developer.mozilla.org/zh-TW/docs/Web/API/Element/insertAdjacentHTML
  elements.voucherList.insertAdjacentHTML("beforeend", markup);
}

// type: 'prev' or 'next'
const createButton = (index, type) => `
  <a href="#" class="card__btn card__btn--${type}" data-goto=${type === 'prev' ? index - 1 : index + 1}>
    ${type === "prev"? "&#8249;" : "&#8250;"}
  </a>
`;

// <!-- Next and Previous Buttons -->
export const renderButtons = (index, numsProduct, btnBox) => { 
  let button;
  if (index === 0 && numsProduct > 1) {
      // Only button to go to next product
      button = createButton(index, 'next');
  } else if (index < numsProduct - 1 ) {
      // Both buttons
      button = `
          ${createButton(index, 'prev')}
          ${createButton(index, 'next')}
      `;
  } else if (index === numsProduct - 1  && numsProduct > 1) {
      // Only button to go to prev product
      button = createButton(index, 'prev');
  }
  btnBox.insertAdjacentHTML("afterbegin", button);
}

export const swipeCardList = (cardList, goToIndex) => {
  cardList.style.setProperty("--index", goToIndex);
}

export const clearBtns = btn => {
  btn.parentNode.innerHTML = "";
}

export const clearResult = cardList => {
  cardList.innerHTML = "";
};

export const reRenderButtons = (index, length, btnBox) => {
  renderButtons(index, length, btnBox);
}

export const renderResults = (products, index = 0) => {
  products.forEach(renderProduct);
  elements.productList.style.setProperty("--length",elements.productList.children.length);
  elements.productList.style.setProperty("--index", index); // for add to collections or add to cart

  renderButtons(index, products.length, elements.displayBtnBox);
};

export const renderPurchasedProducts = (products, index = 0) => {
  products.reverse().forEach(renderPurchasedProduct);
  elements.voucherList.style.setProperty("--length",elements.voucherList.children.length);
  elements.voucherList.style.setProperty("--index", index); // for add to collections or add to cart

  renderButtons(index, products.length, elements.possessionBtnBox);
};

export const updateSetState = (product, index) => {
  // update price 
  document.querySelectorAll(".display .product__price > span").item(index).textContent 
  = product.withSet 
  ? (product.main.price + product.accessory.price) - product.discountMinus 
  : product.main.price;
  // update img
  document.querySelectorAll(".display .card__img").item(index).src 
  = product.withSet 
  ? product.accessory.img 
  : product.main.img;
  // update accessory name
  document.querySelectorAll(".display .product__accessory > span").item(index).classList.toggle("line");
}

export const renderNotification = () => {
  const markup = `
    <!-- https://www.w3schools.com/howto/howto_css_notification_button.asp -->
    <div class="cart__toggle--notification"> &#33; </div>
  `;
  elements.cartToggle.insertAdjacentHTML("beforeend", markup);
}

export const limitProductDescription = (description, limit = 20) => {
  const newDescription = [];
  if (description.length > limit) {
      description.split('，').reduce((acc, cur) => {
          if (acc + cur.length <= limit) {
              newDescription.push(cur);
          }
          return acc + cur.length;
      }, 0);

      // return the result
      return `${newDescription.join(' ')} ...`;
  }
  return description;
}
// ===========================================================
// =====================   控制商品數量及價錢   =================
//(參考) https://codepen.io/djgrant/pen/AwFHL
// (function (){
//     window.inputNumber = (numsctrl, switchBtn, priceDisplay) => {
//       const price = [priceDisplay[0].innerText, priceDisplay[1].innerText];
      
//       let incBtn = numsctrl.children[0];
//       let decBtn = numsctrl.children[2];
//       let numsDisplay = numsctrl.children[1]; //input
//       let min = numsDisplay.attributes.min.nodeValue || false;
//       let max = numsDisplay.attributes.max.nodeValue || false;

//       let priceIndex = false;

//       const init = () => {
//         let value = numsDisplay.value;

//         const decrement = () =>{
//           value > min ? value-- : null;
//           value > min 
//           ? priceDisplay[+priceIndex].innerText =  price[+priceIndex] * value
//           : priceDisplay[+priceIndex].innerText =  price[+priceIndex];
//           numsDisplay.value = value;
//         }
//         const increment = () =>{
//           value < max ? value++ : null;
//           value <= max 
//           ? priceDisplay[+priceIndex].innerText = price[+priceIndex] * value
//           : null;
//           numsDisplay.value = value;
//         }
  
//         decBtn.addEventListener('click', decrement, false);
//         incBtn.addEventListener('click', increment, false);
//         numsDisplay.addEventListener('input', event =>{
//           // 還沒想好
//           numsDisplay.value <= min 
//           ? priceDisplay[+priceIndex].innerText =  price[+priceIndex]
//           : priceDisplay[+priceIndex].innerText =  price[+priceIndex] * numsDisplay.value;
//         });
//       }
      
//       init();

//       switchBtn.addEventListener("change", () => {
//         // 還是有錯誤。。。
//         priceIndex = !priceIndex;
//         priceDisplay[+priceIndex].innerText = price[+priceIndex] * numsDisplay.value;;
//         init();
//       });
//     }
//   })();
//   const els = [] 
//   for (let i = 0; i < elements.numsctrls.length; i++){
//     els.push({
//       numsctrl: elements.numsctrls[i], 
//       switchBtn: elements.switchs[i],
//       priceDisplay: [
//         elements.priceDisplays1[i], 
//         elements.priceDisplays2[i]
//       ],
//     });
//   }
//   els.forEach(el => inputNumber(el.numsctrl, el.switchBtn, el.priceDisplay));


 