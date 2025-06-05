import { NextApiRequest, NextApiResponse } from "next";
import { tokenController } from "controllers/auth";

export default async function authToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const result = await tokenController(req.body);
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
