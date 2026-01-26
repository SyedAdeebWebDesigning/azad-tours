import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const msg = searchParams.get("msg") ?? "no message";

	console.log("📌 CUSTOM LOG:", msg);

	return NextResponse.json({ ok: true, logged: msg });
}
