// let products = [];
getProducts();
function getProducts(){
    apiGetProducts()
    .then((response) => {
        console.log(response.data)
        products = response.data.map((product) =>{
            return new Product(
                product.id, 
                product.name, 
                product.price, 
                product.img, 
                product.desc);
        })
        
        display(products);
        console.log("get",products)
    })
    .catch((error) => {
        console.log(error);
    })
}

//=======================================================

// Thêm mới


function addProducts(product){
    apiAddProducts(product)
    .then(() => {
        
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
    
}
function deleteProducts(productId){
    apiDeleteProducts(productId)
    .then(()=>{
        getProducts();
    })
    .catch((error)=>{
        console.log(error);
    })
}
function updateProducts(productId, product){
    apiUpdateProducts(productId,product)
    .then(() => {
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });

}

function resetForm() {
    dom("#maId").value = "";
    dom("#tenSP").value = "";
    dom("#giaSP").value = "";
    dom("#hinhSP").value = "";
    dom("#moTaSP").value = "";

  }
  
  function resetspan() {
    dom("#tenSP").innerHTML = "";
    dom("#giaSP").innerHTML = "";
    dom("#hinhSP").innerHTML = "";
    dom("#motaSP").innerHTML = "";

  
    dom("#spanName").classList.remove("d-block");
    dom("#spanPrice").classList.remove("d-block");
    dom("#spanImage").classList.remove("d-block");
    dom("#spanMota").classList.remove("d-block");
  }
  dom("#btnThemNguoiDung").addEventListener("click", () =>{
    dom(".modal-title").innerHTML = "Thêm sản phẩm"
    dom(".modal-footer").innerHTML = `
        <button class="btn btn-danger data-dismiss="modal">Hủy</button>
        <button class="btn btn-success" data-type="add">Thêm mới</button>
    `
    ;
    resetForm();
    resetspan();
})

dom(".modal-footer").addEventListener("click", (evt) => {
    let elementType = evt.target.getAttribute("data-type");
    // // dom
    let id = dom("#maId").value;
    let tenSP = dom("#tenSP").value;
    let giaSP = dom("#giaSP").value;
    let hinhSP = dom("#hinhSP").value;
    let moTaSP = dom("#moTaSP").value;

    let product = new Product(
        null,
       tenSP,
       giaSP,
       hinhSP,
       moTaSP,
      );
      if (elementType === "add") {
        // let isvalid = validateForm();
        // if (!isvalid) {
        //   return;
        // }
        addProducts(product);
      } else if (elementType === "update") {
        // let isvalid = validateForm();
        // if (!isvalid) {
        //   return;
        // }
        updateProducts(id, product);

      }
    });

    dom("#tblDanhSachNguoiDung").addEventListener("click", (evt) => {
        let elementType = evt.target.getAttribute("data-type");
        let id = evt.target.getAttribute("data-id");
        console.log(evt.target)
        console.log("id1",id)
        if (elementType === "delete") {
          deleteProducts(id);
        } else if (elementType === "edit") {
          // thay đổi hiển thị
          dom(".modal-title").innerHTML = "Cập nhật sản phẩm";
          dom(".modal-footer").innerHTML = `
          <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
          <button class="btn btn-success" data-type="update">Cập nhật</button>
          `;
          // call api get /:id để lấy chi tiết thông tin 1 dữ liệu
          apiGetProductsById(id)
          console.log("idAPI",id)
            .then((response) => {
              let product= response.data;
              console.log(product)
              //fill thông tin lên input
              dom("#maId").value = product.id;
              dom("#tenSP").value =product.tenSP;
              dom("#giaSP").value = product.giaSP;
              dom("#hinhSP").value = product.hinhSP;
              dom("#moTaSP").value = product.moTaSP;
              resetspan();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });