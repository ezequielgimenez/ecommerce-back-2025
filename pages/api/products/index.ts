import Airtable from "airtable";
import { algolia } from "connections";
import type { NextApiRequest, NextApiResponse } from "next";

const base = new Airtable({
  apiKey: process.env.TOKEN_AIRTABLE,
}).base(process.env.BASE_AIRTABLE);

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let globalIndex = 0;
    let myObjets = [];

    try {
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

      return res.status(200).json({
        success: true,
        message: "Productos creados y sincronizados",
        data: myObjets,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Salió mal",
      });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Método no permitido" });
  }
}
