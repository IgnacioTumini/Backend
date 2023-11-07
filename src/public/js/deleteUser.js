const deleteUserButtons = document.querySelectorAll("#deleteUser");

deleteUserButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the product's ID from a data attribute on the button
    const userId = button.dataset.user;

    // Make a fetch request to add the product to the cart using the productId
    fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Usuario eliminado, por favor refresque la pagina!",
        });
        console.log("Usuario borrado");
        console.log("Response is:", data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error adding product to cart:", error);
      });
  });
});
