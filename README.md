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
