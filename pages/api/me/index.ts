import { NextApiRequest, NextApiResponse } from "next";
import { getMeMiddleware, getMeController } from "controllers/me";

export async function meData(req: NextApiRequest, res: NextApiResponse, data) {
  if (req.method === "GET") {
    try {
      const result = await getMeController(data);
      if (!result.success) {
        return res.status(404).json(result);
      } else {
        return res.status(201).json(result);
      }
    } catch (error) {
      return res.json(error.message);
    }
  }
}

export default getMeMiddleware(meData);
