// Hàm DOM
function dom(selector) {
  return document.querySelector(selector);
}

// Hàm hiển thị
function display(products) {
  const output = products.reduce((result, product, index) => {
    return (
      result +
      `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.screen}</td>
                    <td>${product.frontCamera}</td>
                    <td>${product.backCamera}</td>
                    <td>
                     <img src="${product.img}" width="50px" height = "50px">
                    </td>
                    <td>${product.type}</td>
                    <td>${product.desc}</td>
                    <td>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-type="edit" data-id="${
                      product.id
                    }">Sửa</button>
                    <button class="btn btn-danger" data-type="delete" data-id="${
                      product.id
                    }">Xóa</button></td>
                </tr>
            `
    );
  }, "");
  console.log("display",products)
  console.log(output);
  dom("#tblDanhSachNguoiDung").innerHTML = output;
}
