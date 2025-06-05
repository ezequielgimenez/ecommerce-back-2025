import { NextApiRequest, NextApiResponse } from "next";
import { createTransaction } from "controllers/transaction";
import method from "micro-method-router";

export async function transaction(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await createTransaction(req.body);
    if (!result.success) {
      return res.status(404).json(result);
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export default method({
  post: transaction,
});
