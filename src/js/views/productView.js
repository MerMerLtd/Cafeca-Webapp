import {elements} from "./base";

const renderProduct = product =>{
  const markup = `
    <div class="card__display"> 
      <div class="card__title"> <!-- grid -->
          <div class="product__name">${product.name}</div>
          <div class="product__accessory">適合搭配： ${product.accessory}</div>
          
          <div class="product__btn-collections btn btn--collections"><i class="fas fa-bookmark"></i></div>
          <p class="product__description">「${product.description}」</p>
      </div>

      <div class="card__img-box">
          <img src="${product.img}" alt="image" class="card__img">
      </div>

      <div class="card__toolbox">
          
          <input type="checkbox" id=${product.id} name="set-name" class="product__switch switch__checkbox">
          <label for=${product.id} class="switch__label"></label> 

          <p class="product__price switch--price1">NT <span>${product.price1}</span></p>
          <p class="product__price switch--price2">NT <span>${product.price2}</span></p>
          
          <div class="btn btn--cart">
              <i class="fas fa-shopping-cart"></i>
          </div>
          
      </div>
  </div>
  `;
}

export const renderResults = products => {
  products.forEach(renderProduct);
};



//(參考) https://codepen.io/djgrant/pen/AwFHL
(function() {
    window.inputNumber = (numsctrl, switchBtn, priceDisplay) => {
      const price = [priceDisplay[0].innerText, priceDisplay[1].innerText];
      
      let incBtn = numsctrl.children[0];
      let decBtn = numsctrl.children[2];
      let numsDisplay = numsctrl.children[1]; //input
      let min = numsDisplay.attributes.min.nodeValue || false;
      let max = numsDisplay.attributes.max.nodeValue || false;

      let priceIndex = false;
      let value = numsDisplay.value;

      const init = () => {
        const decrement = () =>{
          value > min ? value-- : null;
          value > min 
          ? priceDisplay[+priceIndex].innerText =  price[+priceIndex] * value
          : priceDisplay[+priceIndex].innerText =  price[+priceIndex];
          numsDisplay.value = value;
        }
        const increment = () =>{
          value < max ? value++ : null;
          priceDisplay[+priceIndex].innerText = price[+priceIndex] * value;
          numsDisplay.value = value;
        }
  
        decBtn.addEventListener('click', decrement);
        incBtn.addEventListener('click', increment);
        numsDisplay.addEventListener('input', event =>{
          // 還沒想好
          numsDisplay.value <= min 
          ? priceDisplay[+priceIndex].innerText =  price[+priceIndex]
          : priceDisplay[+priceIndex].innerText =  price[+priceIndex] * numsDisplay.value;
        });
      }
      
      init();

      switchBtn.addEventListener("change", () => {
        // 還是有錯誤。。。
        priceIndex = !priceIndex;
        numsDislay.value = 1;
        priceDisplay[+priceIndex].innerText = price[+priceIndex] * numsDisplay.value;;
        init();
      });
    }
  })();

  const els = [] 
  for (let i = 0; i < elements.numsctrls.length; i++){
    els.push({
      numsctrl: elements.numsctrls[i], 
      switchBtn: elements.switchs[i],
      priceDisplay: [
        elements.priceDisplays1[i], 
        elements.priceDisplays2[i]
      ],
    });
  }
  els.forEach(el => inputNumber(el.numsctrl, el.switchBtn, el.priceDisplay));


