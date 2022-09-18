let products = [];
getProducts();
function getProducts(){
    apiGetProducts()
    .then((response) => {
        // console.log(response.data)
        products = response.data.map((product) =>{
            return new Product(
                product.id, 
                product.name, 
                product.price, 
                product.screen,
                product.frontCamera,
                product.backCamera,
                product.img, 
                product.type,
                product.desc
                );
        })
        
        display(products);
        // console.log("get",products)
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
    dom("#manHinhSP").value = "";
    dom("#camTruocSP").value="";
    dom("#camSauSP").value="";
    dom("#hinhSP").value = "";
    dom("#loaiSP").value = "";
    dom("#moTaSP").value = "";

  }
  
  function resetspan() {
    dom("#tenSP").innerHTML = "";
    dom("#giaSP").innerHTML = "";
    dom("#manHinhSP").innerHTML ="";
    dom("#camTruocSP").innerHTML ="";
    dom("#camSauSP").innerHTML="";
    dom("#hinhSP").innerHTML = "";
    dom("#loaiSP").innerHTML ="";
    dom("#moTaSP").innerHTML = "";

  
    dom("#spanName").classList.remove("d-block");
    dom("#spanPrice").classList.remove("d-block");
    dom("#spanScreen").classList.remove("d-block");
    dom("#spanFrontCam").classList.remove("d-block");
    dom("#spanBackCam").classList.remove("d-block");
    dom("#spanImage").classList.remove("d-block");
    dom("#spanType").classList.remove("d-block");
    dom("#spanMota").classList.remove("d-block");
  }
  dom("#btnThemNguoiDung").addEventListener("click", () =>{
    dom(".modal-title").innerHTML = "Thêm sản phẩm"
    dom(".modal-footer").innerHTML = `
        <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
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
    let manHinhSP = dom("#manHinhSP").value;
    let camTruocSP = dom("#camTruocSP").value;
    let camSauSP = dom("#camSauSP").value;
    let hinhSP = dom("#hinhSP").value;
    let loaiSP = dom("#loaiSP").value;
    let moTaSP = dom("#moTaSP").value;

    let product = new Product(
        null,
       tenSP,
       giaSP,
       manHinhSP,
       camTruocSP,
       camSauSP,
       hinhSP,
       loaiSP,
       moTaSP,
      );
      if (elementType === "add") {
        let isvalid = validateForm();
        if (!isvalid) {
          return;
        }
        addProducts(product);
      } else if (elementType === "update") {
        let isvalid = validateForm();
        if (!isvalid) {
          return;
        }
        updateProducts(id, product);

      }
    });

    dom("#tblDanhSachNguoiDung").addEventListener("click", (evt) => {
        let elementType = evt.target.getAttribute("data-type");
        let id = evt.target.getAttribute("data-id");
        console.log(evt.target)
        console.log("1",id)
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
            .then((response) => {
              let product= response.data;

              //fill thông tin lên input
              dom("#maId").value = product.id;
              dom("#tenSP").value =product.name;
              dom("#giaSP").value = product.price;
              dom("#manHinhSP").value = product.screen;
              dom("#camTruocSP").value = product.frontCamera;
              dom("#camSauSP").value = product.backCamera;
              dom("#hinhSP").value = product.img;
              dom("#loaiSP").value = product.type;
              dom("#moTaSP").value = product.desc;
              resetspan();
            })
            .catch((error) => {
              console.log(error);
            });
        }
});

dom("#search").addEventListener("keydown", (evt) => {
  console.log(evt.key);

  // Kiểm tra không phải kí tự Enter kết thúc hàm
  if (evt.key== "Enter") return;

  getProducts(evt.target.value);
});

function validateName(){
  let name = dom("#tenSP").value;
  let spanEl = dom("#spanName");

  if (!name) {
    spanEl.classList.add("d-block");
    spanEl.innerHTML ="Tên không được để trống";
    return false;
  }
  
  spanEl.classList.remove("d-block");
  spanEl.innerHTML = "";
  return true;
}
function validatePrice(){
  let price = dom("#giaSP").value;
  let spanEl = dom("#spanPrice");

  if (!price) {
    spanEl.classList.add("d-block");
    spanEl.innerHTML ="Gía không được để trống";
    return false;
  }
  
  spanEl.classList.remove("d-block");
  spanEl.innerHTML = "";
  return true;
}
function validateScreen(){
  let screen = dom("#manHinhSP").value;
  let spanEl = dom("#spanScreen");

  if (!screen) {
    spanEl.classList.add("d-block");
    spanEl.innerHTML ="Màn hình không được để trống";
    return false;
  }
  
  spanEl.classList.remove("d-block");
  spanEl.innerHTML = "";
  return true;
}
function validateFrontCamera(){
  let front = dom("#camTruocSP").value;
  let spanEl = dom("#spanFrontCam");

  if (!front) {
    spanEl.classList.add("d-block");
    spanEl.innerHTML ="Cam trước không được để trống";
    return false;
  }
  
  spanEl.classList.remove("d-block");
  spanEl.innerHTML = "";
  return true;
}
function validateBackCamera(){
  let back = dom("#camSauSP").value;
  let spanEl = dom("#spanBackCam");

  if (!name) {
    spanEl.classList.add("d-block");
    spanEl.innerHTML ="Cam sau không được để trống";
    return false;
  }
  
  spanEl.classList.remove("d-block");
  spanEl.innerHTML = "";
  return true;
}
function validateImage(){
  let img = dom("#hinhSP").value;
  let spanEl = dom("#spanImage");

  if (!img) {
    spanEl.classList.add("d-block");
    spanEl.innerHTML ="Hình không được để trống";
    return false;
  }
  
  spanEl.classList.remove("d-block");
  spanEl.innerHTML = "";
  return true;
}
function validateType(){
  let type = dom("#loaiSP").value;
  let spanEl = dom("#spanType");

  if (!type) {
    spanEl.classList.add("d-block");
    spanEl.innerHTML ="Tên không được để trống";
    return false;
  }
  
  spanEl.classList.remove("d-block");
  spanEl.innerHTML = "";
  return true;

}
function validateDesc(){

  let desc = dom("#moTaSP").value;
  let spanEl = dom("#spanMota");

  if (!name) {
    spanEl.classList.add("d-block");
    spanEl.innerHTML ="Mô tả không được để trống";
    return false;
  }
  
  spanEl.classList.remove("d-block");
  spanEl.innerHTML = "";
  return true;
}
function validateForm(){
  let isvalid = true;
  isvalid = 
  validateName() &
  validatePrice()&
  validateScreen() &
  validateFrontCamera() &
  validateBackCamera()&
  validateImage()&
  validateType()&
  validateDesc();
  console.log("validataAccount() sau: ", validateName());
  if(!isvalid){
    alert("Form không hợp lệ");
    return false;
  }

  return true;

  }