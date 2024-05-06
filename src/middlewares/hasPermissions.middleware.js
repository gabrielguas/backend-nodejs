const hasPermissions = (...requiredRoles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.user || !req.session.user.rol) {
      return res.status(401).json({ error: "No estás autorizado para ver esta parte de la página." });
    }

    const userRole = req.session.user.rol;
    if (!requiredRoles.includes(userRole)) {
      return res
        .status(403)
        .json({
          error:
            "No tiene permisos suficientes para acceder a esta parte de la página.",
        });
    }
    next();
  };
};

export default hasPermissions;
