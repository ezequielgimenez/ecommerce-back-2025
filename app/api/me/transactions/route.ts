// GET /me/orders Devuelve todas mis ordenes con sus status.

import { getAllMeTransactions } from "controllers/me";
import { NextResponse } from "next/server";
import { withCORS, handleOptions } from "lib/with.cors";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const results = await getAllMeTransactions(userId);
    if (!results.success) {
      const res = NextResponse.json(results, { status: 404 });
      return withCORS(res);
    } else {
      const res = NextResponse.json(results, { status: 200 });
      return withCORS(res);
    }
  } catch (error) {
    const res = NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
    return withCORS(res);
  }
}

export function OPTIONS() {
  return handleOptions();
}
