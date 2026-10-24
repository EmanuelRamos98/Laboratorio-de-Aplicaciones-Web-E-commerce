import { agregarAlCarrito } from "./cart.js";

export const renderProductos = (productos, contenedor) => {
    let template = "";
    productos.forEach((pro) => {
        template += `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <article class="card card-producto h-100">
                        <img src="${pro.image}" class="card-img-top" alt="${pro.title}" />
                        <div class="card-body d-flex flex-column">
                            <h3 class="card-title h6">${pro.title}</h3>
                            <p class="card-text">${pro.description}</p>
                            <p class="precio mt-auto mb-3">$${pro.price.toFixed(2)}</p>
                            <button type="button" class="btn btn-primario w-100 btn-agregar-carrito" data-id="${pro.id}">
                                <i class="bi bi-cart-plus" aria-hidden="true"></i>
                                Agregar al carrito
                            </button>
                        </div>
                    </article>
                </div>
    `;
    });
    contenedor.innerHTML = template;

    contenedor.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn-agregar-carrito");
        if (btn) {
            const producto = productos.find(
                (p) => p.id === Number(btn.dataset.id),
            );
            agregarAlCarrito(producto);
        } else {
            return;
        }
    });
};
