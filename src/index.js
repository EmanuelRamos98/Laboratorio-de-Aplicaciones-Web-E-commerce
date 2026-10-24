import { getProductos } from "./api.js";
import { getCarrito, renderizarCarrito } from "./cart.js";
import { renderProductos } from "./ui.js";

let productList = document.querySelector("#product-list");
console.log("hola desde js");

renderizarCarrito();

getProductos().then((productos) => {
    renderProductos(productos, productList);
});
