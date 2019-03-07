//================================
//--------------- xhr ------------
export const makeRequest = (opts) => {
    // Create the XHR request
    const xhr = new XMLHttpRequest();
    // Return it as a Promise
    return new Promise( (resolve, reject) => {
      // Setup our listener to process compeleted requests
      xhr.onreadystatechange =  () => {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;
        // Process the response
        if (xhr.status >= 200 && xhr.status < 300) {
          // If successful
          resolve(JSON.parse(xhr.responseText));
        } else {
          // If failed
          reject({
            error: JSON.parse(xhr.response).error.message,
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      // Setup our HTTP request
      xhr.open(opts.method || 'GET', opts.url, true);
      if (opts.headers) {
        Object.keys(opts.headers).forEach(key => xhr.setRequestHeader(key, opts.headers[key]));
      }
      // Send the request
      xhr.send();
    });
  }
 //================================
//----------- getLocation --------
export const getLocation = () => {
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