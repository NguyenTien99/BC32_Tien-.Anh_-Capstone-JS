function apiGetProducts(){
    return axios({
        url:"https://63187fd6ece2736550cba53a.mockapi.io/products",
        method: 'GET',
    });
}

function apiAddProducts(product){
    return axios({
        url:"https://63187fd6ece2736550cba53a.mockapi.io/products",
        method: 'POST',
        data: product,
    });
}
function apiDeleteProducts(productId){
    return axios({
        url:`https://63187fd6ece2736550cba53a.mockapi.io/products/${productId}`,
        method: 'DELETE',
    });
}
function apiUpdateProducts(productId, product){
    console.log(productId, product)
    return axios({
        url:`https://63187fd6ece2736550cba53a.mockapi.io/products/${productId}`,
        method: 'PUT',
        data: product,
    });

}
function apiGetProductsById(productId){
    return axios({
        url:`https://63187fd6ece2736550cba53a.mockapi.io/products/${productId}`,
        method: "GET",
    });
}
