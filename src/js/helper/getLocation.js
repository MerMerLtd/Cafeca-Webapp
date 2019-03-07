import makeRequest from "../helper/makeRequest";
//================================
//----------- getLocation --------
const getLocation = () => {
    if(navigator.geolocation){  //if(!navigator.geolocation) 有問題
      const opt={
        enableAcuracy: true,
        maximumAge: 3000,
        timeout: 2500
      };
      const errorTypes={
          0:"不明原因錯誤",
          1:"使用者拒絕提供位置資訊",
          2:"無法取得位置資訊?",
          3:"位置查詢逾時"
      };
      return new Promise((resolve, reject) => {
        navigator.geolocation.watchPosition(resolve, error => reject({
             error: errorTypes[error.code]
        }), opt);
      });
    }else{
      const opts = {
        method: "POST",
        url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBvQFadDREYnAl2MMF_xEnVQrRXi0w0slc",
      };
      return makeRequest(opts);
    }
}
export default getLocation;
  
// https://gist.github.com/varmais/74586ec1854fe288d393
// https://www.oxxostudio.tw/articles/201810/google-maps-20-get-current-position.html

// https://stackoverflow.com/questions/36995628/how-to-implement-promises-with-the-html5-geolocation-api
// function getPreciseLocation() {
//     return new Promise(function (resolve, reject) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//             resolve([position.coords.latitude, position.coords.longitude]);
//         });
//     });
// }