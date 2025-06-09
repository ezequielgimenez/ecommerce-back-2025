import { NextApiRequest, NextApiResponse } from "next";
import { createTransactionController } from "controllers/transaction";
import { NextResponse } from "next/server";
import { withCORS, handleOptions } from "lib/with.cors";

export async function POST(req: Request) {
  const body = await req.json();
  const { productId, email } = body;
  try {
    const transaction = await createTransactionController(productId, email);
    if (!transaction.success) {
      const res = NextResponse.json(transaction, { status: 404 });
      return withCORS(res);
    } else {
      const res = NextResponse.json(transaction, { status: 201 });
      return withCORS(res);
    }
  } catch (error) {
    const res = NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
    return withCORS(res);
  }
}
