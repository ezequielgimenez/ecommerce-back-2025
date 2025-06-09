import Airtable from "airtable";
import { algolia } from "connections";

export async function syncAllProducts(): Promise<any[]> {
  let globalIndex;
  let myObjets = [];

  const base = new Airtable({
    apiKey: process.env.TOKEN_AIRTABLE,
  }).base(process.env.BASE_AIRTABLE);

  await new Promise<void>((resolve, reject) => {
    base("productos")
      .select({
        view: "Grid view",
        pageSize: 10,
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          const results = records.map((i) => ({
            ...i.fields,
            objectID: i.id,
            index: globalIndex++,
          }));

          await algolia.saveObjects({
            indexName: "products",
            objects: results,
          });

          myObjets.push(...results);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
  });
  return myObjets;
}

export async function getProductById(id: string) {
  const product = await algolia.getObject({
    indexName: "products",
    objectID: id,
  });
  return product;
}

export async function searchProducts(
  query: string,
  limit: number,
  offset: number
) {
  const products = await algolia.searchSingleIndex({
    indexName: "products",
    searchParams: {
      query,
      length: limit,
      offset,
    },
  });
  return products;
}
