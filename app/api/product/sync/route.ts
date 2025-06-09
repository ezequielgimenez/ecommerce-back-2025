import { syncAllProductsController } from "controllers/products";
import { NextResponse } from "next/server";
import { withCORS, handleOptions } from "lib/with.cors";

export async function POST(req: Request) {
  const body = await req.json();
  const { destacados } = body;

  const result = await syncAllProductsController(destacados);
  if (!result.success) {
    const res = NextResponse.json(result, { status: 500 });
    return withCORS(res);
  } else {
    const res = NextResponse.json(result, { status: 200 });
    return withCORS(res);
  }
}

export function OPTIONS() {
  return handleOptions();
}
