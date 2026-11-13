import { getTotalCarrito, vaciarCarrito } from "./cart.js";

const modalCheckoutElement = document.getElementById("modalCheckout");
const modalCheckoutBootstrap = new bootstrap.Modal(modalCheckoutElement);
const formCheckout = document.getElementById("form-checkout");

modalCheckoutElement.addEventListener("hide.bs.modal", () => {
    if (document.activeElement) {
        document.activeElement.blur();
    }
});

export const abrirModalCheckout = () => {
    const offcanvasElement = document.getElementById("cartSidebar");
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) {
        offcanvasInstance.hide();
    }

    formCheckout.classList.remove("was-validated");
    formCheckout.reset();
    document.getElementById("checkout-total").textContent =
        `$ ${getTotalCarrito().toFixed(2)}`;
    modalCheckoutBootstrap.show();
};

// Manejamos el envio del formulario con la validacion nativa de bootstrap
formCheckout.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!formCheckout.checkValidity()) {
        formCheckout.classList.add("was-validated");
        return;
    }

    //Capturamos los datos ingresados
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;
    const ciudad = document.getElementById("ciudad").value;
    const email = document.getElementById("email").value;

    modalCheckoutBootstrap.hide();

    // Ocultamos el modal
    modalCheckoutBootstrap.hide();

    // Mostramos alerta
    Swal.fire({
        icon: "success",
        title: "¡Compra exitosa!",
        html: `
            <div class="text-start mt-2 p-3 border rounded" style="background-color: #212529;">
                <p class="mb-2">Gracias por tu compra, <strong>${nombre} ${apellido}</strong>.</p>
                <p class="mb-2">Enviaremos tu pedido a la siguiente dirección:</p>
                <p class="mb-2 text-info"><i class="bi bi-geo-alt-fill"></i> <strong>${direccion}, ${ciudad}</strong></p>
                <hr class="border-secondary">
                <p class="mb-0" style="font-size: 0.9rem;">Te enviamos el comprobante a: <em>${email}</em></p>
            </div>
        `,
        background: "#1c1f26",
        color: "#e9ecef",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-primario px-4",
        },
        confirmButtonText: "Entendido",
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
        }
    });
});
