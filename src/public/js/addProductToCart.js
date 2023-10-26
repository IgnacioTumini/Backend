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
        Swal.fire({
          icon: "success",
          title: "Producto agregado al carrito!",
          showConfirmButton: false,
          timer: 2000,
        });
        // Handle the response, e.g., display a success message
        console.log("Producto agregado");
        console.log("Response is:", data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error adding product to cart:", error);
      });
  });
});
