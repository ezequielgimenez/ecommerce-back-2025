import { searchProductsController } from "controllers/products";
import { NextResponse } from "next/server";
import { withCORS, handleOptions } from "lib/with.cors";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const products = await searchProductsController(q, limit, offset);
    const res = NextResponse.json(products);
    return withCORS(res);
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
