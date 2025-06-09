import syncDB from "models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await syncDB();
  return NextResponse.json("Todo ok", { status: 200 });
}
