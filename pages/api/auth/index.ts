import { NextApiRequest, NextApiResponse } from "next";
import { authController } from "controllers/auth";
import syncDB from "models";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await syncDB();
      const result = await authController(req.body);
      if (!result.success) {
        return res.status(401).json(result);
      } else {
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
