import { elements } from "../views/base";

export const CreditCard = {
    info: {
        number: 1111222233334444,
        name: "tzuhanliang",
        expire: 1124,
        cvv: 238,
    },

    next: function(idx){
        const target = elements.cardInputs[idx];
        if(target.value.length === parseInt(target.getAttribute("maxlength")) ){
            const nextTarget = elements.cardInputs[++idx];
            nextTarget.focus();
        }else if (target.value.length === 0 && parseInt(idx) !== 0){
            const nextTarget = elements.cardInputs[--idx];
            nextTarget.focus();
        }
    },
    checkValidity: (value, rules) => {
        
    },
    getInputValue: () => {
        this.info
    },

}

