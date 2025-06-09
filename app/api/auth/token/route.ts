import { authTokenController } from "controllers/auth";
import { NextResponse } from "next/server";
import { withCORS, handleOptions } from "lib/with.cors";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await authTokenController(body);

    if (!result.success) {
      const res = NextResponse.json(result, { status: 401 });
      return withCORS(res);
    } else {
      const cookieStore = await cookies();
      cookieStore.set("auth_token", result.token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });
      const res = NextResponse.json(result, { status: 200 });
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

export function OPTIONS() {
  return handleOptions();
}
