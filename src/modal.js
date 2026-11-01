import { agregarAlCarrito } from "./cart.js";

let productoModalActual = null;
let modalBootstrap = null;

export const abrirModalDetalle = (producto) => {
    productoModalActual = producto;

    const modalElement = document.getElementById("modalProducto");
    const titulo = document.getElementById("modal-titulo");
    const precio = document.getElementById("modal-precio");
    const imagen = document.getElementById("modal-imagen");
    const btnAgregar = document.getElementById("btn-agregar-modal");

    if (!modalBootstrap) {
        modalBootstrap = new bootstrap.Modal(modalElement);

        modalElement.addEventListener("hide.bs.modal", () => {
            if (modalElement.contains(document.activeElement)) {
                document.activeElement.blur();
            }
        });

        btnAgregar.addEventListener("click", () => {
            if (productoModalActual) {
                agregarAlCarrito(productoModalActual);
                modalBootstrap.hide();
            }
        });
    }

    titulo.textContent = producto.title;
    precio.textContent = `$ ${producto.price.toFixed(2)}`;
    imagen.src = producto.image;
    imagen.alt = producto.title;

    modalBootstrap.show();
};
