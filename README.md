# Cafeca-Webapp
coffee shop on the cloud - 咖啡不只是咖啡



# Cafeca-Webapp

## Deploy
### 安裝函式庫
```shell
bash <(curl https://raw.githubusercontent.com/Luphia/SIMPLE/master/shell/install-simple.sh -kL)
sudo apt-get update
sudo apt-get install openssl libtool autoconf automake uuid-dev build-essential gcc g++ software-properties-common unzip make git libcap2-bin python -y
```

### 初始化資料夾
```shell
sudo mkdir /etc/Cafeca-Webapp
sudo chown ubuntu /etc/Cafeca-Webapp
sudo mkdir /etc/Cafeca-Backend
sudo chown ubuntu /etc/Cafeca-Backend
```

### 複製專案
```shell
https://github.com/MerMerLtd/Cafeca-Webapp
https://github.com/MerMerLtd/Cafeca-Backend
```

### 安裝相依套件
```shell
cd /etc/Cafeca-Webapp && npm i && npm i webpack node-sass live-server --save-dev
cd /etc/Cafeca-Backend && npm i
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



### 設定參數
```shell
mkdir /etc/Cafeca-Backend/private/
cp /etc/Cafeca-Backend/sample.config.toml /etc/Cafeca-Backend/private/config.toml
vi /etc/Cafeca-Backend/private/config.toml
```
```file
# CafecaBackend Default Config

title = "CafecaBackend"

[base]
folder = "CafecaBE"
static = "/etc/Cafeca-Webapp"
debug = false

[blockchain]
type = "ethereum"

[database]
type = "firebase"

[api]
pathname = [
  "get | /,/version | Static.Utils.readPackageInfo",
  "get | /api/questions | Bot.FindCafeca.getQuestions",
  "get | /api/suggestion | Bot.FindCafeca.getSuggestion",
  "get | /api/store/:storeID | Bot.FindCafeca.getStore",
  "get | /policy/* | Static.Utils.readPackageInfo"
]
```

### 啟動伺服器
```shell
pm2 start /etc/Cafeca-Backend/ --name Cafeca
```

