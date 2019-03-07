//(參考) https://codepen.io/djgrant/pen/AwFHL

(function() {
    window.inputNumber = (numsctrl, priceDisplay) => {
  
      let incBtn = numsctrl.children[0];
      let display = numsctrl.children[1];
      let decBtn = numsctrl.children[2];
      

      let min = display.attributes.min.nodeValue || false;
      let max = display.attributes.max.nodeValue || false;
      
      decBtn.addEventListener('click', decrement);
      incBtn.addEventListener('click', increment);
      display.addEventListener('input', event =>{
        // 還沒想好
        display.value <= min ? priceDisplay.innerText =  price: priceDisplay.innerText =  price * display.value;
      });

      // console.log(priceDisplay.innerText)
      let price = priceDisplay.innerText;

      function decrement(){
        // console.log("I am clicked")
        let value = display.value;
        value--;
        value <= min ? priceDisplay.innerText =  price: priceDisplay.innerText =  price*value;
        if(!min || value >= min) {
          display.value = value;
        }
      }

      function increment(){
        let value = display.value;
        value++;
        priceDisplay.innerText = price*value;
        if(!max || value <= max) {
          display.value = value;
        }
      }
    }
  })();
  const els = []

  const numsctrls = document.querySelectorAll(".product__numsctrl");
  const priceDisplays = document.querySelectorAll(".product__price > span");
  for (let i = 0; i < numsctrls.length; i++){
    els.push({numsctrl: numsctrls[i], price: priceDisplays[i]})
  }
  
  // for(numsctrl of numsctrls){
  //   console.log(numsctrl)
  // }
  // console.log(els)

  els.forEach(el => inputNumber(el.numsctrl, el.price));


