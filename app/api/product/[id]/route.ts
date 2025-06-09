import { getProductByIdController } from "controllers/products";
import { NextResponse } from "next/server";
import { withCORS, handleOptions } from "lib/with.cors";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, context: Context) {
  const { id } = context.params;
  try {
    const result = await getProductByIdController(id);
    if (!result.success) {
      const res = NextResponse.json(result, { status: 404 });
      return withCORS(res);
    } else {
      const res = NextResponse.json(result, { status: 200 });
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
