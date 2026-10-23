export const renderProductos = (productos, contenedor) => {
    let template = "";
    productos.forEach((pro) => {
        template += `
                <div class="card-body">
                    <img src="${pro.image}" class="card-img" alt="${pro.title}" />
                    <h5 class="mt-2 mb-0">${pro.title}</h5>
                    <p class="card-text text-body-secondary">${pro.description}</p>
                    <small class="text-body-tertiary">Last updated 3 mins ago</small>
                </div>
    `;
    });
    contenedor.innerHTML = template;
};
