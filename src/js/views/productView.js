//(參考) https://codepen.io/djgrant/pen/AwFHL

(function() {
    window.inputNumber = function(el) {
  
      let incBtn = el.children[0];
      let display = el.children[1];
      let decBtn = el.children[2];

      let min = display.attributes.min.nodeValue || false;
      let max = display.attributes.max.nodeValue || false;
      
      decBtn.addEventListener('click', decrement);
      incBtn.addEventListener('click', increment);

      function decrement(){
        // console.log("I am clicked")
        let value = display.value;
        value--;
        if(!min || value >= min) {
          display.value = value;
        }
      }

      function increment(){
        let value = display.value;
        value++;
        if(!max || value <= max) {
          display.value = value++;
        }
      }
    }
  })();
  
  const els = document.querySelectorAll(".product__numsctrl");
  els.forEach(el => inputNumber(el));


