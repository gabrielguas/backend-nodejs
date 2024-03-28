import { getAllProducts } from "../services/dao/product.dao.js";

export const renderHomePage = async (req, res) => {
  try {
    const productData = await getAllProducts(req, res);
    const user = req.session.user || null;
    res.render("index", { title: "Página principal", products: productData, user: user });
  } catch (error) {
    console.error(error); // También es útil imprimir el error en la consola para depurar
    res
      .status(500)
      .render("error", { error: "Hubo un error al buscar los productos" });
  }
};
