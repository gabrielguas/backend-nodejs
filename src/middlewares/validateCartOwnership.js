const validateCartOwnership = (req, res, next) => {
  try {
    const userId = req.session.user._id; // ID del usuario de la sesión
    const cartUserId = req.params.userId; // ID del usuario del carrito

    // Verificar si el usuario del carrito coincide con el usuario de la sesión
    if (cartUserId !== userId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esa acción" });
    }

    // Si el usuario tiene permiso, continuar con la siguiente función middleware
    next();
  } catch (error) {
    console.error(
      "Error en el middleware de validación de propiedad del carrito:",
      error
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default validateCartOwnership;
