import {
  getProductById,
  searchProducts,
  syncAllProducts,
} from "services/product.services";

export async function syncAllProductsController(productsDest: boolean) {
  try {
    const productsSync = await syncAllProducts();
    if (productsDest) {
      const productsDestacados = productsSync.filter(
        (i) => i.dest === "producto destacado"
      );
      return {
        success: true,
        message: "sincronizado",
        data: productsSync,
        destacados: productsDestacados,
      };
    } else {
      return { success: true, message: "sincronizado", data: productsSync };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getProductByIdController(id: string) {
  const product = await getProductById(id);
  if (product) {
    return { success: true, message: "Producto encontrado", data: product };
  } else {
    return {
      sucess: false,
      message: "Producto no encontrado o el id es incorrecto",
    };
  }
}

export async function searchProductsController(query, limit, offset) {
  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);
  //
  const limitFinal = limitNumber > 10 ? 10 : limitNumber;
  const offsetFinal = offsetNumber > 30 ? 0 : offsetNumber;
  const products = await searchProducts(query, limitFinal, offsetNumber);
  const productsParse = JSON.parse(JSON.stringify(products.hits));
  const allProductsByStock = productsParse.filter((i) => i.stock === "si");
  const cantPages = products.nbHits / limitFinal;

  if (allProductsByStock.length > 0) {
    return {
      success: true,
      message: "Productos encontrados",
      data: allProductsByStock,
      limit: limitFinal,
      offset: offsetFinal,
      totalResults: products.nbHits,
      nPages: Math.ceil(cantPages),
    };
  } else {
    return { success: false, message: "No se encontro productos" };
  }
}
