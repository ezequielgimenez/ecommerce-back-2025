import { NextApiRequest, NextApiResponse } from "next";

export default function adress(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    const valueUpdate = req.body;
    return res.status(200).json({
      success: true,
      message: "Campo actualizado",
      valueUpdate,
    });
  }
}
