import { getProductos } from "./api.js";
import { renderizarCarrito } from "./cart.js";
import { mostrarError, mostrarSpinner, renderProductos } from "./ui.js";

const productList = document.querySelector("#product-list");
const searchInput = document.querySelector("#search-input");
const categoryLinks = document.querySelectorAll("[data-categoria]");

let allProducts = [];
let textoBuscado = "";
let categoriaSeleccionada = "todas";

renderizarCarrito();

const normalizarTexto = (texto) =>
  texto
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const aplicarFiltros = () => {
  const texto = normalizarTexto(textoBuscado);
  let cantidadVisible = 0;

  const tarjetas = productList.querySelectorAll(".card-producto");

  if (tarjetas.length === 0) return;

  tarjetas.forEach((tarjeta) => {
    const producto = allProducts.find(
      (item) => item.id === Number(tarjeta.dataset.id)
    );

    if (!producto) return;

    const categoria = normalizarTexto(producto.category);
    const titulo = normalizarTexto(producto.title);

    let coincideBusqueda;

    if (texto === "joyeria") {
      coincideBusqueda = categoria === "jewelery";
    } else if (texto === "ropa") {
      coincideBusqueda =
        categoria === "men's clothing" ||
        categoria === "women's clothing";
    } else if (["hombre", "ropa hombre", "ropa de hombre"].includes(texto)) {
      coincideBusqueda = categoria === "men's clothing";
    } else if (["mujer", "ropa mujer", "ropa de mujer"].includes(texto)) {
      coincideBusqueda = categoria === "women's clothing";
    } else {
      coincideBusqueda =
        titulo.includes(texto) || categoria.includes(texto);
    }

    const coincideCategoria =
      categoriaSeleccionada === "todas" ||
      categoria === normalizarTexto(categoriaSeleccionada);

    const mostrar = coincideBusqueda && coincideCategoria;

    tarjeta.parentElement.classList.toggle("d-none", !mostrar);

    if (mostrar) cantidadVisible++;
  });

  let mensajeSinResultados = document.querySelector("#no-results");

  if (cantidadVisible === 0) {
    if (!mensajeSinResultados) {
      mensajeSinResultados = document.createElement("div");
      mensajeSinResultados.id = "no-results";
      mensajeSinResultados.className = "col-12";
      mensajeSinResultados.innerHTML =
        '<p class="text-body-secondary" role="status">No se encontraron productos.</p>';
      productList.appendChild(mensajeSinResultados);
    }
  } else if (mensajeSinResultados) {
    mensajeSinResultados.remove();
  }
};

searchInput.addEventListener("input", (evento) => {
  textoBuscado = evento.target.value;
  aplicarFiltros();
});

searchInput.form.addEventListener("submit", (evento) => {
  evento.preventDefault();
});

categoryLinks.forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
    categoriaSeleccionada = link.dataset.categoria;

    categoryLinks.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });

    link.classList.add("active");
    link.setAttribute("aria-current", "page");

    aplicarFiltros();
  });
});

const cargarProductos = () => {
  mostrarSpinner(productList);

  getProductos()
    .then((productos) => {
      allProducts = productos;
      renderProductos(allProducts, productList);
      aplicarFiltros();
    })
    .catch((err) => {
      console.error("Error: ", err);
      mostrarError(productList, cargarProductos);
    });
};

cargarProductos();
