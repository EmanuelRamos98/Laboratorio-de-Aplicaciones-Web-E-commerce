export const getProductos = () => {
    const response = fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            return data
        })
        .catch((_err) => console.log("Erro: ", _err));

    
    return response;
};
