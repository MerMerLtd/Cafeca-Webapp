import { elements } from "./base";

export const renderItem = product => {
    const markup = `
    <!-- 重複單元 -->
    <div class="column mb-sm" data-model="${product.id}"> 
        <!-- 點擊後水平移動顯示加入購物車或是刪除的按鈕 -->
        <input type="checkbox" name="column" id="column--collections${product.id}" class="column__checkbox">
        <label for="column--collections${product.id}" class="column__toggle">
            <i class="fas fa-ellipsis-v"></i>
        </label>
        <div class="column__display"> <!-- gird -->
            <!-- 商品 -->
            <!-- <div class="product__img-box"> -->
                <img src="${product.main.img}" alt="image" class="product__img">
            <!-- </div> -->
            <div class="product__name">${product.main.name}</div>
            <div class="product__accessory">${product.accessory.name}</div>

            <p class="product__description">「在孤獨中形成的事物，往往也能用來救贖孤獨」</p>
        </div>

        <!-- column 點擊按鈕滑動 -->
        <div class="column__btn column__btn--top">
            <!-- 加到購物車的按鈕 -->
            <div class="btn btn--cart"><i class="fas fa-shopping-cart"></i></div>
        </div>  <!-- <i class="fas fa-bookmark"></i> solid -->
        <div class="column__btn column__btn--bottom">
            <!-- 從container--scroll裡刪除child的按鈕 -->
            <div class="btn btn--delete"><i class="far fa-trash-alt"></i></div>
        </div>          
    </div>
    <!-- 重複單元 -->
    `;
    elements.collectionList.insertAdjacentHTML("beforeend", markup);

}