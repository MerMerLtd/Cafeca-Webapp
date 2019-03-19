import { makeRequest } from "../views/base";
export const Assets = {
    assetsList: {},
    getAssets: function(userId){
        // makeRequest
        console.log(userId, "getAssets is called");
    },
    openApp: function(){
        if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
            const before = new Date().valueOf();
            setTimeout(() => {
            const after = new Date().valueOf();
            if(after - before > 200){ return; }
            window.location = ('https://play.google.com/store/apps/details?id=com.sparkslab.dcardreader');
            },50);  
            window.location = ("dcard://post?message=hello%20world%23thisisyourhashtag.");
        }else if(navigator.userAgent.toLowerCase().indexOf("iphone") > -1){
            const before = new Date().valueOf();
            setTimeout(() => {
                const after = new Date().valueOf();
                if(after - before > 2000){ return; }
                window.location = ('https://itunes.apple.com/tw/app/dcard/id951353454?mt=8'); //暫時
            }, 1000);
            window.location = ('dcard://post?message=hello%20world');
        }
    }, 
}
// https://stackoverflow.com/questions/24464602/redirect-to-appstore-or-google-play
// http://www.zhangyunling.com/559.html  JS打开APP的解决方案
// https://adon988.logdown.com/posts/7397804 Javascript - 手機瀏覽器開啟APP ，或者導向App Store or Google Play下載

// AndroidOpenApp: function(){
//     const appDetail = `details?id=com.cafeca.android`;
//     var before = new Date().valueOf();
//     setTimeout(() => {
//       var after = new Date().valueOf();
//       if(after - before > 200){ return; }
//       window.location = ('https://play.google.com/store/apps/details?id=com.sparkslab.dcardreader');
//     },50);  
//     window.location = ("dcard://post?message=hello%20world%23thisisyourhashtag.");
// },  
// iOSOpenApp: function(){
// var before = new Date().valueOf();
// setTimeout(() => {
//     var after = new Date().valueOf();
//     if(after - before > 2000){ return; }
//     window.location = ('https://itunes.apple.com/tw/app/dcard/id951353454?mt=8'); //暫時
// }, 1000);
// window.location = ('dcard://post?message=hello%20world');

// }