import { NextApiRequest, NextApiResponse } from "next";

export default function productId(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const id = req.query.id;
    return res.status(200).json({
      success: true,
      message: "Todo ok",
      id,
    });
  }
}
