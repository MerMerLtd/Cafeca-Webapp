
import {elements} from "./base";

const cartToggle = elements.cartToggle,
            cart = elements.cart;

let notMoveYet = true;
const cartMove = () => {
    notMoveYet = !notMoveYet;
    if(notMoveYet){
        cart.style.setProperty("--ty", "90vh");
    }else{
        cart.style.setProperty("--ty", "0vh");
    }
}
cartToggle.addEventListener("click", cartMove);

// let y0 = null, x0 = null, locked = false, h;

// const unify = e => {
//     return e.changedTouches ? e.changedTouches[0] : e 
// };

// const cartLock = e => {
//     y0 = unify(e).clientY;
//     // x0 = unify(e).clientX-cartToggle.getBoundingClientRect().left;
//     locked = true;
// };

// const cartDrag = e => {
//     e.preventDefault();
//     if(locked) {
//         // cart.style.setProperty = unify(e).clientY - y0 + 'px';
//         unify(e).clientY >= h * 0.9
//         ? cart.style.setProperty('--ty', `${0}px`)
//         : cart.style.setProperty('--ty', `${unify(e).clientY}px`)
//         console.log(unify(e).clientY);
//     }		
// };

// const cartMove = e => {
//     if(locked) {
//         cart.style.setProperty('--ty', '0px');
//         y0 = null;
//         locked = false;
//     }
// };

// const size = () => { h = window.innerHeight };

// size();

// cartToggle.addEventListener('mousedown', cartLock, false);
// cartToggle.addEventListener('touchstart', cartLock, false);

// cartToggle.addEventListener('mousemove', cartDrag, false);
// cartToggle.addEventListener('touchmove', cartDrag, false);

// cartToggle.addEventListener('mouseup', cartMove, false);
// cartToggle.addEventListener('touchend', cartMove, false);