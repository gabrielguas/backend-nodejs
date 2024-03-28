const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  } else {
    next();
  }
};

export default requireAuth;
