import { getProductos } from "./api.js";
import { renderProductos } from "./ui.js";

let productList = document.querySelector("#product-list");
console.log("hola desde js")

getProductos().then((productos) => {
    renderProductos(productos, productList);
});
