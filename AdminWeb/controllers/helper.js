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
                    <td>${product.image}</td>
                    <td>${product.desc}</td>
                    <td></td>
                </tr>
            `
    );
  }, "");
  console.log(output);
  dom("#tblDanhSachNguoiDung").innerHTML = output;
}
