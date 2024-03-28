import ProductRepository from "../services/repository/productRepository.js";

const productRepository = new ProductRepository();

export const renderHomePage = async (req, res) => {
  try {
    const { page = 1, limit = 5, query, sort } = req.query;
    const productData = await productRepository.getAllProductsPaginate(page, limit, query, sort);
    const user = req.session.user || null;
    res.render("index", { title: "Página principal", products: productData, user: user });

  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error: "Hubo un error al buscar los productos" });
  }
};