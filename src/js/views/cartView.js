import { elements } from "./base";

export const cartToggle = () => elements.cart.style.getPropertyValue("--ty") === "0vh" 
                                    ? elements.cart.style.setProperty("--ty", "90vh")
                                    : elements.cart.style.setProperty("--ty", "0vh");

export const renderItem = product => {
    const markup = `
        <!-- 重複單元 -->
        <div class="column" data-model="${product.id}"> 
            <!-- 點擊後水平移動顯示加入購物車或是刪除的按鈕 -->
            <input type="checkbox" name="column" id="column--cart${product.id}" class="column__checkbox">
            <label for="column--cart${product.id}" class="column__toggle">
                <i class="fas fa-ellipsis-v"></i>
            </label>

            <div class="column__display"> <!-- gird -->
                <!-- 商品 -->
                <!-- <div class="product__img-box"> -->
                <img src="${product.withSet? product.main.img: product.accessory.img}" alt="image" class="product__img">
                <!-- </div> -->
                <div class="product__name">${product.main.name}</div>
                <div class="product__accessory">${product.accessory.name}</div>

                <!-- 選項： single or set -->
                <!-- https://codepen.io/guuslieben/pen/YyPRVP -->
                <input type="checkbox" id="switch--display" name="set-name" class="product__switch switch__checkbox" checked="${product.withSet}">
                <label for="switch--display" class="switch__label"></label>

                <!-- 商品價格 -->
                <p class="product__price">NT <span>${product.price}</span></p>

                <!-- 購買數量 -->
                <div class="product__numsctrl">
                    <span class="numsctrl__btn btn--increase"> <i class="fas fa-plus"></i> </span>
                    <input type="number" name="nums" class="numsctrl__display" value="${product.count}" min="0" max="10">
                    <span class="numsctrl__btn btn--decrease"> <i class="fas fa-minus"></i> </span>
                </div>
            
            </div> 

            <!-- column 點擊按鈕滑動 -->
            <div class="column__btn column__btn--top">
                <!-- 加到心願單的按鈕 -->
                <div class="btn btn--collections"><i class="fas fa-bookmark"></i></div>
            </div>  <!-- <i class="far fa-bookmark"></i> regular -->
            <div class="column__btn column__btn--bottom">
                <!-- 從container--scroll裡刪除child的按鈕 -->
                <div class="btn btn--delete"><i class="far fa-trash-alt"></i></div>
            </div>  
            
            <!-- <div class="column__price">TOTAL: NT560</div>  -->
            <!-- grid-auto-row -->
        </div>
        <!-- 重複單元 -->
    `;
    elements.cartList.insertAdjacentHTML("beforeend", markup);
}

export const deleteItem = id => {
    const item = document.querySelector(`[data-model="${id}"]`);
    item.parentElement.removeChild(item);
}

//move item to collection
// export const moveItem = id => {
    
// }