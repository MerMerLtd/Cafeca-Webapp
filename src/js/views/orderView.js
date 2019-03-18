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

//之後加
const renderBtn = () => {
    // 購物車是空的喔 
    // ～去逛逛～  btn
    const markup = ``
}
export const cleanPreOrderList = () =>{
    elements.orderList.innerHTML = "";
}

export const renderOrderList = (orderData) => {
    if(!orderData){
        return 
    }
    orderData.products.forEach(renderOrderItem);
    elements.orderPrice.textContent = `NT$${orderData.price}` 
}