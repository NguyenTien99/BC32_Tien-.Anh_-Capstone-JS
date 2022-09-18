function dom(selector){
    return document.querySelector(selector);
}

function display(productList){
    const html = productList.reduce((result,product) =>{
        return result + `
        <div class=" col-6 col-lg-4">
            <div class="item">
                <img src="${product.img}">
                    <div class="product_body">
                        <h5>${product.name}</h5>
                        <p>${product.price}</p>
                    </div>
                    <div class="item__detail">
                        <p>Tên: ${product.name}</p>  
                        <p>Sreen: ${product.screen}</p>
                        <p>Backcamera: ${product.backCamera}</p>
                        <p>Frontcamera: ${product.frontCamera}</p>
                        <p>Mô tả: ${product.desc}</p>
                        <p>Đánh giá:
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </p>
                        <div class="item__button">
                            <button class="btn btn-success mt-2" data-id="${product.id}" data-type="add">Mua</button>
                        </div>
                    </div>
            </div>
        </div>
        `
    },"")

    dom("#showproduct").innerHTML = html;
}

function displayCart(cart){
    const output = cart.reduce((result,cartItem) =>{
        return result + `
        <tr>
            <td><img src="${cartItem.product.img}"></td>
            <td>${cartItem.product.name}</td>
            <td>
                <div class="countQuantity">
                    <i class="fa fa-angle-left" data-id="${cartItem.product.id}" data-type="countDown"></i>
                    ${cartItem.quantity}
                    <i class="fa fa-angle-right" data-id="${cartItem.product.id}" data-type="countUp"></i>
                </div>
            </td>
            <td>${cartItem.product.price}</td>
            <td>
                <button class="btn btn-danger" data-id="${cartItem.product.id}" data-type="deleteCartItem">Xóa</button>
            </td>
        </tr>
        `
    },"")

    const totalCart = cart.reduce((result,cartItem) =>{
        return result + cartItem.calcTotal()
    },0);



    dom("#showDsCart").innerHTML = output;
    dom("#totalCart").innerHTML ="Tổng thanh toán: "+ totalCart + " vnđ";
}


