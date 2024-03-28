async function eliminarProducto(productId) {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Producto eliminado exitosamente.");
      // Recargar la página o actualizar la lista de productos
    } else {
      alert("Hubo un problema al eliminar el producto.");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    alert("Error al eliminar el producto.");
  }
}

function mostrarFormularioAgregar() {
  document.getElementById("formularioAgregar").style.display = "block";
}

function mostrarFormularioEditar(productId) {
  const formularioEditar = document.getElementById(`formularioEditar${productId}`);
  if (formularioEditar) {
    formularioEditar.style.display = "block";
  } else {
    console.error(`Elemento con id formularioEditar${productId} no encontrado.`);
  }
}

async function actualizarProducto(productId) {
  try {
    const newTitle = document.getElementById('updateTitle').value;
    const newDescription = document.getElementById('updateDescription').value;
    const newCode = document.getElementById('updateCode').value;
    const newPrice = document.getElementById('updatePrice').value;
    const newStatus = document.getElementById(`updateStatus${productId}`).checked;
    const newStock = document.getElementById('updateStock').value;
    const newCategory = document.getElementById('updateCategory').value;

    const response = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        code: newCode,
        price: newPrice,
        status: newStatus,
        stock: newStock,
        category: newCategory
      })
    });

    if (response.ok) {
      alert('Producto actualizado exitosamente.');
      // Recargar la página o actualizar la lista de productos
    } else {
      alert('Hubo un problema al actualizar el producto.');
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    alert('Error al actualizar el producto.');
  }
}
