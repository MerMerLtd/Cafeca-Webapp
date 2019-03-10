import {elements} from "./base";

const renderProduct = product =>{
  const markup = `
    <li class="card__display"> 
      <div class="card__title"> <!-- grid -->
          <div class="product__name">${product.name}</div>
          <div class="product__accessory">適合搭配： ${product.accessory}</div>
          
          <div class="product__btn-collections btn btn--collections"><i class="fas fa-bookmark"></i></div>
          <p class="product__description">「${limitProductDescription(product.description)}」</p>
      </div>
    
      <div class="card__img-box">
          <img src="${product.img}" alt="image" class="card__img">
      </div>

      <div class="card__toolbox">

          <input type="checkbox" id=${product.id} name="set-name" class="product__switch switch__checkbox">
          <label for=${product.id} class="switch__label"></label> 

          <p class="product__price">NT <span>${product.withSet ? product.price2: product.price1}</span></p>
          
          <div class="btn btn--cart">
              <i class="fas fa-shopping-cart"></i>
          </div>
          
      </div>
  </li>
  `;
  // https://developer.mozilla.org/zh-TW/docs/Web/API/Element/insertAdjacentHTML
  elements.productList.insertAdjacentHTML("beforeend", markup);
 
}
// type: 'prev' or 'next'
const createButton = (index, type) => `
  <a href="#" class="card__btn card__btn--${type}" data-goto=${type === 'prev' ? index - 1 : index + 1}>
    ${type === "prev"? "&#8249;" : "&#8250;"}
  </a>
`;

// <!-- Next and Previous Buttons -->
const renderButtons = (index, numsProduct) => { 
  let button;
  if (index === 0 && numsProduct > 1) {
      // Only button to go to next product
      button = createButton(index, 'next');
  } else if (index < numsProduct) {
      // Both buttons
      button = `
          ${createButton(index, 'prev')}
          ${createButton(index, 'next')}
      `;
  } else if (index === numsProduct && numsProduct > 1) {
      // Only button to go to prev product
      button = createButton(index, 'prev');
  }
  elements.displayBtnBox.insertAdjacentHTML("afterbegin", button);
}

export const swipeCardList = (cardList, goToIndex, products) => {
  cardList.style.setProperty("--index", goToIndex);
  // 讓display裡面的card__payment 的name 以及accessory 跟現在在畫面上的card__display一樣
  // console.log(goToIndex)

  // 似乎可以寫成無限循環！！！
  if(goToIndex === products.length){
    goToIndex = 0;
  }
  elements.cardName.innerText = products[goToIndex].name;
  elements.cardAccessory.innerText = products[goToIndex].accessory;
  elements.cardPrice.innerText = true 
                                  ? products[goToIndex].price1
                                  : products[goToIndex].price2;
}

export const clearBtns = btn => {
  btn.parentNode.innerHTML = "";
}

export const clearResult = () => {
  elements.productList.innerHTML = "";
};

export const limitProductDescription = (description, limit = 22) => {
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

export const renderResults = (products, index = 0) => {
  products.forEach(renderProduct);
  elements.productList.style.setProperty("--length", elements.productList.children.length);

  renderButtons(index, products.length);
};


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


 