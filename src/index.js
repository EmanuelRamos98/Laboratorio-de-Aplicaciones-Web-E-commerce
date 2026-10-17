import { getProductos } from "./api.js";

let productList = document.querySelector("#product-list");

getProductos().then((productos) => {
    let template = "";
    productos.forEach((pro) => {
        template += `
                <div class="card-body">
                    <img src="${pro.image}" class="card-img" alt="${pro.title}" />
                    <h5 class="mt-2 mb-0">${pro.title}</h5>
                    <p class="card-text fg-2">${pro.description}</p>
                    <small class="fg-3">Last updated 3 mins ago</small>
                </div>
    `;
    });
    productList.innerHTML = template;
});
