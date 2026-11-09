import { getProductos } from "./api.js";
import { renderizarCarrito } from "./cart.js";
import {
  etiquetaCategoria,
  mostrarError,
  mostrarSpinner,
  renderCategorias,
  renderProductos,
} from "./ui.js";

const productList = document.querySelector("#product-list");
const searchInput = document.querySelector("#search-input");
const categoryList = document.querySelector("#category-list");

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

    const etiqueta = normalizarTexto(etiquetaCategoria(producto.category));
    const coincideEtiqueta = texto
      .split(/\s+/)
      .every((palabra) => etiqueta.includes(palabra));

    const coincideBusqueda =
      titulo.includes(texto) || categoria.includes(texto) || coincideEtiqueta;

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

categoryList.addEventListener("click", (evento) => {
  const link = evento.target.closest("[data-categoria]");
  if (!link) return;

  evento.preventDefault();
  categoriaSeleccionada = link.dataset.categoria;

  categoryList.querySelectorAll("[data-categoria]").forEach((item) => {
    item.classList.remove("active");
    item.removeAttribute("aria-current");
  });

  link.classList.add("active");
  link.setAttribute("aria-current", "page");

  aplicarFiltros();
});

const cargarProductos = () => {
  mostrarSpinner(productList);

  getProductos()
    .then((productos) => {
      allProducts = productos;
      const categorias = [...new Set(productos.map((p) => p.category))];
      renderCategorias(categorias, categoryList);
      renderProductos(allProducts, productList);
      aplicarFiltros();
    })
    .catch((err) => {
      console.error("Error: ", err);
      mostrarError(productList, cargarProductos);
    });
};

cargarProductos();
