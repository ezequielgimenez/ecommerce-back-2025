import { authController } from "controllers/auth";
import { withCORS, handleOptions } from "lib/with.cors";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await authController(body);
    if (!result) {
      const res = NextResponse.json(result, { status: 400 });
      return withCORS(res);
    } else {
      return NextResponse.json(result, { status: 201 });
    }
  } catch (error) {
    const res = NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
    return withCORS(res);
  }
}

export function OPTIONS() {
  return handleOptions();
}
