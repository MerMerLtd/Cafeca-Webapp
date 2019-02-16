# Cafeca-Webapp
coffee shop on the cloud - 咖啡不只是咖啡
# Deploy
### 開始新專案
```shell
git clone https://github.com/MerMerLtd/Cafeca-Webapp.git
npm init
git add .
git commit -m "npm init"
npm i webpack node-sass live-server --save-dev
git add .
git commit -m "npm install"
git push
```
### package.json script setup
```shell
...

"scripts": {
    "compile:sass": "node-sass src/sass/main.scss dist/css/style.css",
    "watch:sass": "node-sass src/sass/main.scss dist/css/style.css -w", // keep watching in the background whenever we change our sass code
    "deserver" : "live-server dist/index.html"
  },
  
...
```
### webpack setup (configuration)
#### install webpack
```shell
npm i webpack webpack-cli --save-dev
```
#### touch webpack.config.js
```shell
const path = require("path");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "bundle.js"
    },
    mode: "development"
};
```
#### package.json script setup
```shell
...

"scripts": {
    ...
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development --open" 
    //So a script start will always be a script that keeps running in the background and updates the browser as soon as we change our code.
  },
  
...
```
#### create bundle.js
```shell
npm run dev
```
### webpack setup (dev server)
#### install webpack dev server
```shell
npm install webpack-dev-server --save-dev
```
#### edit webpack.config.js
```shell
...
module.exports = {
    output: {
       // - path: path.resolve(__dirname, "dist/js"),
        + path: path.resolve(__dirname, "dist"),
       // - filename: "bundle.js"
        + filename: "js/bundle.js"
    },
    - mode: "development"
    + devServer: {
        contentBase: './dist'
    },
};
```
### webpack setup (html-webpack-plugin)
#### install html webpack plugin
```shell
npm install html-webpack-plugin --save-dev
```
#### edit webpack.config.js

```shell
...
module.exports = {
   ...
   plugins: [
       new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
       })
   ],
};
```
