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
        console.log(idx);
        if(target.value.length === parseInt(target.getAttribute("maxlength")) ){
            const nextTarget = elements.cardInputs[++idx];
            nextTarget && nextTarget.focus();
        }else if (target.value.length === 0 && parseInt(idx) !== 0){
            const nextTarget = elements.cardInputs[--idx];
            nextTarget.focus();
        }
        return true;
    },
    checkValidity: (value, rules) => {
        //https://medium.com/hootsuite-engineering/a-comprehensive-guide-to-validating-and-formatting-credit-cards-b9fa63ec7863
        let isValid = false;

        if(rules.required){
            isValid = value.trim() !== ""
        }
    },
    getInputValue: () => {
        this.info
    },

}

