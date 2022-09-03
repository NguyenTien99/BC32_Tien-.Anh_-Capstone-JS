let products = [];
getProducts();
function getProducts(){
    apiGetProducts()
    .then((response) => {
        // console.log(response.data)
        products = response.data.map((product) =>{
            return new Product(product.id, product.name, product.price, product.image, product.desc);
        })
        
        display(products);
    })
    .catch((error) => {
        console.log(error);
    })
}

//=======================================================

// Thêm mới
dom("#btnThemNguoiDung").addEventListener("click", () =>{
    dom(".modal-title").innerHTML = "Thêm sản phẩm"
    dom(".modal-footer").innerHTML = `
        <button class="btn btn-danger">Hủy</button>
        <button class="btn btn-success">Thêm mới</button>
    `
})