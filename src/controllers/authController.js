export const renderLoginPage = (req, res) => {
  res.render("auth/login", { title: "Iniciar sesión" });
};

// Renderiza la página de registro
export const renderRegisterPage = (req, res) => {
  res.render("auth/register", { title: "Registrarse" });
};
