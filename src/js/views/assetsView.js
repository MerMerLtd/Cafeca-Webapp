import { elements } from "./base";


export const clearAssetsContainer = () => {
    elements.assetsContainer.innerHTML = "";
}

export const renderAsset = (assets) => {
    console.log("renderAsset");
    const markup = `
        <div class="assets__amount mb-sm">
            資產： 2340顆咖啡豆 - <a href="" class="assets__link">打開App以使用咖啡豆</a>
        </div>
        <div class="assets__report">
            <ul class="assets__list">
                <div class="assets__title">已兌換的咖啡卷</div>
                <li class="assets__item">黛綠帽 - 紳士馬卡龍</li>
                <li class="assets__item">粉紅話語（單點）</li>
                <li class="assets__item">和解（單點）</li>
            </ul>
            <ul class="assets__list">
                <div class="assets__title">已到過的店家</div>
                <li class="assets__item">三%</li>
                <li class="assets__item">不死鳥</li>
                <li class="assets__item">COCA</li>
                <!-- <div class="assets__map"></div> -->
            </ul>
        </div>
    `;
    elements.assetsContainer.insertAdjacentHTML("afterbegin", markup);
}

export const renderLoginBtn = () => {
    console.log("renderBtn");

    const markup = `<a class="btn btn--open-lgf" href="#login">登入查看</a>`;
    elements.assetsContainer.insertAdjacentHTML("afterbegin", markup);
}

