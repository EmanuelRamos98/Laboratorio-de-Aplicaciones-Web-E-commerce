import { abrirModalCheckout } from "./checkout.js";

let cartContenedor = document.getElementById("cart-items");
let contadorCart = document.getElementById("cart-count");
let contenedorCartCount = document.getElementById("contenedor-cart-count");

const cartFooter = document.getElementById("cart-footer");
const btnVaciar = document.getElementById("btn-vaciar-carrito");
const btnFinalizar = document.getElementById("btn-finalizar-compra");

btnVaciar.addEventListener("click", () => vaciarCarrito());
btnFinalizar.addEventListener("click", () => abrirModalCheckout());

let carrito = JSON.parse(localStorage.getItem("cart")) || [];

export const getCarrito = () => carrito;

export const agregarAlCarrito = (producto) => {
    const existe = carrito.find((pro) => pro.id === producto.id);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(carrito));

    Toast.fire({
        icon: "success",
        title: "¡Producto agregado con exito!",
    });

    return renderizarCarrito();
};

export const renderizarCarrito = () => {
    let template = "";
    if (carrito.length === 0) {
        cartContenedor.innerHTML = `<p class="text-body-secondary text-center mt-4">Tu carrito está vacío.</p>`;
        contenedorCartCount.classList.remove("active");
        cartFooter.style.display = "none";
        return;
    }

    carrito.forEach((pro) => {
        template += `
            <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <!-- Columna de la Imagen -->
                        <div class="col-4 d-flex align-items-center">
                            <img src="${pro.image}" class="img-fluid rounded-start p-2" alt="${pro.title}">
                        </div>
                        
                        <!-- Columna de la Información y Controles -->
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title fs-6">${pro.title}</h5>
                                
                                <!-- Sección recuadrada en rojo en tu imagen (Controles) -->
                                <div class="d-flex align-items-center gap-2 mt-3 mb-3">
                                    <!-- Botón Restar -->
                                    <button class="btn btn-primary btn-sm btn-restar" data-id="${pro.id}" aria-label="Restar una unidad de ${pro.title}">
                                        <i class="bi bi-cart-dash" aria-hidden="true"></i>
                                    </button>
                                    
                                    <!-- Cantidad -->
                                    <span class="border rounded px-3 py-1 text-center" style="min-width: 40px;">
                                        ${pro.cantidad}
                                    </span>
                                    
                                    <!-- Botón Sumar -->
                                    <button class="btn btn-primary btn-sm btn-sumar" data-id="${pro.id}" aria-label="Sumar una unidad de ${pro.title}">
                                        <i class="bi bi-cart-plus" aria-hidden="true"></i>
                                    </button>
                                    
                                    <!-- Botón Eliminar -->
                                    <button class="btn btn-danger btn-sm btn-eliminar ms-1" data-id="${pro.id}" aria-label="Eliminar ${pro.title} del carrito">
                                        <i class="bi bi-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                                
                                <!-- Total del producto (Precio * Cantidad) -->
                                <p class="card-text fw-bold text-center text-md-start">
                                    Total: $ ${(pro.price * pro.cantidad).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    });

    cartContenedor.innerHTML = template;

    cartFooter.style.display = "block";

    contenedorCartCount.classList.add("active");
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCart.innerHTML = total;

    cartContenedor.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", () => eliminarDelCarrito(Number(btn.dataset.id)));
    });

    cartContenedor.querySelectorAll(".btn-sumar").forEach((btn) => {
        btn.addEventListener("click", () => modificarCantidad(Number(btn.dataset.id), 1));
    });

    cartContenedor.querySelectorAll(".btn-restar").forEach((btn) => {
        btn.addEventListener("click", () => modificarCantidad(Number(btn.dataset.id), -1));
    });
};
const finalizarCompra = () => {
    abrirModalCheckout();
};

const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(carrito));
    return renderizarCarrito();
};

const modificarCantidad = (id, delta) => {
    const item = carrito.find((item) => item.id === id);
    if (item) {
        item.cantidad = Math.max(1, item.cantidad + delta);
        localStorage.setItem("cart", JSON.stringify(carrito));

        return renderizarCarrito();
    }
};

export const vaciarCarrito = () => {
    carrito = [];
    localStorage.removeItem("cart");
    return renderizarCarrito();
};

const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: "#212529",
    color: "#fff",
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});
