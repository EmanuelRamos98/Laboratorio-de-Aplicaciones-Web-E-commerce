export const getProductos = () => {
    const response = fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => data)
        .catch((_err) => console.log("Erro: ", _err));

    console.table(response)
    return response;
};
