const getSize =  (e) => {
    console.log("I am called")
    document.querySelector(".height1").textContent = window.screen.height;
    document.querySelector(".width1").textContent = window.screen.width;

    document.querySelector(".height2").textContent = window.screen.availHeight;
    document.querySelector(".width2").textContent = window.screen.availWidth;

    document.querySelector(".height3").textContent = window.screenTop;
    document.querySelector(".width3").textContent = window.screenLeft;

    document.querySelector(".height4").textContent = document.body.clientHeight;
    document.querySelector(".width4").textContent = document.body.clientWidth;

    document.querySelector(".height5").textContent = document.body.offsetHeight;
    document.querySelector(".width5").textContent = document.body.offsetWidth;

    document.querySelector(".height6").textContent = document.body.scrollHeight;
    document.querySelector(".width6").textContent = document.body.scrollWidth;

    document.querySelector(".height7").textContent = document.body.scrollTop;
    document.querySelector(".width7").textContent = document.body.scrollLeft;
}

export const renderSize = () => {
    const markup = `
    <div class="test">
        <div>屏幕的分辨率高度: <span class="height1"></span>px </div>
        <div>屏幕分辨率宽度: <span class="width1"></span>px </div>
        <div>屏幕可用工作区域高度: <span class="height2"></span>px </div>
        <div>屏幕可用工作区域宽度: <span class="width2"></span>px </div>
        <div>网页正文部分上: <span class="height3"></span>px </div>
        <div>网页正文部分左: <span class="width3"></span>px </div>
        <div>网页可见区域高度: <span class="height4"></span>px </div>
        <div>网页可见区域宽度: <span class="width4"></span>px </div>
        <div>网页可见区域高度包括边框: <span class="height5"></span>px </div>
        <div>网页可见区域宽度包括边框: <span class="width5"></span>px </div>
        <div>网页正文高度: <span class="height6"></span>px </div>
        <div>网页正文宽度: <span class="width6"></span>px </div>
        <div>网页被卷去的高: <span class="height7"></span>px </div>
        <div>网页被卷去的左: <span class="width7"></span>px </div>
    </div>
    `;
    document.querySelector(".container").insertAdjacentHTML("afterbegin", markup);
    window.addEventListener("resize", getSize);
}

export const cleanSize = () => {
    document.querySelector(".test").innerHTML = "";
    window.removeEventListener("resize", getSize);

}

