import { ipnController } from "controllers/ipn";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data } = body;
    const paymentInfo = await ipnController(data.id);
    if (!paymentInfo.success) {
      return NextResponse.json(paymentInfo, { status: 200 });
    } else {
      return NextResponse.json(paymentInfo, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
