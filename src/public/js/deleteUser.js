const deleteUserButtons = document.querySelectorAll("#deleteUser");
console.log("afuera del event");

deleteUserButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the product's ID from a data attribute on the button
    const userId = button.dataset.user;
    console.log("entro");
    // Make a fetch request to add the product to the cart using the productId
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Usuario borrado");
        console.log("Response is:", data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error adding product to cart:", error);
      });
  });
});
