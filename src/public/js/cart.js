// cart.js

async function agregarAlCarrito(productId, userId) {
  try {
    // Obtener información del producto
    const responseProduct = await fetch(`/api/products/${productId}`);
    const productData = await responseProduct.json();
    console.log("Datos: ", productData.owner);
    console.log("productID: ", productId);
    console.log("UserId: ", userId);
    // Verificar si el owner del producto es igual al userId
    if (productData.owner === userId) {
      alert("No puedes agregar un producto que te pertenece al carrito.");
      return;
    }
    const response = await fetch(`/api/cart/${userId}/products/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("Producto agregado al carrito exitosamente.");
    } else {
      alert("Hubo un problema al agregar el producto al carrito.");
    }
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
    alert("Error al agregar el producto al carrito.");
  }
}

async function borrarProducto(productId, userId) {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }), // validar datos
    });
    if (response.ok) {
      alert("Producto borrado exitosamente.");
    } else {
      alert("Hubo un problema al borrar el producto.");
    }
  } catch (error) {
    console.error("Error al borrar el producto:", error);
    alert("Error al borrar el producto.");
  }
}
