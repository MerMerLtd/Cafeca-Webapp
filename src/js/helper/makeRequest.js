//================================
//--------------- xhr ------------
const makeRequest = (opts) => {
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

export default makeRequest;

// https://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/
// https://gomakethings.com/promise-based-xhr/
// https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr/30008115


// http://huli.logdown.com/posts/2223581-ajax-and-cors <輕鬆理解 Ajax 與跨來源請求>
// https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html
// https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest

