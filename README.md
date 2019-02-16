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
    "watch:sass": "node-sass src/sass/main.scss dist/css/style.css -w",
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
```
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
```
...

"scripts": {
    ...
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development --open"
  },
  
...
```
#### create bundle.js
```
npm run dev
```
### webpack setup (dev server)
#### install webpack dev server
```
npm install webpack-dev-server --save-dev
```
#### edit webpack.config.js
```
...
module.exports = {
   ...
    devServer: {
        contentBase: './dist'
    },
};
```
