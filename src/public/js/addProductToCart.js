const addButton = document.querySelectorAll("#add-to-cart");

addButton.forEach((button) => {
  button.addEventListener("click", () => {
    const productid = button.dataset.pid;
    const cartid = button.dataset.cid;

    fetch(`http://localhost:8080/api/carts/${cartid}/product/${productid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., display a success message
        console.log("Producto agregado al carrito");
        console.log("Response is:", data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error al agregar al carrito:", error);
      });
  });
});
