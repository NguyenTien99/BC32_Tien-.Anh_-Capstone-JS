function apiGetProducts(){
    return axios({
        url:"https://6312e4e0b466aa9b038f525f.mockapi.io/products",
        method: 'GET',
    });
}