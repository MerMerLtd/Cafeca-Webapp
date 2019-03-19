import { elements } from "./base";

const renderOrderItem = item => {
    const markup = `
    <div class="order__item">
        <div class="product">
            <span class="product__name">${item.main.name}</span>
            <span class="product__accessory ${!item.withSet? "line": null}"> - ${item.accessory.name}</span>
        </div>
        <p class="product__count">購買數量： <span>${item.count}</span></p>
        <p class="product__price">NT$ <span>${item.count * item.price}</span></p> 
    </div>
    `;
    elements.orderList.insertAdjacentHTML("beforeend", markup);
}
export const cleanPreOrderList = () =>{
    elements.orderList.innerHTML = "";
}

export const renderOrderList = (orderData) => {
    const markupBtn = `<a class="btn order__btn-checkout" href="#display">確認付款</a>`;
    
    if(!orderData){
        return 
    }
   
    orderData.products.forEach(renderOrderItem);
    elements.orderPrice.textContent = `NT$${orderData.price}`;
    
    elements.orderBtnBox.innerHTML = "";
    elements.orderBtnBox.insertAdjacentHTML("afterbegin", markupBtn);
}

// 如果購物車是空的
export const renderNotification = () => {
    const markupText = `<div class="order__notify"> ~ 我是空的哦 ~ </div>`;
    const markupBtn = `<a class="btn order__btn-walkaround" href="#display">再去逛逛</a>`;
    elements.orderBtnBox.innerHTML = "";
    elements.orderBtnBox.insertAdjacentHTML("afterbegin", markupBtn);
    elements.orderList.insertAdjacentHTML("afterbegin", markupText);

}