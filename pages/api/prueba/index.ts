import syncDB from "models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await syncDB();
    return res.json("Todo ok");
  }
}
