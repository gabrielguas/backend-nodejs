import ProductRepository from "../services/repository/productRepository.js";

const productRepository = new ProductRepository();

export const renderHomePage = async (req, res) => {
  try {
    const { page = 1, limit = 5, query, sort } = req.query;
    const productData = await productRepository.getAllProductsPaginate(page, limit, query, sort);
    // Filtrar los productos cuyo stock sea mayor que 0
    const productsWithStock = productData.docs.filter(product => product.stock > 0);
    console.log(productsWithStock);
    const user = req.session.user || null;
    res.render("index", { title: "Página principal", products: productsWithStock, user: user });

  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error: "Hubo un error al buscar los productos" });
  }
};