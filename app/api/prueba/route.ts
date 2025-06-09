import { withCORS } from "lib/with.cors";
import syncDB from "models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await syncDB();
  const res = NextResponse.json("Todo ok", { status: 200 });
  return withCORS(res);
}
