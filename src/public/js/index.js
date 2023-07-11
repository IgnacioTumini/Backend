const socket = io();

const formProducts = document.getElementById("form-products");
const dinamicListProducts = document.getElementById("validationCustom07");

socket.on("products", (newProductList) => {
  let newProducts = "";
  console.log(newProductList);
  newProductList.map((p) => {
    newProducts += `<div class="card">
                        <div>Nombre: ${p.title}</div>
                        <div>Descripcion: ${p.description}</div>
                        <div>Precio: ${p.price}</div>
                        <div>Imagen: ${p.thumbnail}</div>
                        <div>Codigo: ${p.code}</div>
                        <div>Stock: ${p.stock}</div>
                        <div>Id: ${p.id}</div>
                      </div>`;
  });
  dinamicListProducts.innerHTML = newProducts;
});

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  const dataform = new FormData(formProducts);
  const newProduct = {};
  dataform.forEach((valorCampo, nombreCampo) => {
    newProduct[nombreCampo] = valorCampo;
  });
  socket.emit("new-product", newProduct);
});

// ChatBox
/*
let = user;
let chatBox = document.getElementById(chatBox);

Swal.fire({
  tittle: "Bienvenido a nuestro chat !! ",
  input: "text",
  text: "Ingresa por favor tu nombre:",
  inputValidator: (value) => {
    return !value && "Se requiere un nombre para continuar!!";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let messages = "";

  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message} </br>`;
  });
  log.innerHTML = messages;
});
*/
