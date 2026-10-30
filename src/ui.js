import { agregarAlCarrito } from "./cart.js";
import { abrirModalDetalle } from "./modal.js";

export const mostrarSpinner = (contenedor) => {
    contenedor.innerHTML = `
                <div class="col-12 d-flex justify-content-center py-5">
                    <div class="spinner-border text-info" role="status" style="width: 3rem; height: 3rem;">
                        <span class="visually-hidden">Cargando productos...</span>
                    </div>
                </div>
    `;
};

export const mostrarError = (contenedor, onReintentar) => {
    contenedor.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-wifi-off fs-1 text-body-secondary" aria-hidden="true"></i>
                    <p class="text-body-secondary mt-2">No se pudieron cargar los productos.</p>
                </div>
    `;

    Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No pudimos cargar los productos. Revisá tu conexión e intentá de nuevo.",
        confirmButtonText: "Reintentar",
        showCancelButton: true,
        cancelButtonText: "Cerrar",
        background: "#1c1f26",
        color: "#e9ecef",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-primario px-4 me-2",
            cancelButton: "btn btn-outline-secondary px-4",
        },
    }).then((resultado) => {
        if (resultado.isConfirmed) onReintentar();
    });
};

export const renderProductos = (productos, contenedor) => {
    let template = "";
    productos.forEach((pro) => {
        template += `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <article class="card card-producto h-100">
                        <img src="${pro.image}" data-id="${pro.id}" class="card-img-top img-producto" alt="${pro.title}" />
                        <div class="card-body d-flex flex-column">
                            <h3 class="card-title h6">${pro.title}</h3>
                            <p class="card-text">${pro.description}</p>
                            <p class="precio mt-auto mb-3">$${pro.price.toFixed(2)}</p>
                        </div>
                    </article>
                </div>
    `;
    });
    contenedor.innerHTML = template;

    contenedor.addEventListener("click", (e) => {
        const img = e.target.closest(".img-producto");
        if (img) {
            const producto = productos.find(
                (p) => p.id === Number(img.dataset.id),
            );
            abrirModalDetalle(producto);
        } else {
            return;
        }
    });
};
