let productList = [];
let cart = [];


// Hàm gọi API hiển thị sản phẩm
function getProduct(searchTerm){
    apiGetProducts(searchTerm)
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
        });
        
        display(productList);
    })
    .catch((error) =>{
        console.log(error);
    })
}
getProduct();


//=============================================
// Lấy-Lưu dữ liệu vào LocalStorage
function callStorage(){
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cart = cart.map((item) =>{
        return new CartItem (item.product, item.quantity)
    });

    displayCart(cart);
}
callStorage();


//===========================================

// select option - onchange="selectProduct()"
function searchProduct(){
    let valueProduct = dom("#selectProducts").value;

    // Lấy array productList lọc sản phẩm
    // valueProduct = valueProduct.toLowerCase();
    // if(!valueProduct){
    //     display(productList);
    //     return;
    // }
    // const productListNew = productList.filter((product) => {
    //     let typeProduct = product.type.toLowerCase()
    //     return typeProduct === valueProduct;
    // })
    // display(productListNew)

    // Lấy ở Axios lọc sản phẩm 
    getProduct(valueProduct);

}

// Hàm thêm sản phẩm vào giỏ hàng mảng Cart
dom('#showproduct').addEventListener("click", (evt) => {
    const idGet = evt.target.getAttribute("data-id");
    const Eltype = evt.target.getAttribute("data-type");
    

    if(Eltype === "add"){
        const product = productList.find((product) => product.id === idGet)
        let cartItem = new CartItem (product);
        

        if(cart.length === 0 ){
            cart = [...cart,cartItem];
            
        }else{
            const checkCart = cart.find((item) => item.product.id === idGet)
            if(!checkCart){
                cart = [...cart,cartItem];
            }else{
                cart = cart.map((item) => {
                if(item.product.id === idGet){
                    // return {...item, quantity: item.quantity + 1};
                    return new CartItem (item.product, item.quantity + 1); 
                }else{
                    return item;
                }
            })
            }
        }
        
        // Lữu trữ xuống LocalStorage
        localStorage.setItem("cart", JSON.stringify(cart))
        
        displayCart(cart);
    }
})

// Hàm xóa sản phẩm trong giỏ hàng mảng cart
dom("#showDsCart").addEventListener("click", (evt) =>{
    const idGet = evt.target.getAttribute("data-id");
    const elType = evt.target.getAttribute("data-type");
    
    if(elType === "deleteCartItem"){
        cart = cart.filter((item) =>{
            return item.product.id !== idGet;
        });

        // Lữu trữ xuống LocalStorage
        localStorage.setItem("cart", JSON.stringify(cart))

        displayCart(cart);
    }

    // Hàm giảm số lượng
    if(elType === "countDown"){
        cart = cart.map((item) =>{
            if(item.product.id === idGet){
                return new CartItem (item.product, item.quantity - 1); 
            }
            return item;
        })
        displayCart(cart);
    }

    // Hàm tăng số lượng
    if(elType === "countUp"){
        cart = cart.map((item) =>{
            if(item.product.id === idGet){
                return new CartItem (item.product, item.quantity + 1); 
            }
            return item;
        })
        displayCart(cart);
    }
    console.log("cart",cart);
});

// Hàm reset cart 
function resetCart(){
    cart = [];
    displayCart(cart);
}


