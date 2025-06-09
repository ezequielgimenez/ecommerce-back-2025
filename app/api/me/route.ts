// import {
//   getMeMiddleware,
//   getMeController,
//   updateUserController,
// } from "controllers/me";

import { withCORS } from "lib/with.cors";
import { NextResponse } from "next/server";

// import { withCORS, handleOptions } from "lib/with.cors";
// import { NextResponse } from "next/server";

// async function getHandler(req: Request, data) {
//   try {
//     const result = await getMeController(data);
//     if (!result.success) {
//       const res = NextResponse.json(result, { status: 404 });
//       return withCORS(res);
//     } else {
//       const res = NextResponse.json(result, { status: 201 });
//       return withCORS(res);
//     }
//   } catch (error) {
//     const res = NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//     return withCORS(res);
//   }
// }

// export const GET = getMeMiddleware(getHandler);

// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();
//     const result = await updateUserController(body);
//     if (!result.success) {
//       const res = NextResponse.json(result, { status: 400 });
//       return withCORS(res);
//     } else {
//       const res = NextResponse.json(result, { status: 200 });
//       return withCORS(res);
//     }
//   } catch (error) {
//     const res = NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//     return withCORS(res);
//   }
// }

// export function OPTIONS() {
//   return handleOptions();
// }

export function GET(req: Request) {
  const res = NextResponse.json("Todo ok");
  return withCORS(res);
}
