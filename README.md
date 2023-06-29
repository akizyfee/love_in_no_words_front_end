# 傲嬌甜點 POS 系統 - 前端
<img width="1670" alt="POS" src="https://github.com/akizyfee/love_in_no_words_front_end/assets/47707287/d19f7892-b1d8-44e4-a0e8-ed228ff2273f">


## 專案背景
[傲嬌甜點 POS 系統](https://love-in-no-words-front-end.onrender.com/#/) 的理念是「輕鬆管理，以智慧重新定義餐飲體驗」，
藉由人性化操作介面幫助店家解決管理的痛點、並且達成以下的目標：
* 讓店員容易地滿足顧客的需求
* 讓廚師輕鬆地掌控製作的進度
* 讓店長清楚地瞭解商店的營運


## 專案團隊
| 團隊成員       | 負責範圍          | GitHub 連結  |
| ------------- |:-------------:| -----:|
| Eva       | Leader / 前端  | [hiYifang](https://github.com/hiYifang) |
| Pause     | 前端           | [akizyfee](https://github.com/akizyfee) | 
| Christina | UIUX / 後端   | [ChrisC0210](https://github.com/ChrisC0210) |
| 艾瑞克     | 先行者 / 後端   | [kerickkkkk](https://github.com/kerickkkkk) |
| Kao / 祥  | 後端           | [Patrick-Kao](https://github.com/Patrick-Kao) |


## 開發技術
+ Vue3
+ Vite
+ Pinia
+ Tailwind CSS、Flowbite
+ Socket.IO
+ EChart、C3
+ Vitest
+ GitHub Actions
+ Node.js v18


## 安裝步驟
1. 切換 Node.js 版本
```
nvm use v18
```
2. 取得專案
```
git clone https://github.com/akizyfee/love_in_no_words_front_end.git
```
3. 移動到專案中
```
cd love_in_no_words_front_end
```
4. 引入套件
```
npm ci
```
5. 執行指令
```
// 開發環境
npm run dev

// Vitest 測試
npm run test:unit

// ESlint 格式化
npm run lint

// Prettier 格式化
npm run format
```


## 資料夾說明
| 資料夾 / 檔案 | 說明  |
| ------------- | -----:|
| ```src / __tests__``` | 測試檔案 |
| ```src / apis``` | API 路由 | 
| ```src / assets``` | CSS、圖片 |
| ```src / components``` | 元件 |
| ```src / plugins``` | 第三方套件設置 |
| ```src / router``` | Vue 路由 |
| ```src / stores``` | 統一狀態管理 |
| ```src / utils```  | Hooks |
| ```src / views```  | Pages |
