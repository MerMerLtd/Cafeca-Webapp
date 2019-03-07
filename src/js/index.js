import "../sass/main.scss";

import cartitemsModel from "./models/cartitemsModel";
import collectionsModel from "./models/collectionsModel";
import creditcardModel from "./models/creditCardModel";
import possessionsModel from "./models/possessionsModel"
import ProductsModel from "./models/productsModel";
import userModel from "./models/userModel";

import * as collectionsView from "./views/collectionsView";
import * as possessionView from "./views/possessionsView";
import * as productView from "./views/productView";

/** Global state of the app
 * - products list object
 * - cartitems object
 * - collections object
 * - possessions object
 */
const state = {};
const display = document.querySelector(".display");
console.log(display)

// console.log(ProductModel);
const products = Object.create(ProductsModel);
// console.log(products)
products.makeRequest();