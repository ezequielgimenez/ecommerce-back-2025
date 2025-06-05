import { NextApiRequest, NextApiResponse } from "next";
import { algolia } from "connections";

export default async function searchQuery(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { limit, offset, q } = req.query;
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);
    const searchQuery = q.toString();
    const limitFinal = limitNumber <= 10 ? limitNumber : 10;
    const offsetFinal = offsetNumber < 50 ? offsetNumber : 0;

    try {
      const products = await algolia.searchSingleIndex({
        indexName: "products",
        searchParams: {
          query: searchQuery,
          length: limitFinal,
          offset: offsetFinal,
        },
      });

      const resultsParse = JSON.parse(JSON.stringify(products.hits));
      const productsFinal = resultsParse.filter((i) => i.stock === "si");
      const cantpagesAMostrar = limitFinal / products.nbHits;
      if (productsFinal.length > 0) {
        return res.status(201).json({
          success: true,
          data: productsFinal,
          message: "Búsqueda con exito",
          pagination: {
            offset: offsetFinal,
            limit: limitFinal,
            total: products.nbHits,
            nPages: Math.ceil(cantpagesAMostrar),
          },
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "No hay productos relacionados",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(405).json("Method Not Allowed");
  }
}
