let productList = [];
let cart = [];

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


//===========================================
dom('#showproduct').addEventListener("click", (evt) => {
    const idGet = evt.target.getAttribute("data-id")
    const Eltype = evt.target.getAttribute("data-type")
    console.log("id",idGet)

    if(Eltype === "add"){
        const product = productList.find((product) => product.id === idGet)
        let cartItem = new CartItem (product);

        console.log("productId",product.id)
        console.log("cartItem",cartItem)
        console.log('cartItemImg',cartItem.product.img)
        // console.log("cartItem",cartItem.product.id)



        // if(cart.length === 0 ){
        //     cart = [...cart,cartItem];
            
        // }else{
        //     const checkCart = cart.find((item) => item.product.id === idGet)
        //     console.log("checkCart",checkCart)
        //     if(!checkCart){
        //         cart = [...cart,cartItem]
        //     }else{
        //         cart = cart.map((item) => {
        //         if(item.product.id === idGet){
        //             console.log('idGet:',idGet)
        //             return {...item, quantity: item.quantity + 1};
        //         }else{
        //             // return [...cart,cartItem];
        //             return item;
        //         }
        //     })
        //     }
        // }

        if(cart.length === 0 ){
            cart = [...cart,cartItem];
            
        }else{
            const checkCart = cart.find((item) => item.product.id === idGet)
            console.log("checkCart",checkCart)
            if(!checkCart){
                cart = [...cart,cartItem]
            }else{
                cart = cart.map((item) => {
                if(item.product.id === idGet){
                    console.log('idGet:',idGet)
                    return new CartItem (item.product, item.quantity + 1);  
                }else{
                    // return [...cart,cartItem];
                    return item;
                }
            })
            }
        }
        
        displayCart(cart);
        console.log("cart",cart)
           
    }
})
