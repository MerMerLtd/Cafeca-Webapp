import {elements} from "./base";

const swipe = elements.swipe, 
    //   body = elements.body,
      N = swipe.children.length;

let i = 0, x0 = null, locked = false, w;

const unify = e => {
    return e.changedTouches ? e.changedTouches[0] : e 
};

const lock = e => {
    x0 = unify(e).clientX;
	swipe.classList.toggle('smooth', !(locked = true))
};

const drag = e => {
	// e.preventDefault();
	swipe.style.setProperty('--i', null);
	if(locked) 		
        swipe.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
        
};

const move = e => {
  if(locked) {
    let dx = unify(e).clientX - x0, s = Math.sign(dx), 
        f = +(s*dx/w).toFixed(2);

    if((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
        swipe.style.setProperty('--i', i -= s);
        f = 1 - f
    }
		
    swipe.style.setProperty('--tx', '0px');
    swipe.style.setProperty('--f', f);
    swipe.classList.toggle('smooth', !(locked = false));
    x0 = null
  }
};

const size = () => { w = window.innerWidth };

size();
swipe.style.setProperty('--n', N);

addEventListener('resize', size, false);

addEventListener('mousedown', lock, false);
addEventListener('touchstart', lock, false);

addEventListener('mousemove', drag, false);
addEventListener('touchmove', drag, false);

addEventListener('mouseup', move, false);
addEventListener('touchend', move, false);