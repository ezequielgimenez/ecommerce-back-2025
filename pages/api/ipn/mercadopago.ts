import { NextApiRequest, NextApiResponse } from "next";
import { ipnController } from "controllers/ipn";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const result = await ipnController(req.body);
      if (!result.success) {
        return res.status(404).json(result);
      } else {
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
