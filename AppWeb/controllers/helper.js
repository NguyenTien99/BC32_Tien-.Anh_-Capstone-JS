function dom(selector){
    return document.querySelector(selector);
}

function display(productList){
    const html = productList.reduce((result,product) =>{
        return result + `
        <div class="col-3">
            <div class="item">
                <img src="${product.img}" >
                    <div class="product_body">
                        <h4>${product.name}</h4>
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
                            <button class="btn btn-danger mt-2">Mua</button>
                        </div>
                    </div>
            </div>
        </div>
        `
    },"")

    dom("#showproduct").innerHTML = html;
}