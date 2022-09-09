let productList = [];

function getProduct(){
    apiGetProducts()
    .then((response) =>{
        productList = response.data.map(product =>{
            return new Product(
                product.id,
                product.name,
                product.price,
                product.screen,
                product.backCamera,
                product.frontCamera,
                product.img,
                product.desc,
                product.type
                )
        })
        
        display(productList);
    })
    .catch((error) =>{
        console.log(error);
    })
}
getProduct();