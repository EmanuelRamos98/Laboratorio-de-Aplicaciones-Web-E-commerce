import { getProductos } from "./api.js";
import { getCarrito, renderizarCarrito } from "./cart.js";
import { mostrarError, mostrarSpinner, renderProductos } from "./ui.js";

let productList = document.querySelector("#product-list");
let allProducts = [];
console.log("hola desde js");

renderizarCarrito();

const cargarProductos = () => {
    mostrarSpinner(productList);

    getProductos()
        .then((productos) => {
            allProducts = productos;
            renderProductos(allProducts, productList);
        })
        .catch((err) => {
            console.error("Error: ", err);
            mostrarError(productList, cargarProductos);
        });
};

cargarProductos();
