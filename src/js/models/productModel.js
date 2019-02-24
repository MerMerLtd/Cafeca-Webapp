// https://codepen.io/djgrant/pen/AwFHL
// 還沒完成 稍後再來處理
(function() {
 
    window.inputNumber = function(el) {
  
      var min = el.attr('min') || false;
      var max = el.attr('max') || false;
  
      var els = {};
  
      els.dec = document.querySelector(".numsctrl__btn--decrease");
      els.inc = document.querySelector(".numsctrl__btn--decrease");
  
      el.each(() => {
        init(this);
      });
  
      function init(el) {
  
        els.dec.addeventListener('click', decrement);
        els.inc.addeventListener('click', increment);
  
        function decrement() {
          var value = el.value;
          value--;
          if(!min || value >= min) {
            el.value = value;
          }
        }
  
        function increment() {
          var value = el.value;
          value++;
          if(!max || value <= max) {
            el.value = value++;
          }
        }
      }
    }
  })();
  
  inputNumber(document.querySelector(".numsctrl__display"));