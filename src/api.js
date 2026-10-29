export const getProductos = () => {
    const response = fetch("https://fakestoreapi.com/products")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.table(data);
            return data;
        });

    return response;
};
