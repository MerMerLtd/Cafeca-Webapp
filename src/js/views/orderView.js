import { elements } from "./base";

const renderOderItem = item => {
    const markup = `
        <div class="column__display"> <!-- gird -->

            <!-- 商品 -->
            <!-- <div class="product__img-box"> -->
            <img src="${product.img}" alt="image" class="product__img">
            <!-- </div> -->
            <div class="product__name">${product.main.name}</div>
            <div class="product__accessory"><span>${product.accessory.name}</span></div>

            <!-- 商品價格 -->
            <p class="product__price">NT <span>${product.price}</span></p>

            <!-- 購買數量 -->
            <div class="product__numsctrl">
                <p class="product__count">x <span>${product.count}</span></p>
            </div>
        
        </div> 
    `;
    
}