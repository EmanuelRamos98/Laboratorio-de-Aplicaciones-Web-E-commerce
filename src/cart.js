let carrito = [];

export const getCarrito = () => carrito;

export const agregarAlCarrito = (producto) => {
    carrito.push(producto);
};
