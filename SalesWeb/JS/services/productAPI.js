function apiGetProducts(){
    return axios({
        url: "https://63187fd6ece2736550cba53a.mockapi.io/products",
        method: "GET",
    })
}

